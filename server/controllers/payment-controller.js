const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Order = require("../models/order-model");
const { json, response } = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
// This Variable Required For Phonepe Testing Purpose
const PHONEPE_URL = process.env.PHONEPE_HOST_URL;
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const EndPoint = "/pg/v1/pay";
const FUll_URL = process.env.PHONEPE_API;

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const newPayment = async (req, res) => {
  try {
    const { username, cart, Tamount, number, tableNo } = req.body;

    // Validate required fields
    if (!username || !Tamount || !number || !tableNo) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Razorpay order options
    const options = {
      amount: Tamount, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}` // Generate a unique receipt ID
    };

    // Create order using Razorpay instance
    const order = await instance.orders.create(options);
    console.log("Razorpay Order created:", order);

    // Respond with the created order details
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    // Log error for server-side debugging
    console.error("Error creating Razorpay order:", error);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the payment order.",
      error: error.message
    });
  }
};


// const newPayment = async (req, res) => {
//   const { username, cart, Tamount, number, tableNo } = req.body;
//   // console.log(username, cart, Tamount, number, tableNo);

//   const options = {
//     amount: Tamount * 100,
//     currency: "INR",
//   };

//   const order = await instance.orders.create(options);
//   console.log(order);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// };

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};


module.exports = {
  newPayment,
  // checkStatus,
  paymentVerification,
  // getKey,
};
