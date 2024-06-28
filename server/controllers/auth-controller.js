const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

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
    console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
