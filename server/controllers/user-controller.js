const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Order = require("../models/order-model");
const bcrypt = require("bcryptjs");

const getOrdersByUser = async (req, res, next) => {
  try {
    // Correctly retrieve the ID from route parameters
    const id = req.params.id;

    // Find orders based on buyer's ID
    const data = await Order.find({ buyer: id })
      .populate("buyer", "-password")
      .sort({ createdAt: -1 });

    // Respond with the found data
    return res.status(200).json(data);
  } catch (error) {
    // Log the error before passing it to the error handler
    console.error(`User Order Error: ${error.message}`);
    next(error);
  }
};

// get SIngle Order Detail
const getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = req.params.order;
    const data = await Order.findById({ _id: order }).populate(
      "buyer",
      "-password"
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(`User Single Order Error: ${error.message}`);
    next(error);
  }
};

// Update Profile name,phone,email
const updateProfile = async (req, res, next) => {
  try {
    const { id, username, phone, email } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { username, phone, email },
      { new: true }
    );
    return res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

//  Update User Password From Profile
const updatePassword = async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;
    // Validate input
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    // Hash the new password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(newPassword, saltRound);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { password: hash_password } },
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {}
};

module.exports = {
  getOrdersByUser,
  getSingleOrder,
  updateProfile,
  updatePassword,
};
