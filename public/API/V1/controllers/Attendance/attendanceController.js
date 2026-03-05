const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const FileSyncService = require('../../services/fileSyncService');

class AttendanceController {

    static async saveAttendance(req, res) {
        try {
            const { input } = req.body;
            if (typeof input !== 'string') {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Input must be a string',
                });
            }

            const [memberID, name] = input.split('-');
            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: memberID',
                });
            }

            const member = await prisma.member.findUnique({
                where: { memberID },
            });

            if (!member) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: `Member with ID ${memberID} not found`,
                });
            }

            if (!member.active) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    code: StatusCodes.FORBIDDEN,
                    message: `Member with ID ${memberID} is not active`,
                });
            }

            const attendance = await prisma.attendance.create({
                data: {
                    memberID: member.memberID,
                    name,
                    biometricID: member.biometricID || '',
                    joiningDate: member.startDate,
                    outTime: null,
                    month: moment().format('MMMM'),
                },
            });

            return res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: 'Attendance saved successfully',
                attendance,
            });

        } catch (error) {
            logger.error(`Error saving attendance: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async updateAttendance(req, res) {
        try {
            const { input } = req.body;
            const [memberID, name] = input.split('-');

            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: memberID',
                });
            }

            const latestAttendance = await prisma.attendance.findFirst({
                where: { memberID, outTime: null, name: { contains: name || '' } },
                orderBy: { inTime: 'desc' },
            });

            if (!latestAttendance) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Attendance record not found or already updated',
                });
            }

            const updatedAttendance = await prisma.attendance.update({
                where: { id: latestAttendance.id },
                data: { outTime: new Date().toISOString() },
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Attendance updated successfully',
                updatedAttendance,
            });

        } catch (error) {
            logger.error(`Error updating attendance: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async getAttendanceDetails(req, res) {
        try {
            const { memberID, name } = req.params;

            if (!memberID || !name) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required fields: memberID or name',
                });
            }

            const latestAttendance = await prisma.attendance.findFirst({
                where: { memberID, name: { contains: name } },
                orderBy: { inTime: 'desc' },
            });

            if (!latestAttendance) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'No attendance records found for the given memberID and name',
                });
            }

            const attendanceCount = await prisma.attendance.count({
                where: { memberID, month: moment(latestAttendance.inTime).format('MMMM') },
            });

            const member = await prisma.member.findUnique({
                where: { memberID },
                select: { packageAmount: true, paidAmount: true, packageType: true, active: true },
            });

            if (!member) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Member with the given ID not found',
                });
            }

            const pendingAmount = member.packageAmount - member.paidAmount;

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'Attendance and payment details fetched successfully',
                data: {
                    ...latestAttendance,
                    attendanceCount,
                    packageType: member.packageType,
                    packageAmount: member.packageAmount,
                    paidAmount: member.paidAmount,
                    pendingAmount,
                    active: member.active,
                },
            });
        } catch (error) {
            logger.error(`Error fetching attendance details: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async getAllAttendance(req, res) {
        try {
            const attendanceRecords = await prisma.attendance.findMany({
                orderBy: { inTime: 'desc' },
            });

            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: 'All attendance records fetched successfully',
                data: attendanceRecords,
            });
        } catch (error) {
            logger.error(`Error fetching all attendance records: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }

    static async getAllMemberAttendance(req, res) {
        try {
            const members = await prisma.member.findMany();
            const attendanceRecords = await prisma.attendance.findMany();
            const apiBaseUrl = `${req.protocol}://${req.get('host')}`;

            const attendanceCountByMemberAndMonth = {};
            attendanceRecords.forEach(att => {
                const memberID = att.memberID;
                const month = att.inTime.getMonth() + 1;
                const key = `${memberID}-${month}`;
                attendanceCountByMemberAndMonth[key] = (attendanceCountByMemberAndMonth[key] || 0) + 1;
            });

            const combinedData = attendanceRecords.map(attendance => {
                const member = members.find(member => member.memberID === attendance.memberID);
                const attendanceDate = attendance.inTime.toISOString().split('T')[0];
                const totalAmount = member?.packageAmount || 0;
                const paidAmount = member?.paidAmount || 0;
                const pendingAmount = totalAmount - paidAmount;
                const month = attendance.inTime.getMonth() + 1;
                const attendanceCount = attendanceCountByMemberAndMonth[`${attendance.memberID}-${month}`] || 0;
                const endDate = member?.startDate && member?.duration
                    ? calculateEndDate(member.startDate, member.duration)
                    : 'N/A';

                // Convert local photo path to API URL
                const memberPhoto = member?.memberPhoto 
                    ? FileSyncService.convertToApiUrl(member.memberPhoto, apiBaseUrl)
                    : null;

                return {
                    type: 'Member',
                    memberID: member?.memberID,
                    name: attendance.name,
                    mobileNumber: member?.mobileNumber,
                    attendanceDate,
                    inTime: attendance.inTime,
                    outTime: attendance.outTime,
                    month: moment(attendance.inTime).format('MMMM'),
                    attendanceCount,
                    biometricID: attendance.biometricID,
                    memberPhoto,
                    totalAmount,
                    paidAmount,
                    pendingAmount,
                    active: member?.active,
                    packageType: member?.packageType,
                    startDate: member?.startDate,
                    duration: member?.duration,
                    endDate,
                };
            });

            combinedData.sort((a, b) => new Date(b.attendanceDate) - new Date(a.attendanceDate));

            return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: combinedData });
        } catch (error) {
            logger.error('Error fetching all member attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
            );
        }
    }

    static async getLatestMemberAttendance(req, res) {
        try {
            const input = req.params.input;
            if (!input) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Input is required',
                });
            }
    
            const [memberID, inputName] = input.split('-').map(value => value.trim());
            if (!memberID) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Missing required field: memberID',
                });
            }
    
            // Find the member by memberID
            const members = await prisma.member.findMany({ where: { memberID } });
            if (members.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    code: StatusCodes.NOT_FOUND,
                    message: 'Member not found',
                });
            }
    
            const member = members[0];
            const today = new Date(); // Define today for date calculations
    
            // Prepare the search condition for attendance
            let findCondition = {
                memberID,
            };
    
            // Add case-insensitive name search condition if inputName is provided
            if (inputName) {
                findCondition = {
                    ...findCondition,
                    name: {
                        contains: inputName,
                    }
                };
            }
    
            // Get the latest attendance record
            const latestAttendance = await prisma.attendance.findFirst({
                where: findCondition,
                orderBy: { inTime: 'desc' },
            });
    
            // Initialize variables to display
            let memberName = `${member.firstName} ${member.lastName}`.trim();
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
    
                memberName = latestAttendance.name || inputName || memberName;
                month = moment(latestAttendance.inTime).format('MMMM');
                biometricID = latestAttendance.biometricID || '';
    
                // Calculate the attendance count for the current month
                const startOfMonth = new Date(inTimeDate.getFullYear(), inTimeDate.getMonth(), 1);
                const endOfMonth = new Date(inTimeDate.getFullYear(), inTimeDate.getMonth() + 1, 1);
    
                const attendanceRecords = await prisma.attendance.findMany({
                    where: {
                        memberID,
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
    
                const attendanceRecords = await prisma.attendance.findMany({
                    where: {
                        memberID,
                        inTime: {
                            gte: startOfCurrentMonth,
                            lt: endOfCurrentMonth,
                        },
                    },
                });
    
                attendanceCount = attendanceRecords.length;
            }
    
            // Calculate end date based on start date and duration
            const endDate = member.startDate && member.duration
                ? calculateEndDate(member.startDate, member.duration)
                : 'N/A';

            // Convert local photo path to API URL
            const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
            const memberPhoto = member.memberPhoto 
                ? FileSyncService.convertToApiUrl(member.memberPhoto, apiBaseUrl)
                : null;
    
            // Prepare the response data
            const combinedData = {
                type: 'Member',
                memberID: member.memberID,
                name: memberName || '', // Ensure name is populated
                mobileNumber: member.mobileNumber,
                attendanceDate: attendanceDate || '',
                inTime: inTime || '',
                outTime: outTime || '',
                month,
                attendanceCount,
                biometricID: biometricID || '',
                memberPhoto,
                totalAmount: member.packageAmount || 0,
                paidAmount: member.paidAmount || 0,
                pendingAmount: (member.packageAmount || 0) - (member.paidAmount || 0),
                active: member.active,
                packageType: member.packageType,
                startDate: member.startDate,
                duration: member.duration,
                endDate,
            };
    
            return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: combinedData });
        } catch (error) {
            logger.error('Error fetching latest member attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
    }
    
    

    static async getAllMemberAttendanceByMonth(req, res) {
        try {
            const { month, year } = req.params;
            if (!month || !year) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'Month and Year are required',
                });
            }
    
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0);
            const totalDays = endOfMonth.getDate();
    
            const members = await prisma.member.findMany();
            const attendance = await prisma.attendance.findMany({
                where: {
                    inTime: {
                        gte: startOfMonth,
                        lt: new Date(endOfMonth.setHours(23, 59, 59, 999)),
                    },
                },
            });
    
            const memberAttendanceMap = members.reduce((map, member) => {
                const memberFirstName = member.firstName || '';
                const memberLastName = member.lastName || ''; // Handle null/undefined/empty lastName
                const memberName = `${memberFirstName} ${memberLastName}`.trim(); // Trim any extra spaces
                const key = `${member.memberID}-${memberName}`;
                map[key] = {
                    type: 'Member',
                    memberID: member.memberID,
                    name: memberName,
                    mobileNumber: member.mobileNumber,
                    status: member.active,
                    joiningDate: member.startDate,
                    expireDate: calculateEndDate(member.startDate, member.duration),
                    month: moment(`${year}-${month}`, "YYYY-MM").format('MMMM'),
                    totalDays,
                    presentDays: 0,
                    attendanceDetails: [],
                };
                return map;
            }, {});
    
            attendance.forEach(att => {
                const member = members.find(m => m.memberID === att.memberID);
                if (!member) return;
    
                const memberFirstName = member.firstName || '';
                const memberLastName = member.lastName || '';
                const memberName = `${memberFirstName} ${memberLastName}`.trim();
                const key = `${member.memberID}-${memberName}`;
    
                if (memberAttendanceMap[key]) {
                    memberAttendanceMap[key].attendanceDetails.push({
                        attendanceDate: moment(att.inTime).format('YYYY-MM-DD'),
                        inTime: att.inTime,
                        outTime: att.outTime,
                    });
    
                    memberAttendanceMap[key].presentDays += 1;
                }
            });
    
            const combinedData = Object.values(memberAttendanceMap).sort((a, b) => {
                return (a.name || 'Unknown').localeCompare(b.name || 'Unknown');
            });
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                member: combinedData,
            });
        } catch (error) {
            logger.error('Error fetching all member attendance:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }

    static async getIrregularMemberCount(req, res) {
        try {
            const { month, year } = req.params;
    
            if (!month || !year) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    code: StatusCodes.BAD_REQUEST,
                    message: 'Month and year are required',
                });
            }
    
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0);
    
            const members = await prisma.member.findMany();
            const attendanceRecords = await prisma.attendance.findMany({
                where: {
                    inTime: {
                        gte: startOfMonth,
                        lt: new Date(endOfMonth.setHours(23, 59, 59, 999)),
                    },
                },
                orderBy: {
                    inTime: 'asc',
                },
            });
    
            let irregularCount = 0;
    
            members.forEach((member) => {
                const memberAttendance = attendanceRecords.filter(
                    (record) => record.memberID === member.memberID
                );
    
                // Generate an array of dates for the month
                const attendedDates = memberAttendance.map((record) =>
                    moment(record.inTime).format('YYYY-MM-DD')
                );
                const allDates = [];
                for (
                    let date = moment(startOfMonth);
                    date.isBefore(endOfMonth) || date.isSame(endOfMonth);
                    date.add(1, 'days')
                ) {
                    allDates.push(date.format('YYYY-MM-DD'));
                }
    
                // Find missed days
                const missedDays = allDates.filter((date) => !attendedDates.includes(date));
    
                // Check for at least 5 consecutive missed days
                let consecutiveMissedDays = 0;
                let isIrregular = false;
    
                for (let i = 0; i < missedDays.length; i++) {
                    const currentDate = moment(missedDays[i]);
                    const nextDate = moment(missedDays[i + 1]);
    
                    if (i === missedDays.length - 1 || !currentDate.add(1, 'days').isSame(nextDate)) {
                        if (consecutiveMissedDays >= 5) {
                            isIrregular = true;
                            break;
                        }
                        consecutiveMissedDays = 0; // Reset counter
                    } else {
                        consecutiveMissedDays++;
                    }
                }
    
                if (isIrregular) {
                    irregularCount++;
                }
            });
    
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                irregularCount,
            });
        } catch (error) {
            logger.error(`Error fetching irregular member count: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.')
            );
        }
    }
    
    
    
}

// Utility function to calculate end date based on start date and duration
function calculateEndDate(startDate, duration) {
    if (!duration) return 'No expiry date available';

    const parsedStartDate = moment(startDate, "YYYY-MM-DD");
    const [months, days] = duration.split(' ').reduce((acc, item, index, array) => {
        if (item === 'months') acc[0] = parseInt(array[index - 1], 10);
        if (item === 'days') acc[1] = parseInt(array[index - 1], 10);
        return acc;
    }, [0, 0]);

    return parsedStartDate.clone().add(months, 'months').add(days, 'days').format('YYYY-MM-DD');
}


module.exports = AttendanceController;
