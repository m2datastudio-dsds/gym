const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');

class PaymentController {
    static async savePayment(req, res) {
        try {
            const { memberID, paidAmount, paidDate, paymentMode } = req.body;
            console.log(req.body);
    
            // Validate required fields
            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'MemberID is required in the request body.'
                });
            }
    
            if (paidAmount === undefined || paidDate === undefined || paymentMode === undefined) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'PaidAmount, PaidDate, and PaymentMode are required in the request body.'
                });
            }
    
            // Function to convert date to ISO format
            const convertDateToISO = (dateString) => {
                if (!dateString) return null;
                const parsedDate = new Date(dateString.replace(/"/g, ''));
                return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
            };
    
            // Convert paidDate to ISO format using the utility function
            const formattedPaidDate = convertDateToISO(paidDate);
    
            // Retrieve the globally last payment record
            const lastPayment = await prisma.payment.findFirst({
                orderBy: {
                    paymentId: 'desc' // Order by paymentId in descending order to get the last one globally
                }
            });
    
            // Generate the new paymentId
            let newPaymentId = 'Pay001'; // Default in case of no previous payments
            if (lastPayment && lastPayment.paymentId) {
                // Extract the numeric part of the last paymentId and increment it
                const lastPaymentCode = parseInt(lastPayment.paymentId.replace('Pay', ''), 10);
                const newPaymentCode = lastPaymentCode + 1;
                newPaymentId = `Pay${String(newPaymentCode).padStart(3, '0')}`;
            }
    
            // Calculate the new pending amount by checking the latest payment by this member
            const memberLastPayment = await prisma.payment.findFirst({
                where: {
                    memberID: memberID
                },
                orderBy: {
                    paymentId: 'desc' 
                }
            });
    
            // Calculate the new pending amount
            const newPendingAmount = memberLastPayment ? parseFloat(memberLastPayment.pending) - parseFloat(paidAmount) : 0;
    
            // Save the new payment record
            const newPayment = await prisma.payment.create({
                data: {
                    paymentId: newPaymentId,
                    memberID: memberID,
                    name: memberLastPayment ? memberLastPayment.name : null,
                    mobileNumber: memberLastPayment ? memberLastPayment.mobileNumber : null,
                    packageType: memberLastPayment ? memberLastPayment.packageType : null,
                    packageAmount: memberLastPayment ? memberLastPayment.packageAmount : null,
                    paidAmount: parseFloat(paidAmount),
                    pending: newPendingAmount,
                    paidDate: formattedPaidDate,
                    paymentMode: paymentMode,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
    
            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Payment created successfully.',
                payment: newPayment
            });
    
        } catch (error) {
            logger.error(`Error saving payment: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    

    static async getAllPayments(req, res) {
        try {
            // Retrieve all payment details for each member
            const allPayments = await prisma.payment.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
    
            if (!allPayments || allPayments.length === 0) {
                // If no payment records are found, retrieve member details instead
                const members = await prisma.member.findMany({});
    
                if (members.length === 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        code: StatusCodes.NOT_FOUND,
                        message: 'No payment or member records found.'
                    });
                }
    
                // Format the member data to match the payment details structure
                const memberPaymentDetails = members.map(member => ({
                    memberID: member.memberID,
                    name: `${member.firstName} ${member.lastName}`,
                    mobileNumber: member.mobileNumber,
                    packageType: member.packageType,
                    packageAmount: member.packageAmount || 0,
                    paidAmount: member.paidAmount || 0,
                    pending: (member.packageAmount || 0) - (member.paidAmount || 0),
                    paymentMode: member.paymentMode,
                    paidDate: member.paidDate,
                    createdAt: member.createdAt,  
                }));
    
                // Sort member details by createdAt in descending order
                memberPaymentDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
                // Calculate total paid amount
                const totalPaidAmount = memberPaymentDetails.reduce((acc, member) => acc + member.paidAmount, 0);
    
                // Calculate total pending amount from the latest data of each member
                const latestMemberData = {};
                memberPaymentDetails.forEach(member => {
                    if (!latestMemberData[member.memberID] || new Date(member.createdAt) > new Date(latestMemberData[member.memberID].createdAt)) {
                        latestMemberData[member.memberID] = member;
                    }
                });
                const totalPendingAmount = Object.values(latestMemberData).reduce((acc, member) => acc + member.pending, 0);
    
                return res.status(StatusCodes.OK).json({
                    code: StatusCodes.OK,
                    message: 'Member details retrieved as no payment records were found.',
                    data: memberPaymentDetails,
                    totalPaidAmount,
                    totalPendingAmount
                });
            }
    
            // Map the payments to include member details for those without payments
            const memberIDsWithPayments = allPayments.map(payment => payment.memberID);
            const membersWithoutPayments = await prisma.member.findMany({
                where: {
                    memberID: {
                        notIn: memberIDsWithPayments
                    }
                }
            });
    
            // Combine payment and member data
            const allDetails = allPayments.map(payment => ({
                id: payment.id,
                memberID: payment.memberID,
                name: payment.name,
                mobileNumber: payment.mobileNumber,
                packageType: payment.packageType,
                packageAmount: payment.packageAmount,
                paidAmount: payment.paidAmount,
                pending: payment.pending,
                paymentMode: payment.paymentMode,
                paidDate: payment.paidDate,
                createdAt: payment.createdAt,  
            })).concat(membersWithoutPayments.map(member => ({
                memberID: member.memberID,
                name: `${member.firstName} ${member.lastName}`,
                mobileNumber: member.mobileNumber,
                packageType: member.packageType,
                packageAmount: member.packageAmount || 0,
                paidAmount: member.paidAmount || 0,
                pending: (member.packageAmount || 0) - (member.paidAmount || 0),
                paymentMode: member.paymentMode,
                paidDate: member.paidDate,
                createdAt: member.createdAt,  
            })));
    
            // Sort combined details by createdAt in descending order
            allDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
            // Calculate total paid amount
            const totalPaidAmount = allDetails.reduce((acc, member) => acc + member.paidAmount, 0);
    
            // Calculate total pending amount from the latest data of each member
            const latestMemberData = {};
            allDetails.forEach(member => {
                if (!latestMemberData[member.memberID] || new Date(member.createdAt) > new Date(latestMemberData[member.memberID].createdAt)) {
                    latestMemberData[member.memberID] = member;
                }
            });
            const totalPendingAmount = Object.values(latestMemberData).reduce((acc, member) => acc + member.pending, 0);
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'All payment and member details retrieved successfully.',
                data: allDetails,
                totalPaidAmount,
                totalPendingAmount
            });
    
        } catch (error) {
            logger.error(`Error retrieving payments: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    
    
    

    static async getPaymentsByMemberID(req, res) {
        try {
            const { memberID } = req.params;

            // Validate if memberID is provided
            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'MemberID is required.'
                });
            }

            // Retrieve all payment details for the given memberID
            const payments = await prisma.payment.findMany({
                where: {
                    memberID: memberID,
                },
                orderBy: {
                    createdAt: 'desc',  // Optional: Order by createdAt if needed
                },
            });

            // Check if any payment records are found
            if (!payments || payments.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: `No payment records found for memberID ${memberID}.`,
                });
            }

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Payment details retrieved successfully.',
                data: payments,
            });

        } catch (error) {
            logger.error(`Error retrieving payments for memberID ${req.params.memberID}: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    static async getAllPaymentDetails(req, res) {
        try {
            const paymentDetails = await prisma.payment.findMany({
                orderBy: {
                    createdAt: 'desc' 
                }
            });
    
            if (!paymentDetails || paymentDetails.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'No Payment records found.'
                });
            }
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Payment details retrieved successfully.',
                data: paymentDetails
            });
    
        } catch (error) {
            logger.error(`Error retrieving payment details: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    static async getLatestPaymentByMemberID(req, res) {
        try {
            const input = req.params.memberID;
    
            if (!input) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Input is required',
                });
            }
    
            // Split input to extract memberID and name
            const [memberID, inputName] = input.split('-').map(value => value.trim());
    
            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: memberID',
                });
            }
    
            // Find the member by memberID
            const members = await prisma.member.findMany({
                where: { memberID },
            });
    
            if (members.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Member not found',
                });
            }
    
            // Prepare the search condition for payment
            const findCondition = { memberID };
    
            if (inputName) {
                findCondition.name = {
                    contains: inputName,
                    mode: 'insensitive',
                };
            }
    
            // Retrieve the latest payment detail for the given memberID
            const latestPayment = await prisma.payment.findFirst({
                where: findCondition,
                orderBy: {
                    createdAt: 'desc',  // Orders by createdAt in descending order to get the latest payment
                },
            });
    
            // Check if a payment record is found
            if (latestPayment) {
                return res.status(StatusCodes.OK).json({
                    code: StatusCodes.OK,
                    message: 'Latest payment detail retrieved successfully.',
                    data: latestPayment,
                });
            }
    
            // If no payment record found, use details from the member model
            const member = members[0];  // There should be only one member with the given memberID
            const memberPaymentDetails = {
                memberID: memberID,
                name: `${member.firstName} ${member.lastName}`,
                mobileNumber: member.mobileNumber,
                packageType: member.packageType,
                packageAmount: member.packageAmount || 0,
                paidAmount: member.paidAmount || 0,
                pending: (member.packageAmount || 0) - (member.paidAmount || 0),
                paymentMode: member.paymentMode,
                paidDate: member.paidDate
            };
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Payment details retrieved from member model as no payment record was found.',
                data: memberPaymentDetails,
            });
    
        } catch (error) {
            logger.error(`Error retrieving latest payment for memberID ${req.params.memberID}: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    
    static async getPendingPayments(req, res) {
        try {
            // Sum all pending payments
            const totalPending = await prisma.payment.aggregate({
                _sum: {
                    pending: true, // Summing up the `pending` column
                },
            });
    
            return res.status(200).json({
                code: 200,
                message: "Pending payments fetched successfully",
                totalPending: totalPending._sum.pending || 0, // Default to 0 if null
            });
        } catch (error) {
            console.error("Error fetching pending payments:", error.message);
            return res.status(500).json({
                code: 500,
                message: "Failed to fetch pending payments",
            });
        }
    }

    static async deleteAllPayments(req, res) {
        try {
            // Use Prisma to delete all payment records
            await prisma.payment.deleteMany();
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'All payment records deleted successfully.',
            });
        } catch (error) {
            logger.error(`Error deleting all payment records: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete all payment records. Please try again later.',
            });
        }
    }
    
    
}


module.exports = PaymentController;