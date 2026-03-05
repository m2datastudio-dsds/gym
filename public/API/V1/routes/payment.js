const express = require('express');
const PaymentController = require('../controllers/Payment/paymentController');

const router = express.Router();

router.post('/payment/savepayment/:id', PaymentController.savePayment);
router.get('/payment/getallLatestpayment', PaymentController.getAllPayments);
router.get('/payment/getPayment/:memberID', PaymentController.getPaymentsByMemberID);
router.get('/payment/getallpayments', PaymentController.getAllPaymentDetails);
router.get('/payment/getlatestpayment/:memberID', PaymentController.getLatestPaymentByMemberID)
router.get('/payments/pending', PaymentController.getPendingPayments);
router.delete('/payments/deleteAll', PaymentController.deleteAllPayments);


module.exports = router;
