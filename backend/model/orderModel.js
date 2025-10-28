const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  // NEW: Add payment status field
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  // NEW: Store eSewa transaction details
  esewaTransactionCode: { type: String },
  totalAmount: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publicToken: { type: String, unique: true, required: true },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
