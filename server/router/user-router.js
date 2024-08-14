const express = require('express');
const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const router = express.Router();

// Get Order Of That User
router.route('/:id/user/orders').get(authMiddleware,  userController.getOrdersByUser);
// Get Single Order Detail
router.route('/:id/user/orders/view/:order').get(authMiddleware,  userController.getSingleOrder);



module.exports = router;
