const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');
const path = require('path');


class MemberController {

    // Save a new member
    static async saveMember(req, res) {
        try {
            const body = req.body;
            console.log('Request body:', body);

            // Only firstName and mobileNumber are required fields
            const requiredFields = ['firstName', 'mobileNumber'];

            // Check if required fields are present
            const missingFields = requiredFields.filter(field => !body[field]);
            if (missingFields.length > 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: `Missing required fields: ${missingFields.join(', ')}`,
                });
            }

            // Retrieve the last member to generate a new memberID
            const lastMember = await prisma.member.findFirst({
                orderBy: { memberID: 'desc' }
            });
            let newMemberCode = '001';
            if (lastMember) {
                const lastCode = parseInt(lastMember.memberID, 10);
                newMemberCode = `${(lastCode + 1).toString().padStart(3, '0')}`;
            }
            body.memberID = newMemberCode;

            // Parse and ensure permanentAddress and communicationAddress are arrays of JSON objects
            try {
                body.permanentAddress = JSON.stringify(JSON.parse(body.permanentAddress || '{}'));
                body.communicationAddress = JSON.stringify(JSON.parse(body.communicationAddress || '{}'));
            } catch (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON format for permanentAddress or communicationAddress',
                });
            }

            // Function to convert date to ISO format and handle nulls
            const convertDateToISO = (dateString) => {
                if (!dateString) return null;
                const parsedDate = new Date(dateString.replace(/"/g, ''));
                return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
            };

            // Convert date strings to ISO format
            body.dateOfBirth = convertDateToISO(body.dateOfBirth);
            body.paidDate = convertDateToISO(body.paidDate);
            body.startDate = convertDateToISO(body.startDate);
            body.fitnessDate = convertDateToISO(body.fitnessDate);
            body.expiryDate = convertDateToISO(body.expiryDate);

            // Ensure boolean and number fields are correctly parsed
            body.active = body.active !== undefined && body.active !== null && body.active !== '' ? body.active === 'true' : true;
            body.isMainPackage = body.isMainPackage === 'true';

            // Convert number fields from strings to numbers
            const fieldsToParse = [
                'gstamount', 'paidAmount', 'packageAmount', 'discount',
                'weight', 'height', 'neck', 'shoulders', 'chest',
                'biceps', 'upperAbs', 'waist', 'lowerAbs', 'hip',
                'thigh', 'calf'
            ];
            fieldsToParse.forEach(field => {
                body[field] = body[field] !== undefined ? parseFloat(body[field]) : null;
            });

            // Handle optional fields
            const optionalFields = [
                'lastName', 'email', 'memberPhoto', 'homeContactNumber',
                'remarks', 'assignTrainer', 'proofDocument', 'fitnessDate',
                'proofType', 'proofNo'
            ];
            optionalFields.forEach(field => {
                body[field] = body[field] !== undefined ? body[field] : null;
            });

            // Handle file uploads - now saves locally first
            const files = req.files;
            const filesToSync = [];
            
            if (files) {
                if (files.memberPhoto && files.memberPhoto[0]) {
                    const file = files.memberPhoto[0];
                    body.memberPhoto = file.path;
                    filesToSync.push({
                        localPath: file.path,
                        fileType: file.mimetype,
                        fieldName: 'memberPhoto'
                    });
                }
                if (files.proofDocument && files.proofDocument[0]) {
                    const file = files.proofDocument[0];
                    body.proofDocument = file.path;
                    filesToSync.push({
                        localPath: file.path,
                        fileType: file.mimetype,
                        fieldName: 'proofDocument'
                    });
                }
            }

            // Save the member data in the database
            const member = await prisma.member.create({
                data: {
                    ...body,
                }
            });

            // Add files to sync queue (for future B2 upload)
            for (const fileInfo of filesToSync) {
                await FileSyncService.addToSyncQueue({
                    localPath: fileInfo.localPath,
                    fileType: fileInfo.fileType,
                    entityType: 'member',
                    entityId: member.id,
                    fieldName: fileInfo.fieldName
                });
            }

            // Retrieve the last payment record to generate a new paymentId
            const lastPayment = await prisma.payment.findFirst({
                orderBy: { paymentId: 'desc' }
            });

            let newPaymentId = 'Pay001';
            if (lastPayment && lastPayment.paymentId) {
                const lastPaymentCode = parseInt(lastPayment.paymentId.replace('Pay', ''), 10);
                const newPaymentCode = lastPaymentCode + 1;
                newPaymentId = `Pay${String(newPaymentCode).padStart(3, '0')}`;
            }

            // Parse and set default values for payment fields if they are empty
            const discount = parseFloat(body.discount) || 0;
            const packageAmount = parseFloat(body.packageAmount) || 0;
            const paidAmount = parseFloat(body.paidAmount) || 0;
            const pendingAmount = packageAmount - paidAmount - discount;

            // Save the payment details in the database
            await prisma.payment.create({
                data: {
                    paymentId: newPaymentId,
                    memberID: member.memberID,
                    name: `${body.firstName} ${body.lastName || ''}`,
                    mobileNumber: body.mobileNumber,
                    packageType: body.packageType || '',
                    packageAmount: packageAmount,
                    paidAmount: paidAmount,
                    pending: pendingAmount,
                    paidDate: body.paidDate || null,
                    paymentMode: body.paymentMode || ''
                }
            });

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Member created successfully',
                member
            });

        } catch (error) {
            console.log('Error caught:', error);
            logger.error(`Error creating member: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.'
            });
        }
    }



    // Get all members
    static async getallMember(req, res) {
        try {
            const members = await prisma.member.findMany({
                orderBy: {
                    id: 'desc'
                }
            });

            const apiBaseUrl = `${req.protocol}://${req.get('host')}`;

            // Process each member
            for (const member of members) {
                const { startDate, duration } = member;

                if (startDate && duration) {
                    const expiryDays = calculateExpiryDays(startDate, duration);
                    member.expiryDays = expiryDays;
                } else {
                    member.expiryDays = 'N/A';
                }

                // Convert local file paths to API-accessible URLs
                if (member.memberPhoto) {
                    // Ensure file exists, restore from remote if needed
                    await FileSyncService.ensureEntityFiles('member', member.id);
                    member.memberPhoto = FileSyncService.convertToApiUrl(member.memberPhoto, apiBaseUrl);
                }
                if (member.proofDocument) {
                    member.proofDocument = FileSyncService.convertToApiUrl(member.proofDocument, apiBaseUrl);
                }
            }

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Members retrieved successfully',
                members
            });
        } catch (error) {
            logger.error(`Error retrieving member: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }

        // Function to calculate expiry days
        function calculateExpiryDays(startDate, duration) {
            const parsedStartDate = moment(startDate, "DD-MM-YYYY");

            // Extract months and days from duration
            const [months, days] = duration.split(' ').reduce((acc, item, index, array) => {
                if (item === 'months') acc[0] = parseInt(array[index - 1], 10);
                if (item === 'days') acc[1] = parseInt(array[index - 1], 10);
                return acc;
            }, [0, 0]);

            // Add months and days to startDate
            const endDate = parsedStartDate.clone().add(months, 'months').add(days, 'days');
            const today = moment();

            // Calculate the difference in days between today and endDate
            const expiryDays = endDate.diff(today, 'days');

            // If expiryDays is negative or 0, return 'Expired', otherwise return the number of days
            return expiryDays <= 0 ? 'Expired' : expiryDays;
        }
    }

    // Get a single member by ID
    static async getMemberById(req, res) {
        try {
            const { id } = req.params;
            const member = await prisma.member.findUnique({ where: { id: parseInt(id) } });
            if (member) {
                const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
                
                // Ensure files exist, restore from remote if needed
                await FileSyncService.ensureEntityFiles('member', member.id);
                
                // Convert local paths to API URLs
                if (member.memberPhoto) {
                    member.memberPhoto = FileSyncService.convertToApiUrl(member.memberPhoto, apiBaseUrl);
                }
                if (member.proofDocument) {
                    member.proofDocument = FileSyncService.convertToApiUrl(member.proofDocument, apiBaseUrl);
                }

                return res.status(StatusCodes.OK).json({
                    code: StatusCodes.OK,
                    member,
                });
            }
            return res.status(StatusCodes.NOT_FOUND).json({
                code: StatusCodes.NOT_FOUND,
                message: 'Member not found.',
            });
        } catch (error) {
            logger.error(`Error retrieving member: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    // Update a member
    static async updateMember(req, res) {
        const { id } = req.params;
        const body = req.body;
        console.log('Request body:', body);

        try {
            // Ensure id is an integer
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Invalid member ID provided.',
                });
            }

            // Convert body.id to an integer (if it exists) and remove it
            if (body.id) {
                delete body.id; // This line removes the `id` field from `data`
            }

            // Validate JSON format for permanentAddress and communicationAddress
            try {
                body.permanentAddress = JSON.stringify(JSON.parse(body.permanentAddress));
                body.communicationAddress = JSON.stringify(JSON.parse(body.communicationAddress));
            } catch (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON format for permanentAddress or communicationAddress',
                });
            }

            // Function to convert date strings to ISO format
            const convertDateToISO = (dateString) => {
                if (!dateString) return null;
                const parsedDate = new Date(dateString.replace(/"/g, ''));
                return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
            };

            // Convert date strings to ISO format
            body.dateOfBirth = convertDateToISO(body.dateOfBirth);
            body.paidDate = convertDateToISO(body.paidDate);
            body.startDate = convertDateToISO(body.startDate);
            body.fitnessDate = convertDateToISO(body.fitnessDate);
            body.expiryDate = convertDateToISO(body.expiryDate);

            // Ensure boolean fields are correctly parsed
            body.active = body.active === 'true' || body.active === true;
            body.isMainPackage = body.isMainPackage === 'true' || body.isMainPackage === true;

            const fieldsToParse = [
                'gstamount', 'paidAmount', 'packageAmount', 'discount',
                'weight', 'height', 'neck', 'shoulders', 'chest',
                'biceps', 'upperAbs', 'waist', 'lowerAbs', 'hip',
                'thigh', 'calf'
            ];

            // Parse fields as floats and set to null if undefined
            fieldsToParse.forEach(field => {
                body[field] = body[field] !== undefined ? parseFloat(body[field]) : null;
            });

            // Set optional string fields to empty or null if not provided
            const optionalFields = [
                'lastName', 'email', 'memberPhoto', 'homeContactNumber', 'dateOfBirth',
                'remarks', 'assignTrainer',
                'proofDocument', 'fitnessDate', 'weight', 'height', 'proofType', 'proofNo'
            ];

            optionalFields.forEach(field => {
                body[field] = body[field] !== undefined ? body[field] : null;
            });

            // Handle file uploads - now saves locally first
            const files = req.files;
            const filesToSync = [];
            
            if (files) {
                if (files.memberPhoto && files.memberPhoto[0]) {
                    const file = files.memberPhoto[0];
                    body.memberPhoto = file.path;
                    filesToSync.push({
                        localPath: file.path,
                        fileType: file.mimetype,
                        fieldName: 'memberPhoto'
                    });
                }
                if (files.proofDocument && files.proofDocument[0]) {
                    const file = files.proofDocument[0];
                    body.proofDocument = file.path;
                    filesToSync.push({
                        localPath: file.path,
                        fileType: file.mimetype,
                        fieldName: 'proofDocument'
                    });
                }
            }

            // Update the member in the database
            const updatedMember = await prisma.member.update({
                where: { id: parsedId },
                data: body,
            });

            // Add files to sync queue (for future B2 upload)
            for (const fileInfo of filesToSync) {
                await FileSyncService.addToSyncQueue({
                    localPath: fileInfo.localPath,
                    fileType: fileInfo.fileType,
                    entityType: 'member',
                    entityId: parsedId,
                    fieldName: fileInfo.fieldName
                });
            }

            res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Updated successfully',
                data: updatedMember,
            });
        } catch (error) {
            console.error('Error while updating member:', error);
            logger.error(`Error while updating member: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.'
            });
        }
    }

    // Delete a member
    static async deleteMember(req, res) {
        try {
            const { id } = req.params;
            const member = await prisma.member.findUnique({ where: { id: parseInt(id) } });

            if (!member) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Member not found',
                });
            }

            await prisma.member.delete({ where: { id: parseInt(id) } });
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Member deleted successfully',
            });
        } catch (error) {
            logger.error(`Error deleting member: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Get all members with their ID and names
    static async getMemberIdAndName(req, res) {
        try {
            const members = await prisma.member.findMany({
                select: {
                    memberID: true,
                    firstName: true,
                    lastName: true,
                }
            });
            const memberList = members.map(member => ({
                memberID: member.memberID,
                name: `${member.firstName} ${member.lastName || ''}`,
            }));

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Members retrieved successfully',
                members: memberList,
            });
        } catch (error) {
            logger.error(`Error retrieving members: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Update member's proof document
    static async updateMemberProof(req, res) {
        try {
            const { id } = req.params;
            const file = req.file;

            if (!file) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Proof document is required',
                });
            }

            const updatedProof = await prisma.member.update({
                where: { id: parseInt(id, 10) },
                data: { proofDocument: file.path },
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Proof document updated successfully',
                updatedProof,
            });
        } catch (error) {
            logger.error(`Error updating proof document: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Utility function to calculate expiry date
    static calculateExpiryDate(startDate, duration) {
        if (!startDate || !duration) return null;

        const durationRegex = /(?:(\d+)\s*months?)?(?:\s*(\d+)\s*days?)?/i;
        const match = duration.match(durationRegex);

        if (!match) return null;

        const months = parseInt(match[1], 10) || 0;
        const days = parseInt(match[2], 10) || 0;

        return moment(startDate).add(months, 'months').add(days, 'days').toDate();
    }
    
      // Get expired members
      static async getExpiredMembers(req, res) {
        try {
            const members = await prisma.member.findMany({});

            const expiredMembers = members.filter(member => {
                const { startDate, duration } = member;
                if (!startDate || !duration) return false;

                const expiryDate = MemberController.calculateExpiryDate(startDate, duration);
                return expiryDate && moment().isAfter(expiryDate);
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Expired members fetched successfully.',
                expiredCount: expiredMembers.length,
                expiredMembers,
            });
        } catch (error) {
            logger.error(`Error fetching expired members: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

}

module.exports = MemberController;
