const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const sellerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  creatorId: { type: ObjectId, required: true },
});

const orderSchema = new Schema({
  userId: { type: ObjectId, ref: "user", required: true },
  products: [
    {
      productId: {
        type: ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publicToken: { type: String, unique: true, required: true },
});

const cartSchema = new Schema({
  creatorId: { type: ObjectId, ref: "user", required: true },
  products: [
    {
      productId: {
        type: ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("user", userSchema);
const SellerModel = mongoose.model("seller", sellerSchema);
const ProductModel = mongoose.model("product", productSchema);
const OrderModel = mongoose.model("order", orderSchema);
const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  UserModel,
  SellerModel,
  ProductModel,
  OrderModel,
  CartModel,
};
