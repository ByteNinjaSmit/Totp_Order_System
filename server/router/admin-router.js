const express = require('express');
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();
const multer = require('multer');


// Configure multer for file uploads
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    storage: multer.memoryStorage() // Store files in memory
});

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUsersById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// Get TOTP route
router.route("/totp").get(authMiddleware, adminMiddleware, adminController.getTotp);
router.route("/:id/orderData/totp").post(authMiddleware, adminController.order);

// GET Order 
router.route('/orders').get(authMiddleware, adminMiddleware, adminController.getAllOrders);
router.route('/orders/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateOrderById);
router.route("/orders/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteOrderById);

// Get All Services and Post Services
router.route("/services/data/single/:id").get(authMiddleware, adminMiddleware, adminController.getSingleServiceById);
router.route("/services/data").post(authMiddleware, adminMiddleware, adminController.ServiceForm);
router.route("/services/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateServiceById);
router.route("/services/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteServiceById);

// View Order
router.route('/orders/view/:id').get(authMiddleware, adminMiddleware, adminController.getOrderById);

// Staff 
router.route('/staff').get(authMiddleware, adminMiddleware, adminController.getAllStaff);
router.route("/staff/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deletestaffById);
router.route('/staff/data')
    .post(authMiddleware, adminMiddleware, upload.single('image'), adminController.StaffForm);


module.exports = router;
