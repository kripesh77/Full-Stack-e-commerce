const express = require("express");
const { protect } = require("../controller/authController");
const {
  createOrder,
  verifyEsewaPayment,
  getOrderHistory,
  checkPaymentStatus,
} = require("../controller/orderController");

const router = express.Router();

router.post("/checkout", protect, createOrder);
router.get("/verify-payment", verifyEsewaPayment);
router.get("/history", protect, getOrderHistory);
router.get("/status/:orderId", protect, checkPaymentStatus);

module.exports = router;
