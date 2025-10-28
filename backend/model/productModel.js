const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: { type: Number, required: [true, "Product price is required"] },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
