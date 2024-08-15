const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Order = require('../models/order-model');
const { json, response } = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");

// Instance OF razorPay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Global variables (use with caution)
let globalUserId = null;
let globalCart = [];
let globalTamount = null;
let globalNumber = null;
let globalTableNo = null;

const newPayment = async (req, res) => {
  try {
    const { username, cart, Tamount, number, tableNo } = req.body;
    const userId = req.params.id;

    // Assign to global variables
    globalUserId = userId;
    globalCart = cart;
    globalTamount = Tamount;
    globalNumber = number;
    globalTableNo = tableNo;

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
    // console.log("Razorpay Order created:", order);

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


const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here Order And Payment
    // Sending Order and Payment Details 

    const orderData = {
      paymentOrderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      paymentStatus: "Completed",
      paymentMethod: "Razorpay",
      products: globalCart, // Use global cart
      buyer: globalUserId,
      amount: globalTamount / 100,
      tableNo: globalTableNo,
    };
    // Inserting Order and Payment Details in Database
    await Order.create(orderData);

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
