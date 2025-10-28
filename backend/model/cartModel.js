const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
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

cartSchema.methods.addProduct = async function (productId) {
  const ProductModel = require("./productModel");
  const AppError = require("../utils/appError");

  //1. checking if the product with that id actually exists or not
  const product = await ProductModel.findById(productId);
  if (!product) {
    return next(new AppError("Product doesn't exists", 404));
  }

  // checking if product already exists in cart or not
  const productIndex = this.products.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (productIndex > -1) {
    // if product already exists in the cart, increment the quantity by 1
    this.products[productIndex].quantity += 1;
  } else {
    // if product doesn't exist in the cart, adding new product with quantity 1
    this.products.push({ productId: product._id, quantity: 1 });
  }

  return await this.save();
};

cartSchema.methods.decreaseProductQuantityOrRemove = function (productId) {
  const AppError = require("../utils/appError");

  // finding product in the cart
  const productIndex = this.products.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (productIndex === -1) {
    return next(new AppError("Product not found in the cart", 404));
  }

  // if product is in cart, decreading quantity by one
  this.products[productIndex].quantity -= 1;

  // removing that product from cart if quantity becomes 0
  if (this.products[productIndex].quantity <= 0) {
    this.products.splice(productIndex, 1);
  }

  return this.save();
};

cartSchema.methods.deleteIfEmpty = async function () {
  if (this.products.length === 0) {
    await this.constructor.deleteOne({ _id: this._id });
    return true;
  }
  return false;
};

cartSchema.statics.findOrCreateCart = async function (userId) {
  let cart = await this.findOne({ creatorId: userId });

  if (!cart) {
    cart = await this.create({
      creatorId: userId,
      products: [],
    });
  }

  return cart;
};

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
