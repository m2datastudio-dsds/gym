const express = require('express');
const EnquiryController = require('../controllers/Enquiry/enquiryController');

const router = express.Router();

router.post('/enquiry/saveEnquiry', EnquiryController.saveEnquiry);
router.put('/enquiry/updateEnquiry/:id', EnquiryController.updateEnquiry);
router.get('/enquiry/getallEnquiry', EnquiryController.getAllEnquiries);
router.get('/enquiry/getEnquirybyId/:id', EnquiryController.getEnquiryById);
router.delete('/enquiry/deleteEnquiry/:id', EnquiryController.deleteEnquiryById);
router.get('/enquiry/count',EnquiryController.getEnquiryCount)

module.exports = router;
