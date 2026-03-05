const express = require('express');
const StaffController = require('../controllers/Staff/staffController');
const { uploadLocal } = require('../middlewares/multerLocal');

const router = express.Router();

router.post('/staff/savestaff', uploadLocal.single('photoPicture'), StaffController.saveStaff);
router.get('/staff/getallstaff' , StaffController.getAllStaff);
router.get('/staff/getstaffbyid/:id', StaffController.getstaffById);
router.put('/staff/updatestaff/:id', uploadLocal.single('photoPicture'), StaffController.updateStaff)
router.delete('/staff/deletestaff/:id' , StaffController.deleteStaff);
router.get('/staff/getstaffnameandid' , StaffController.getstaffidandName);

module.exports = router;
