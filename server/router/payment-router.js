const express = require('express');
const authMiddleware = require("../middlewares/auth-middleware");
const payController = require("../controllers/payment-controller");
const router = express.Router();
const server = require("../server");

const instance = server.razorpay;

// Initiating Payment Request for New Payment
router.route('/:id/razorpay/new').post(authMiddleware,  payController.newPayment);

// check Payment Status
router.route('/razorpay/paymentVerification').post(payController.paymentVerification);



module.exports = router;
