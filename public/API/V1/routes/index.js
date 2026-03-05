const express = require('express');
const packageRouter = require('./package'); 
const staffRouter = require('./staff');
const memberRouter = require('./member');
const attendanceRouter = require('./attendance');
const dashboardRouter = require('./dashboard');
const paymentRouter = require('./payment');
const enquiryRouter = require('./enquiry');
const dietRouter = require('./diet');
const exerciseRouter = require('./exercise');
const expenseRouter = require('./expense');
const userRouter = require('./user');
const syncRouter = require('./sync');

const router = express.Router();

router.use(packageRouter); 
router.use(staffRouter);
router.use(memberRouter);
router.use(attendanceRouter);
router.use(dashboardRouter);
router.use(paymentRouter);
router.use(enquiryRouter);
router.use(dietRouter);
router.use(exerciseRouter);
router.use(expenseRouter);
router.use(userRouter);
router.use(syncRouter);

module.exports = { indexRouter: router };
