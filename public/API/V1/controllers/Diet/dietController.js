const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');

class DietController { 

    static parseChartTableFromBody(body) {
        // Preferred: chartTable sent as JSON string (FormData-safe)
        let chartTable = body?.chartTable;
        if (typeof chartTable === 'string') {
            try {
                const parsed = JSON.parse(chartTable);
                if (Array.isArray(parsed)) return parsed;
            } catch {
                // fall through to bracket-notation parsing
            }
        }
        if (Array.isArray(chartTable)) return chartTable;

        // Fallback: bracket-notation fields (may happen with some clients)
        // Example keys:
        // - chartTable[0][day]
        // - chartTable[0][meals][1][Time]
        const days = new Map(); // dayIndex -> { day, meals: Map(mealIndex -> mealObj) }
        for (const [key, value] of Object.entries(body || {})) {
            const dayMatch = key.match(/^chartTable\[(\d+)\]\[day\]$/);
            if (dayMatch) {
                const dIdx = Number(dayMatch[1]);
                if (!days.has(dIdx)) days.set(dIdx, { day: '', meals: new Map() });
                days.get(dIdx).day = value;
                continue;
            }

            const mealMatch = key.match(/^chartTable\[(\d+)\]\[meals\]\[(\d+)\]\[([A-Za-z]+)\]$/);
            if (mealMatch) {
                const dIdx = Number(mealMatch[1]);
                const mIdx = Number(mealMatch[2]);
                const field = mealMatch[3];
                if (!days.has(dIdx)) days.set(dIdx, { day: '', meals: new Map() });
                const day = days.get(dIdx);
                if (!day.meals.has(mIdx)) day.meals.set(mIdx, {});
                day.meals.get(mIdx)[field] = value;
            }
        }

        if (days.size === 0) return null;

        return Array.from(days.entries())
            .sort((a, b) => a[0] - b[0])
            .map(([, d]) => ({
                day: d.day,
                meals: Array.from(d.meals.entries())
                    .sort((a, b) => a[0] - b[0])
                    .map(([, meal]) => meal),
            }));
    }

    static async saveDietPlan(req, res) {
        try {
            const { chartName, assignedCount, assignTo } = req.body;
            const chartTable = DietController.parseChartTableFromBody(req.body);

            // Validate required fields
            if (!chartName || !chartTable || !Array.isArray(chartTable) || chartTable.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Chart Name and Chart Table (with at least one entry) are required.',
                });
            }

