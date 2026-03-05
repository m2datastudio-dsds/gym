const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');

class EnquiryController {
    // Utility function to convert dates to local without timezone conversion
    static convertDateToLocal(dateString) {
        if (!dateString) return null;
        return moment.utc(dateString, 'YYYY-MM-DD').toDate(); // Parses as local date without shifting to UTC
    }

    // Save Enquiry
    static async saveEnquiry(req, res) {
        try {
            const {
                firstName,
                lastName,
                mobileNumber,
                email,
                alternateContact,
                enquiryFor,
                status,
                howToKnowAboutUs,
                enquiryDate,
                expectedJoiningDate,
                followUpDate,
                remarks,
            } = req.body;

            console.log('Received Data:', req.body); // Debugging log

            // Validate required fields
            if (!firstName || !mobileNumber || !enquiryFor || !status || !enquiryDate || !followUpDate) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'FirstName, MobileNumber, EnquiryFor, Status, EnquiryDate, and FollowUpDate are required.',
                });
            }

            // Convert dates to local
            const formattedEnquiryDate = EnquiryController.convertDateToLocal(enquiryDate);
            const formattedExpectedJoiningDate = EnquiryController.convertDateToLocal(expectedJoiningDate);
            const formattedFollowUpDate = EnquiryController.convertDateToLocal(followUpDate);

            console.log('Formatted Dates:', {
                formattedEnquiryDate,
                formattedExpectedJoiningDate,
                formattedFollowUpDate,
            });

            // Save enquiry
            const newEnquiry = await prisma.enquiry.create({
                data: {
                    firstName,
                    lastName,
                    mobileNumber,
                    email,
                    alternateContact,
                    enquiryFor,
                    status,
                    howToKnowAboutUs: howToKnowAboutUs || '',
                    enquiryDate: formattedEnquiryDate,
                    expectedJoiningDate: formattedExpectedJoiningDate,
                    followUpDate: formattedFollowUpDate,
                    remarks: remarks || null,
                },
            });

            console.log('New Enquiry:', newEnquiry); // Debugging log

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Enquiry created successfully.',
                enquiry: newEnquiry,
            });
        } catch (error) {
            console.error('Error saving enquiry:', error.message); // Debugging log
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Update Enquiry
    static async updateEnquiry(req, res) {
        try {
            const { id } = req.params;
            const {
                firstName,
                lastName,
                mobileNumber,
                email,
                alternateContact,
                enquiryFor,
                status,
                howToKnowAboutUs,
                enquiryDate,
                expectedJoiningDate,
                followUpDate,
                remarks,
            } = req.body;

            // Validate ID and required fields
            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Enquiry ID is required in the URL parameters.',
                });
            }

            if (!firstName || !mobileNumber || !enquiryFor || !status || !enquiryDate || !followUpDate) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'FirstName, MobileNumber, EnquiryFor, Status, EnquiryDate, and FollowUpDate are required.',
                });
            }

            // Convert dates to local
            const formattedEnquiryDate = EnquiryController.convertDateToLocal(enquiryDate);
            const formattedExpectedJoiningDate = EnquiryController.convertDateToLocal(expectedJoiningDate);
            const formattedFollowUpDate = EnquiryController.convertDateToLocal(followUpDate);

            console.log('Formatted Dates for Update:', {
                formattedEnquiryDate,
                formattedExpectedJoiningDate,
                formattedFollowUpDate,
            });

            // Check if enquiry exists
            const enquiry = await prisma.enquiry.findUnique({
                where: { id: Number(id) },
            });

            if (!enquiry) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Enquiry not found.',
                });
            }

            // Update enquiry
            const updatedEnquiry = await prisma.enquiry.update({
                where: { id: Number(id) },
                data: {
                    firstName,
                    lastName,
                    mobileNumber,
                    email,
                    alternateContact,
                    enquiryFor,
                    status,
                    howToKnowAboutUs: howToKnowAboutUs || '',
                    enquiryDate: formattedEnquiryDate,
                    expectedJoiningDate: formattedExpectedJoiningDate,
                    followUpDate: formattedFollowUpDate,
                    remarks: remarks || null,
                },
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Enquiry updated successfully.',
                enquiry: updatedEnquiry,
            });
        } catch (error) {
            console.error('Error updating enquiry:', error.message); // Debugging log
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Fetch all enquiries
    static async getAllEnquiries(req, res) {
        try {
            const enquiries = await prisma.enquiry.findMany();

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Enquiries fetched successfully.',
                enquiries,
            });
        } catch (error) {
            console.error('Error fetching enquiries:', error.message); // Debugging log
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Fetch enquiry by ID
    static async getEnquiryById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Enquiry ID is required in the URL parameters.',
                });
            }

            const enquiry = await prisma.enquiry.findUnique({
                where: { id: Number(id) },
            });

            if (!enquiry) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Enquiry not found.',
                });
            }

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Enquiry fetched successfully.',
                enquiry,
            });
        } catch (error) {
            console.error('Error fetching enquiry by ID:', error.message); // Debugging log
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    // Delete enquiry by ID
    static async deleteEnquiryById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Enquiry ID is required in the URL parameters.',
                });
            }

            const enquiry = await prisma.enquiry.findUnique({
                where: { id: Number(id) },
            });

            if (!enquiry) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Enquiry not found.',
                });
            }

            await prisma.enquiry.delete({
                where: { id: Number(id) },
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: `Enquiry with ID ${id} deleted successfully.`,
            });
        } catch (error) {
            console.error('Error deleting enquiry:', error.message); // Debugging log
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

 // Backend controller example
static async getEnquiryCount(req, res) {
    try {
        const count = await prisma.enquiry.count();
        return res.status(200).json({
            code: 200,
            message: "Enquiry count fetched successfully",
            count,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Failed to fetch enquiry count",
        });
    }
}


}

module.exports = EnquiryController;
