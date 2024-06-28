const express = require('express');
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const adminMiddleware = require("../middlewares/admin-middleware");

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById)
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById)
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUsersById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router.route("/totp").get(authMiddleware, adminMiddleware, adminController.getTotp);


module.exports = router;