            // Validate the chartTable structure for each day
            for (const day of chartTable) {
                if (!day.day || !Array.isArray(day.meals) || day.meals.length === 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        code: StatusCodes.BAD_REQUEST,
                        message: 'Each day in Chart Table must have a valid day number and a list of meals.',
                    });
                }
                for (const meal of day.meals) {
                    const { Time, Food, Quantity, Calorie } = meal;
                    if (!Food || !Quantity || !Calorie) {
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            code: StatusCodes.BAD_REQUEST,
                            message: 'Each meal must have Food, Quantity and Calorie.',
                        });
                    }
                }
            }
    
            const uploadedFile = req.file;
            let uploadedFileLocation = null;
            if (uploadedFile) {
                uploadedFileLocation = uploadedFile.path;
            }

            const formattedChartTable = JSON.stringify(chartTable);

            const newDietPlan = await prisma.dietPlan.create({
                data: {
                    chartName,
                    chartTable: formattedChartTable,
                    file: uploadedFileLocation || null,
                    assignedCount: Number(assignedCount),
                    assign: assignTo
                },
            });

            if (uploadedFile) {
                await FileSyncService.addToSyncQueue({
                    localPath: uploadedFile.path,
                    fileType: 'document',
                    entityType: 'diet',
                    entityId: newDietPlan.id,
                    fieldName: 'file',
                }).catch(() => {});
            }

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Diet plan created successfully.',
                dietPlan: newDietPlan,
            });
        } catch (error) {
            logger.error(`Error saving diet plan: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    
    
    
    static async updateDietPlan(req, res) {
        try {
            const { id } = req.params;
            const { chartName, assign, assignedCount, removeFile } = req.body;
            const chartTable = DietController.parseChartTableFromBody(req.body);

            // Validate ID
            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Diet plan ID is required.',
                });
            }

            // Validate required fields
            if (!chartName || !chartTable || !Array.isArray(chartTable) || chartTable.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Chart Name and Chart Table (with at least one entry) are required.',
                });
            }

            // Validate the chartTable structure for each day
            for (const day of chartTable) {
                if (!day.day || !Array.isArray(day.meals) || day.meals.length === 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        code: StatusCodes.BAD_REQUEST,
                        message: 'Each day in Chart Table must have a valid day number and a list of meals.',
                    });
                }
                for (const meal of day.meals) {
                    const { Time, Food, Quantity, Calorie } = meal;
                    if (!Food || !Quantity || !Calorie) {
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            code: StatusCodes.BAD_REQUEST,
                            message: 'Each meal must have Food, Quantity and Calorie.',
                        });
                    }
                }
            }
    
            // Check if the DietPlan exists
            const existingDietPlan = await prisma.dietPlan.findUnique({
                where: { id: parseInt(id) }
            });
    
            if (!existingDietPlan) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Diet plan not found.',
                });
            }
    
            const uploadedFile = req.file;
            let uploadedFileLocation = existingDietPlan.file;
            if (uploadedFile) {
                uploadedFileLocation = uploadedFile.path;
                await FileSyncService.addToSyncQueue({
                    localPath: uploadedFile.path,
                    fileType: 'document',
                    entityType: 'diet',
                    entityId: parseInt(id, 10),
                    fieldName: 'file',
                }).catch(() => {});
            } else if (String(removeFile).toLowerCase() === 'true') {
                uploadedFileLocation = null;
            }
    
            // Convert chartTable to the desired format
            const formattedChartTable = chartTable ? JSON.stringify(chartTable) : '[]';
    
            // Update the diet plan
            const updatedDietPlan = await prisma.dietPlan.update({
                where: { id: parseInt(id) },
                data: {
                    chartName,
                    chartTable: formattedChartTable, // Store chartTable as a JSON string
                    file: uploadedFileLocation,      // Update file location if provided
                    assign,
                    assignedCount: Number(assignedCount),
                },
            });
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Diet plan updated successfully.',
                dietPlan: updatedDietPlan,
            });
    
        } catch (error) {
            logger.error(`Error updating diet plan: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    
    
    
        static async getAllDietPlans(req, res) {
            try {
              const dietPlans = await prisma.dietPlan.findMany();
              await Promise.all(dietPlans.map(p => FileSyncService.ensureEntityFiles('diet', p.id)));
              const withUrls = dietPlans.map(p => ({
                ...p,
                file: p.file ? FileSyncService.convertToApiUrl(p.file) : null,
              }));
              return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Diet Plans fetched successfully',
                dietPlans: withUrls,
              });
            } catch (error) {
              logger.error(`Error fetching diet plans: ${error.message}`);
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
              });
            }
          }
    
          static async getDietPlanById(req, res) {
            const { id } = req.params;
        
            try {
              const dietPlan = await prisma.dietPlan.findUnique({
                where: { id: parseInt(id, 10) }
              });
        
              if (!dietPlan) {
                return res.status(StatusCodes.NOT_FOUND).json({
                  code: StatusCodes.NOT_FOUND,
                  message: `Diet Plan with id ${id} not found`
                });
              }

              await FileSyncService.ensureEntityFiles('diet', dietPlan.id);
        
              const dietPlanWithUrl = {
                ...dietPlan,
                file: dietPlan.file ? FileSyncService.convertToApiUrl(dietPlan.file) : null,
              };
              return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Diet Plan fetched successfully',
                dietPlan: dietPlanWithUrl,
              });
            } catch (error) {
              logger.error(`Error fetching diet plan by id: ${error.message}`);
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
              });
            }
          }
    
          static async deleteDietPlanById(req, res) {
            const { id } = req.params;
        
            try {
              const deletedDietPlan = await prisma.dietPlan.delete({
                where: { id: parseInt(id, 10) }
              });
        
              return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: `Diet Plan with id ${id} deleted successfully`,
                deletedDietPlan
              });
            } catch (error) {
              logger.error(`Error deleting diet plan: ${error.message}`);
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
              });
            }
          }
}

module.exports = DietController;