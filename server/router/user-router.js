const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const router = express.Router();

// Get Order Of That User
router
  .route("/:id/user/orders")
  .get(authMiddleware, userController.getOrdersByUser);
// Get Single Order Detail
router
  .route("/:id/user/orders/view/:order")
  .get(authMiddleware, userController.getSingleOrder);
// Update user Profile
router
  .route("/profile")
  .post(authMiddleware, userController.updateProfile);

// Change Password
router
  .route("/password")
  .post(authMiddleware, userController.updatePassword);
module.exports = router;
