const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');

class StaffAttendanceController {
    static async savestaffAttendance(req, res) {
        try {
            const { input } = req.body;
            if (typeof input !== 'string') {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Input must be a string',
                });
            }

            const [employeeCode, name] = input.split('-');
            if (!employeeCode) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: employeeCode',
                });
            }

            const staff = await prisma.staff.findUnique({
                where: { employeeCode },
            });

            if (!staff) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: `Staff with ID ${employeeCode} not found`,
                });
            }

            if (!staff.status) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    code: StatusCodes.FORBIDDEN,
                    message: `Staff with ID ${employeeCode} is not active`,
                });
            }

            const attendance = await prisma.staffAttendance.create({
                data: {
                    employeeCode: staff.employeeCode,
                    name: name || staff.name,
                    biometricID: staff.biometricId || '',
                    joiningDate: staff.joiningDate,
                    outTime: null,
                    month: moment().format('MMMM'),
                },
            });

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Attendance saved successfully',
                data: attendance,
            });

        } catch (error) {
            logger.error(`Error saving staff attendance: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }

    static async updateStaffAttendanceOutTime(req, res) {
        try {
            const { input } = req.body;
            const [employeeCode, name] = input.split('-').map(value => value.trim());
    
            if (!employeeCode) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: employeeCode',
                });
            }
    
            // Prepare the search condition for attendance
            const findCondition = {
                employeeCode,
                OR: [{ outTime: null }, { outTime: '' }],
                ...(name && { 
                    name: { 
                        contains: name 
                    }
                }),
            };
    
            // Get the latest attendance record with the specified conditions
            const latestAttendance = await prisma.staffAttendance.findFirst({
                where: {
                    ...findCondition,
                    AND: name ? [{ name: { contains: name}}]: {},
                },
                orderBy: { inTime: 'desc' },
            });
    
            if (!latestAttendance) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Attendance record not found or already updated',
                });
            }
    
            const updatedAttendance = await prisma.staffAttendance.update({
                where: { id: latestAttendance.id },
                data: { outTime: new Date().toISOString() },
            });
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Attendance out time updated successfully',
                data: updatedAttendance,
            });
    
        } catch (error) {
            logger.error(`Error updating staff attendance out time: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong. Please try again later.',
            });
        }
    }
    

    static async getallstaffAttendancewithDetails(req, res) {
        try {
            // Fetch staff and attendance data
            const staffList = await prisma.staff.findMany();
            const attendanceList = await prisma.staffAttendance.findMany();
            const apiBaseUrl = `${req.protocol}://${req.get('host')}`;

            for (const staff of staffList) {
                if (staff.photoPicture) {
                    await FileSyncService.ensureEntityFiles('staff', staff.id);
                }
            }

            // Initialize an object to store attendance count for each staff member per month
            const attendanceCountByStaffAndMonth = {};
    
            // Count attendances per staff per month
            attendanceList.forEach(att => {
                const employeeCode = att.employeeCode;
                const month = att.inTime.getMonth() + 1; 
                const key = `${employeeCode}-${month}`;
    
                // Increment the count
                attendanceCountByStaffAndMonth[key] = (attendanceCountByStaffAndMonth[key] || 0) + 1;
            });
    
            // Map attendance records to include staff details and attendance count
            const combinedData = attendanceList.map(att => {
                const staffMember = staffList.find(s => s.employeeCode === att.employeeCode);
                const attendanceDate = att.inTime.toISOString().split('T')[0];
                const monthNumber = att.inTime.getMonth() + 1;
                const attendanceCount = attendanceCountByStaffAndMonth[`${att.employeeCode}-${monthNumber}`] || 0;
    
                // Calculate expireDate if not available
                const expireDate = staffMember?.expireDate 
                    ? moment(staffMember.expireDate).format('YYYY-MM-DD') 
                    : calculateExpireDate(staffMember?.joiningDate, staffMember?.duration);

                // Convert local photo path to API URL
                const photoPicture = staffMember?.photoPicture 
                    ? FileSyncService.convertToApiUrl(staffMember.photoPicture, apiBaseUrl)
                    : null;
    
                return {
                    type: 'Staff',
                    employeeCode: staffMember?.employeeCode,
                    name: att.name,
                    attendanceDate,
                    inTime: att.inTime,
                    outTime: att.outTime,
                    month: moment(att.inTime).format('MMMM'),
                    attendanceCount,
                    biometricID: att.biometricID,
                    photoPicture,
                    mobileNumber: staffMember?.mobileNumber,
                    status: staffMember?.status,
                    joiningDate: staffMember?.joiningDate,
                    expireDate,
                };
            });
    
            // Sort by attendance date in descending order
            combinedData.sort((a, b) => new Date(b.attendanceDate) - new Date(a.attendanceDate));
    
            // Return the response with the combined data
            return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: combinedData });
        } 
        catch (error) {
            // Log the error and return an error response
            logger.error('Error fetching all staff attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching staff attendance records',
            });
        }
    }
    
    static async getLatestStaffAttendance(req, res) {
        try {
            const input = req.params.input;
    
            if (!input) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Input is required',
                });
            }
    
            // Split input to extract employeeCode and name
            const [employeeCode, inputName] = input.split('-').map(value => value.trim());
    
            if (!employeeCode) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: employeeCode',
                });
            }
    
            // Find the staff by employeeCode
            const staffs = await prisma.staff.findMany({
                where: { employeeCode },
            });
    
            if (staffs.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Staff not found',
                });
            }
    
            const staff = staffs[0];
            const today = new Date(); // Define today for date calculations
    
            // Get the latest attendance record
            const latestAttendance = await prisma.staffAttendance.findFirst({
                where: { employeeCode },
                orderBy: { inTime: 'desc' },
            });
    
            // Initialize variables to display
            let staffName = `${staff.firstname} ${staff.lastname}`.trim();
            let attendanceDate = '';
            let inTime = '';
            let outTime = '';
            let month = moment().format('MMMM'); // Default to current month
            let attendanceCount = 0;
            let biometricID = '';
    
            if (latestAttendance) {
                // If there's a latest attendance record, check the inTime value
                const inTimeDate = new Date(latestAttendance.inTime);
                const isToday = inTimeDate.toDateString() === today.toDateString();
    
                if (isToday) {
                    // Display inTime and outTime if the attendance is for today
                    inTime = latestAttendance.inTime;
                    outTime = latestAttendance.outTime || '';
                    attendanceDate = inTimeDate.toISOString().split('T')[0];
                } else {
                    // If not for today, keep them empty
                    inTime = '';
                    outTime = '';
                    attendanceDate = '';
                }
    
                staffName = latestAttendance.name || inputName || staffName;
                month = moment(latestAttendance.inTime).format('MMMM');
                biometricID = latestAttendance.biometricID || '';
    
                // Calculate the attendance count for the current month
                const startOfMonth = new Date(inTimeDate.getFullYear(), inTimeDate.getMonth(), 1);
                const endOfMonth = new Date(inTimeDate.getFullYear(), inTimeDate.getMonth() + 1, 1);
    
                const attendanceRecords = await prisma.staffAttendance.findMany({
                    where: {
                        employeeCode,
                        inTime: {
                            gte: startOfMonth,
                            lt: endOfMonth,
                        },
                    },
                });
    
                attendanceCount = attendanceRecords.length;
            } else {
                // If no attendance record found, calculate the attendance count for the current month
                const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    
                const attendanceRecords = await prisma.staffAttendance.findMany({
                    where: {
                        employeeCode,
                        inTime: {
                            gte: startOfCurrentMonth,
                            lt: endOfCurrentMonth,
                        },
                    },
                });
    
                attendanceCount = attendanceRecords.length;
            }
    
            const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
            if (staff.photoPicture) {
                await FileSyncService.ensureEntityFiles('staff', staff.id);
            }
            const photoPicture = staff.photoPicture 
                ? FileSyncService.convertToApiUrl(staff.photoPicture, apiBaseUrl)
                : null;

            // Prepare the response data
            const combinedData = {
                type: 'Staff',
                employeeCode: staff.employeeCode,
                name: staffName || '', // Ensure name is populated
                mobileNumber: staff.mobileNumber,
                attendanceDate: attendanceDate || '',
                inTime: inTime || '',
                outTime: outTime || '',
                month,
                attendanceCount,
                biometricID: biometricID || '',
                photoPicture,
                active: staff.status,
                joiningDate: staff.joiningDate,
                duration: staff.duration,
                endDate: staff.expireDate,
            };
    
            return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: combinedData });
        } catch (error) {
            logger.error('Error fetching latest staff attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }
    

    static async getallstaffAttendance(req, res) {
        try {
            const { month, year } = req.params;
    
            if (!month || !year) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Month and Year are required',
                });
            }
    
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0);
            endOfMonth.setHours(23, 59, 59, 999); // Set end of month to the last moment
    
            // Fetch staff details
            const staffList = await prisma.staff.findMany();
            const attendanceList = await prisma.staffAttendance.findMany({
                where: {
                    inTime: {
                        gte: startOfMonth,
                        lt: endOfMonth,
                    },
                },
            });
    
            // Create a map to store attendance details per staff member
            const staffAttendanceMap = {};
    
            // Populate staff details in the map
            staffList.forEach(staffMember => {
                const firstName = staffMember.firstname || '';
                const lastName = staffMember.lastname || ''; // Handle null/undefined/empty lastName
                const staffName = `${firstName} ${lastName}`.trim(); // Trim to remove extra spaces
    
                const key = staffMember.employeeCode;
                staffAttendanceMap[key] = {
                    type: 'Staff',
                    employeeCode: staffMember.employeeCode,
                    name: staffName,
                    mobileNumber: staffMember.mobileNumber,
                    status: staffMember.status,
                    joiningDate: staffMember.joiningDate,
                    expireDate: calculateExpireDate(staffMember.joiningDate, staffMember.duration),
                    month: moment(`${year}-${month}`, "YYYY-MM").format('MMMM'),
                    attendanceDetails: [],
                };
            });
    
            // Add attendance records to the map
            attendanceList.forEach(att => {
                const staffMember = staffAttendanceMap[att.employeeCode];
                if (!staffMember) return; // Skip if no matching staff member is found
    
                staffMember.attendanceDetails.push({
                    attendanceDate: moment(att.inTime).format('YYYY-MM-DD'),
                    inTime: att.inTime,
                    outTime: att.outTime,
                });
            });
    
            // Convert the map to an array and sort by staff name
            const combinedData = Object.values(staffAttendanceMap);
            combinedData.sort((a, b) => {
                const nameA = a.name.toLowerCase() || 'unknown';
                const nameB = b.name.toLowerCase() || 'unknown';
                return nameA.localeCompare(nameB);
            });
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                data: combinedData,
            });
    
        } catch (error) {
            // Log the error and return an error response
            logger.error('Error fetching all staff attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching staff attendance records',
            });
        }
    }
    
}

// Utility function to calculate expire date based on joining date and duration
function calculateExpireDate(joiningDate, duration) {
    if (!joiningDate || !duration) return 'N/A';
    const parsedJoiningDate = moment(joiningDate, "YYYY-MM-DD");
    const [months, days] = duration.split(' ').reduce((acc, item, index, array) => {
        if (item === 'months') acc[0] = parseInt(array[index - 1], 10);
        if (item === 'days') acc[1] = parseInt(array[index - 1], 10);
        return acc;
    }, [0, 0]);
    return parsedJoiningDate.clone().add(months, 'months').add(days, 'days').format('YYYY-MM-DD');
}

module.exports = StaffAttendanceController;
