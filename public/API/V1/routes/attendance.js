const express = require('express');
const AttendanceController = require('../controllers/Attendance/attendanceController');
const StaffAttendanceController = require('../controllers/Attendance/staffAttendance');

const router = express.Router();

router.post('/attendance/saveattendance' , AttendanceController.saveAttendance);
router.put('/attendance/updateouttime', AttendanceController.updateAttendance);
router.get('/attendance/getattendance/:memberID/:name', AttendanceController.getAttendanceDetails);
router.get('/attendance/attendancewithdetails', AttendanceController.getAllMemberAttendance);
router.get('/attendance/latest/:input', AttendanceController.getLatestMemberAttendance);
router.get('/attendance/getattendanceByMonth/:month/:year', AttendanceController.getAllMemberAttendanceByMonth);
router.get('/irregular-member-count/:month/:year', AttendanceController.getIrregularMemberCount);



router.post('/staff/savestaffattendance' , StaffAttendanceController.savestaffAttendance);
router.put('/staff/updateouttime',StaffAttendanceController.updateStaffAttendanceOutTime);
router.get('/staff/staffattendance', StaffAttendanceController.getallstaffAttendancewithDetails);
router.get('/staff/latestattendance/:input', StaffAttendanceController.getLatestStaffAttendance);
router.get('/staff/getattendanceBymonthandYear/:month/:year', StaffAttendanceController.getallstaffAttendance)


module.exports = router;
