const express = require('express');
const DashboardController = require('../controllers/Dashboard/dashboardController');

const router = express.Router();

router.get('/dashboard/getdashboardCounts', DashboardController.getDashboardCounts)

module.exports = router;
