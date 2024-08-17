require("dotenv").config();
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const PasswordResetToken = require("../models/passwordToken-model");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to world best website mern series by smitraj using router"
      );
  } catch (error) {
    console.log(error);
  }
};

// *--------------------------
// User Registration Logic
// *--------------------------

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

// *--------------------------
// User Login Logic
// *--------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email Or Password" });
    }
  } catch (error) {
    res.status(400).json("internal server error");
  }
};

// *--------------------------
// to send User data Logic - User Data
// *--------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, mobile } = req.body;
    const user = await User.findOne({ email, phone: mobile });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or mobile number." });
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = Date.now() + 3600000; // Token valid for 1 hour

    const resetToken = new PasswordResetToken({
      userId: user._id,
      token,
      expiresAt,
    });

    await resetToken.save();

    const resetLink = `${process.env.CORS_SERVER}/forgotsuccess?_id=${user._id}&token=${token}`;
    return res.status(200).json({ redirectUrl: resetLink }); // Update to match frontend
  } catch (error) {
    next(error);
  }
};


const resetPassword = async (req, res, next) => {
  try {
    const { id,token } = req.params; // Token is passed as a URL parameter
    const { newPassword } = req.body;

    // Validate input
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Find and validate the reset token
    const resetToken = await PasswordResetToken.findOne({
      token,
      expiresAt: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }


    // Check if the userId from the token matches the provided userId
    if (resetToken.userId.toString() !== id) {
      return res.status(400).json({ message: "User ID does not match." });
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
    // Delete the reset token
    await PasswordResetToken.deleteOne({ token });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { home, register, login, user, forgotPassword, resetPassword };
