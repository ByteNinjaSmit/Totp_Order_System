const express = require("express");
const services = require("../controllers/service-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const OrderForm = require("../controllers/order-controller");

router.route('/service').get(services.services);
router.route('/service/order/data/:id').get(authMiddleware,services.OrderData);
router.route('/service/:id/order/data').post(authMiddleware,OrderForm);

module.exports=router;