const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { signupSchema, logininSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");

const validate = require("../middlewares/validate-middleware");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(logininSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

// To Forgot Password
router.route("/forgot-password").post(authControllers.forgotPassword);

// To Submit New Password 
router.route("/reset-password/:id/:token").patch(authControllers.resetPassword);

module.exports = router;
