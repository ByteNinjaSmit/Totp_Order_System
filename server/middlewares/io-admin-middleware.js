const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const ioauthMiddleware = async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unothorized HTTP, Token not provided" });
  }
  console.log("Token from authmiddleware", token);
  const jwtToken = token.replace("Bearer", "").trim();
  
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).
    select({ 
      password: 0,
    });
    const adminRole = userData.isAdmin;
    if (!adminRole) {
        return res.status(403).json({ message: "Access denied. user is no an admin." })
    }
    socket.user = userData;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unothorized. Invalid Token. " });
  }
};

module.exports = ioauthMiddleware;
