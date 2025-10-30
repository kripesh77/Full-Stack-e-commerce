const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "Product price is required"],
      get: (value) => (value ? parseFloat(value.toString()) : value),
    },
    imageUrl: {
      type: String,
      required: [true, "Product imageUrl is required"],
    },
    stock: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      default: "full helmet",
    },
    creatorId: mongoose.Schema.Types.ObjectId,
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
