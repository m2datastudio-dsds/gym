const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');


class StaffController {

  static async saveStaff(req, res, next) {
    try {
      const body = req.body;
      const file = req.file;
      console.log('Body:', body);

      // Check required fields
      const missingFields = ['firstname', 'mobileNumber'].filter(field => !body[field]);
      if (missingFields.length > 0) {
        throw new HttpException(StatusCodes.BAD_REQUEST, `Missing required fields: ${missingFields.join(', ')}`);
      }

      // Generate new employee code
      const lastEmployee = await prisma.staff.findFirst({
        orderBy: { employeeCode: 'desc' }
      });
      const newEmployeeCode = lastEmployee
        ? `EMP${(parseInt(lastEmployee.employeeCode.replace('EMP', '')) + 1).toString().padStart(3, '0')}`
        : 'EMP001';

      // Parse and format fields directly
      try {
        body.permanentAddress = JSON.stringify(JSON.parse(body.permanentAddress));
        body.communicationAddress = JSON.stringify(JSON.parse(body.communicationAddress));
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Invalid JSON format for permanentAddress or communicationAddress'
        })
      }

      // Convert dates to ISO
      const convertDateToISO = (dateString) => {
        if (!dateString) return null;
        const parsedDate = new Date(dateString.replace(/"/g, ''));
        return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
    };
    
    
      body.dateOfBirth = convertDateToISO(body.dateOfBirth);
      body.joiningDate = convertDateToISO(body.joiningDate)
      console.log('Converted joiningDate:', body.joiningDate);

      // Convert status to boolean
      body.status = body.status === 'true';

      // Convert `age` to an integer, set to null if invalid
      body.age = body.age ? parseInt(body.age, 10) : null;
      if (isNaN(body.age)) {
          body.age = null;
      }

      // Set optional fields to null if empty
      const optionalFields = [
        'lastname', 'email', 'alternateNumber', 'gender', 'biometricId',
        'bloodGroup', 'designation'
      ];
      optionalFields.forEach(field => {
        body[field] = body[field] || null;
      });

      // Handle file upload - saves locally first
      let fileToSync = null;
      if (file) {
        body.photoPicture = file.path;
        fileToSync = {
          localPath: file.path,
          fileType: file.mimetype,
          fieldName: 'photoPicture'
        };
      }

      // Add employee code to the body
      body.employeeCode = newEmployeeCode;

      console.log('Incoming Request Body:', req.body);

      // Save the staff record
      const staff = await prisma.staff.create({ data: body });

      // Add file to sync queue if uploaded
      if (fileToSync) {
        await FileSyncService.addToSyncQueue({
          localPath: fileToSync.localPath,
          fileType: fileToSync.fileType,
          entityType: 'staff',
          entityId: staff.id,
          fieldName: fileToSync.fieldName
        });
      }

      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        message: 'Staff created successfully',
        staff,
      });
    } catch (error) {
      logger.error(`Error creating staff: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }

  static async getAllStaff(req, res, next) {
    try {
      const staffs = await prisma.staff.findMany({ orderBy: { id: 'desc' } });
      const apiBaseUrl = `${req.protocol}://${req.get('host')}`;

      // Convert local file paths to API URLs
      for (const staff of staffs) {
        if (staff.photoPicture) {
          await FileSyncService.ensureEntityFiles('staff', staff.id);
          staff.photoPicture = FileSyncService.convertToApiUrl(staff.photoPicture, apiBaseUrl);
        }
      }

      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Staff retrieved successfully',
        staffs,
      });
    } catch (error) {
      logger.error(`Error retrieving staff: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }

  static async getstaffById(req, res, next) {
    try {
      const { id } = req.params;
      const staff = await prisma.staff.findUnique({ where: { id: parseInt(id, 10) } });
      if (!staff) {
        throw new HttpException(StatusCodes.NOT_FOUND, 'Staff not found');
      }

      const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
      
      // Ensure files exist, restore from remote if needed
      await FileSyncService.ensureEntityFiles('staff', staff.id);
      
      if (staff.photoPicture) {
        staff.photoPicture = FileSyncService.convertToApiUrl(staff.photoPicture, apiBaseUrl);
      }

      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        staff,
      });
    } catch (error) {
      logger.error(`Error retrieving staff detail: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }

  static async getstaffidandName(req, res, next) {
    try {
      const staffs = await prisma.staff.findMany({
        select: {
          employeeCode: true,
          firstname: true,
          lastname: true
        }
      });

      // Map staff data to create a full name
      const staffdetails = staffs.map(staff => ({
        employeeCode: staff.employeeCode,
        name: `${staff.firstname} ${staff.lastname || ''}`.trim()
      }));

      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Members retrieved successfully',
        staffdetails
      });
    } catch (error) {
      logger.error(`Error retrieving Members: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const file = req.file;
  
      // Parse and format addresses
      try {
        body.permanentAddress = JSON.stringify(JSON.parse(body.permanentAddress));
        body.communicationAddress = JSON.stringify(JSON.parse(body.communicationAddress));
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Invalid JSON format for permanentAddress or communicationAddress',
        });
      }
  
      // Convert dates to ISO format
     // Convert dates to ISO
     const convertDateToISO = (dateString) => {
      if (!dateString) return null;
      const parsedDate = new Date(dateString.replace(/"/g, ''));
      return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
  };
      body.dateOfBirth = convertDateToISO(body.dateOfBirth);
      body.joiningDate = convertDateToISO(body.joiningDate);
  
      // Convert status and age fields
      body.status = body.status === 'true';
      body.age = body.age ? parseInt(body.age, 10) : null;
      if (isNaN(body.age)) {
        body.age = null;
      }
  
      // Set optional fields to null if empty
      const optionalFields = [
        'lastname', 'email', 'alternateNumber', 'gender', 'biometricId',
        'bloodGroup', 'designation'
      ];
      optionalFields.forEach(field => {
        body[field] = body[field] || null;
      });
  
      // Handle file upload - saves locally first
      let fileToSync = null;
      if (file) {
        body.photoPicture = file.path;
        fileToSync = {
          localPath: file.path,
          fileType: file.mimetype,
          fieldName: 'photoPicture'
        };
      }
  
      // Remove id to prevent it from being updated
      delete body.id;
  
      // Check if biometricId is provided and unique
      if (body.biometricId) {
        const existingStaff = await prisma.staff.findUnique({
          where: { biometricId: body.biometricId },
        });
  
        // If a different staff with the same biometricId exists, throw an error
        if (existingStaff && existingStaff.id !== parseInt(id, 10)) {
          return res.status(StatusCodes.CONFLICT).json({
            code: StatusCodes.CONFLICT,
            message: 'The biometricId is already in use by another staff member.',
          });
        }
      } else {
        // Remove biometricId from body if not provided to avoid conflicts
        delete body.biometricId;
      }
  
      // Update the staff record
      const updatedStaff = await prisma.staff.update({
        where: { id: parseInt(id, 10) },
        data: body,
      });

      // Add file to sync queue if uploaded
      if (fileToSync) {
        await FileSyncService.addToSyncQueue({
          localPath: fileToSync.localPath,
          fileType: fileToSync.fileType,
          entityType: 'staff',
          entityId: parseInt(id, 10),
          fieldName: fileToSync.fieldName
        });
      }
  
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Staff updated successfully',
        updatedStaff,
      });
    } catch (error) {
      logger.error(`Error updating staff: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }
  
  

  static async deleteStaff(req, res, next) {
    try {
      const { id } = req.params;
      const staff = await prisma.staff.findUnique({ where: { id: parseInt(id, 10) } });
      if (!staff) {
        throw new HttpException(StatusCodes.NOT_FOUND, 'Staff not found');
      }

      await prisma.staff.delete({ where: { id: parseInt(id, 10) } });
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Staff deleted successfully',
      });
    } catch (error) {
      logger.error(`Error deleting staff: ${error.message}`);
      next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.'));
    }
  }

}

module.exports = StaffController