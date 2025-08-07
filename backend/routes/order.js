const express = require("express");
const crypto = require("crypto");
const AuthMiddlewareUser = require("../middleware/user/AuthMiddleware");
const { CartModel, OrderModel, ProductModel } = require("../models/db");
const AuthMiddlewareSeller = require("../middleware/seller/AuthMiddleware");
const orderRouter = express.Router();

// Create order and generate a public token
orderRouter.post("/", AuthMiddlewareUser, async (req, res) => {
  try {
    const creatorId = req.userId;
    const cart = await CartModel.findOne({ creatorId }).populate(
      "products.productId"
    );
    if (!cart || !cart.products.length) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Cart is empty or not found.",
      });
    }

    const totalPrice = cart.products.reduce((acc, item) => {
      return acc + item.quantity * item.productId.price;
    }, 0);

    const orderProducts = cart.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    // Generate a random public token
    const publicToken = crypto.randomBytes(24).toString("hex");

    const order = await OrderModel.create({
      userId: creatorId,
      products: orderProducts,
      totalPrice,
      publicToken,
    });
    await CartModel.deleteOne({ creatorId });

    return res.json({ order, publicToken });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Failed to create order.",
      details: err.message || err.toString(),
    });
  }
});

// Public route to track order by token
orderRouter.get("/track/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await OrderModel.findOne({ publicToken: token })
      .populate("products.productId")
      .select("-userId -__v"); // Hide sensitive info
    if (!order) {
      return res.status(404).json({
        error: "NotFound",
        message: "Order not found for this token.",
      });
    }
    return res.json({ order });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Failed to fetch order.",
      details: err.message || err.toString(),
    });
  }
});

//when pending, user can cancel the order
orderRouter.delete("/:orderId", AuthMiddlewareUser, async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findOne({
      _id: orderId,
      userId: req.userId,
    });
    if (!order) {
      return res.status(404).json({
        error: "NotFound",
        message: "Order not found for this user.",
      });
    }
    if (order.status !== "pending") {
      return res.status(400).json({
        error: "InvalidStatus",
        message: "Order cannot be canceled unless it is pending.",
      });
    }
    await OrderModel.deleteOne({ _id: orderId });
    return res.status(200).json({ message: "Order canceled successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Failed to cancel order.",
      details: err.message || err.toString(),
    });
  }
});

//seller can view all orders in his products
orderRouter.get("/seller/orders", AuthMiddlewareSeller, async (req, res) => {
  try {
    const sellerId = req.sellerId;
    // Get all product IDs for this seller
    const products = await ProductModel.find({ creatorId: sellerId });
    const productIds = products.map((p) => p._id.toString());

    // Find all orders that include at least one of the seller's products
    const orders = await OrderModel.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId");

    // For each order, filter products to only include those belonging to this seller
    const filteredOrders = orders.map((order) => {
      const filteredProducts = order.products.filter((prod) => {
        // prod.productId may be a populated object or just an id
        if (prod.productId && prod.productId.creatorId) {
          return prod.productId.creatorId.toString() === sellerId;
        } else if (prod.productId) {
          // fallback if not populated
          return productIds.includes(prod.productId.toString());
        }
        return false;
      });
      // Return order with only seller's products
      return {
        ...order.toObject(),
        products: filteredProducts,
      };
    });

    return res.json({ orders: filteredOrders });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Failed to fetch seller orders.",
      details: err.message || err.toString(),
    });
  }
});

//seller can update the status of the order
orderRouter.put("/:orderId/status", AuthMiddlewareSeller, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Status is required.",
    });
  }

  try {
    // Find the order
    const order = await OrderModel.findById(orderId).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({
        error: "NotFound",
        message: "Order not found.",
      });
    }

    // Get all product IDs for this seller
    const sellerId = req.sellerId;
    const products = await ProductModel.find({ creatorId: sellerId });
    const productIds = products.map((p) => p._id.toString());

    // Check if the order contains at least one product from this seller
    const hasSellerProduct = order.products.some((prod) => {
      if (prod.productId && prod.productId._id) {
        return productIds.includes(prod.productId._id.toString());
      }
      return false;
    });

    if (!hasSellerProduct) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You are not authorized to update this order's status.",
      });
    }

    // Update the order status
    order.status = status;
    await order.save();

    return res.json({ order });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Failed to update order status.",
      details: err.message || err.toString(),
    });
  }
});

module.exports = orderRouter;
