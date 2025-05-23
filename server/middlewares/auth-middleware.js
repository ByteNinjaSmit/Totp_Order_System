const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unothorized HTTP, Token not provided" });
  }
  // console.log("Token from authmiddleware", token);
  const jwtToken = token.replace("Bearer", "").trim();
  
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).
    select({ 
      password: 0,
    });
    req.user=userData;
    req.token=token;
    req.userID=userData._id;
    // console.log(userData);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unothorized. Invalid Token. " });
  }
};

module.exports = authMiddleware;
