const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');

class PackageController {

    static async savePackage(req, res) {
        try {
            const body = req.body;

            const lastPackage = await prisma.package.findFirst({
                orderBy: { packageCode: 'desc' }
            });

            let newPackageCode = 'P001';
            if (lastPackage) {
                const lastcode = parseInt(lastPackage.packageCode.replace('P', ''), 10);
                const newCode = lastcode + 1;
                newPackageCode = `P${String(newCode).padStart(3, '0')}`;
            }

            body.packageCode = newPackageCode;

            if (body.month) {
                body.month = parseInt(body.month, 10);
            }

            if (body.day) {
                body.day = parseInt(body.day, 10);
            }

            const packages = await prisma.package.create({
                data: body
            });

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Package created successfully',
                packages
            });

        } catch (error) {
            logger.error(`Error creating package: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async getallPackage(req, res) {
        try {
            const packages = await prisma.package.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            res.status(200).json({
                code: 200,
                message: 'Packages fetched successfully',
                packages: packages,
            });
        } catch (error) {
            console.error('Error fetching packages:', error);
            res.status(500).json({
                code: 500,
                message: 'Error fetching packages',
                error: error.message,
            });
        }
    }

    static async getpackagebyId(req, res) {
        try {
            const { id } = req.params;

            const packages = await prisma.package.findUnique({
                where: {
                    id: parseInt(id, 10)
                }
            });

            if (packages) {
                return res.status(StatusCodes.OK).json({
                    code: StatusCodes.OK,
                    packages
                });
            }

            return res.status(StatusCodes.NOT_FOUND).json({
                errors: {
                    code: StatusCodes.NOT_FOUND,
                    message: "Package Not Found"
                }
            });

        } catch (error) {
            logger.error(`Error retrieving package detail: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async updatePackage(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatePackage = await prisma.package.update({
                where: { id: parseInt(id) },
                data: data
            });

            res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Updated successfully',
                updatePackage
            });
        } catch (error) {
            logger.error(`Error while updating package: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async deletePackage(req, res) {
        const { id } = req.params;

        try {

            await prisma.package.delete({
                where: { id: parseInt(id) }
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Package deleted successfully',
            });
        } catch (error) {
            logger.error(`Error deleting package: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
            );
        }
    }

    static async getPackageandName(req, res) {
        try {
            const packages = await prisma.package.findMany({
                select: {
                    packageName: true,
                    packageCode: true
                }
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Packages retrieved successfully',
                packages
            });

        } catch (error) {
            logger.error(`Error retrieving packages: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }
}

module.exports = PackageController;
