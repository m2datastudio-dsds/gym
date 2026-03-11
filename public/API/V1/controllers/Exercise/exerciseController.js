const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');

class ExerciseController {

  static async saveExercisePlan(req, res) {
    try {
      const { planname, warmUp, details, assign } = req.body;

      // Validate required fields
      if (!planname || !details) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Plan name and details are required fields.',
        });
      }

      // Parse the details field if it comes as a string
      let parsedDetails;
      try {
        parsedDetails = JSON.parse(details);
      } catch (parseError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Invalid details format. It should be a valid JSON array.',
        });
      }

      // Validate the parsed details to ensure it is an array
      if (!Array.isArray(parsedDetails) || parsedDetails.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Details must be an array with at least one entry.',
        });
      }

      // Format the details array
      const formattedDetails = parsedDetails.map((day) => ({
        day: day.day,
        exercises: day.exercises.map((exercise) => ({
          exercise: exercise.exercise,
          repsSets: exercise.repsSets,
          videoLink: exercise.videoLink,
        })),
      }));

      // Convert the formatted details to a JSON string
      const detailsString = JSON.stringify(formattedDetails);

      const uploadedFile = req.file;
      let uploadedFileLocation = null;
      if (uploadedFile) {
        uploadedFileLocation = uploadedFile.path;
      }

      const newExercisePlan = await prisma.exercisePlan.create({
        data: {
          planname,
          warmUp: warmUp || '',
          details: detailsString,
          assign,
          file: uploadedFileLocation,
        },
      });

      if (uploadedFile) {
        await FileSyncService.addToSyncQueue({
          localPath: uploadedFile.path,
          fileType: 'document',
          entityType: 'exercise',
          entityId: newExercisePlan.id,
          fieldName: 'file',
        }).catch(() => {});
      }

      return res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        message: 'Exercise Plan created successfully.',
        exercisePlan: newExercisePlan,
      });
    } catch (error) {
      logger.error(`Error saving exercise plan: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong. Please try again later.',
      });
    }
  }



  static async updateExercisePlan(req, res) {
    try {
      const { id } = req.params;
      const { planname, warmUp, details, assign, removeFile } = req.body;

      // Validate required fields
      if (!planname || !details) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Plan name and details are required fields.'
        });
      }

      // Parse the details field if it comes as a string
      let parsedDetails;
      try {
        parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Invalid details format. It should be a valid JSON array.'
        });
      }

      // Validate the parsed details to ensure it's an array
      if (!Array.isArray(parsedDetails) || parsedDetails.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Details must be an array with at least one entry.'
        });
      }

      // Format the details (each day having exercise, Reps & Sets, video link)
      const formattedDetails = parsedDetails.map(day => ({
        ...day,
        exercises: day.exercises.map(exercise => ({
          exercise: exercise.exercise,
          repsSets: exercise.repsSets,
          videoLink: exercise.videoLink
        }))
      }));

      // Convert the formatted details to a JSON string
      const detailsString = JSON.stringify(formattedDetails);

      const uploadedFile = req.file;
      let uploadedFileLocation = null;
      if (uploadedFile) {
        uploadedFileLocation = uploadedFile.path;
        await FileSyncService.addToSyncQueue({
          localPath: uploadedFile.path,
          fileType: 'document',
          entityType: 'exercise',
          entityId: Number(id),
          fieldName: 'file',
        }).catch(() => {});
      }

      // Check if the ExercisePlan with the given id exists
      const existingPlan = await prisma.exercisePlan.findUnique({
        where: { id: Number(id) },
      });

      if (!existingPlan) {
        return res.status(StatusCodes.NOT_FOUND).json({
          code: StatusCodes.NOT_FOUND,
          message: `Exercise Plan with ID ${id} not found.`,
        });
      }

      // Update the ExercisePlan with new details
      const updatedExercisePlan = await prisma.exercisePlan.update({
        where: { id: Number(id) },
        data: {
          planname,
          warmUp,
          details: detailsString, // Save the details as a JSON string
          assign,
          file: uploadedFileLocation
            ? uploadedFileLocation
            : (String(removeFile).toLowerCase() === 'true' ? null : existingPlan.file),
        },
      });

      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Exercise Plan updated successfully.',
        exercisePlan: updatedExercisePlan,
      });

    } catch (error) {
      logger.error(`Error updating exercise plan: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong. Please try again later.',
      });
    }
  }



  static async getAllExercisePlans(req, res) {
    try {
      const exercisePlans = await prisma.exercisePlan.findMany();
      await Promise.all(exercisePlans.map(p => FileSyncService.ensureEntityFiles('exercise', p.id)));
      const withUrls = exercisePlans.map(p => ({
        ...p,
        file: p.file ? FileSyncService.convertToApiUrl(p.file) : null,
      }));
      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Exercise plans retrieved successfully.',
        data: withUrls,
      });
    } catch (error) {
      logger.error(`Error fetching exercise plans: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while retrieving exercise plans.',
      });
    }
  }

  static async getExercisePlanById(req, res) {
    try {
      const { id } = req.params;

      const exercisePlan = await prisma.exercisePlan.findUnique({
        where: { id: Number(id) },
      });

      if (!exercisePlan) {
        return res.status(StatusCodes.NOT_FOUND).json({
          code: StatusCodes.NOT_FOUND,
          message: `Exercise plan with ID ${id} not found.`,
        });
      }

      await FileSyncService.ensureEntityFiles('exercise', exercisePlan.id);

      const planWithUrl = {
        ...exercisePlan,
        file: exercisePlan.file ? FileSyncService.convertToApiUrl(exercisePlan.file) : null,
      };
      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Exercise plan retrieved successfully.',
        data: planWithUrl,
      });
    } catch (error) {
      logger.error(`Error fetching exercise plan by ID: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while retrieving the exercise plan.',
      });
    }
  }

  static async deleteExercisePlanById(req, res) {
    try {
      const { id } = req.params;

      const exercisePlan = await prisma.exercisePlan.findUnique({
        where: { id: Number(id) },
      });

      if (!exercisePlan) {
        return res.status(StatusCodes.NOT_FOUND).json({
          code: StatusCodes.NOT_FOUND,
          message: `Exercise plan with ID ${id} not found.`,
        });
      }

      await prisma.exercisePlan.delete({
        where: { id: Number(id) },
      });

      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: `Exercise plan with ID ${id} deleted successfully.`,
      });
    } catch (error) {
      logger.error(`Error deleting exercise plan: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while deleting the exercise plan.',
      });
    }
  }
}

module.exports = ExerciseController;