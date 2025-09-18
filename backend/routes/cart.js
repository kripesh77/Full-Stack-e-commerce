const express = require("express");
const AuthMiddlewareUser = require("../middleware/user/AuthMiddleware");
const cartRouter = express.Router();
const mongoose = require("mongoose");
const { CartModel } = require("../models/db");

cartRouter.use(AuthMiddlewareUser);

cartRouter.get("/", async (req, res) => {
  const creatorId = req.userId;
  try {
    // finding the cart for the user and populating product details
    const cart = await CartModel.findOne({ creatorId }).populate(
      "products.productId"
    );
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Internal error occured" });
  }
});

cartRouter.post("/add/:productId", async (req, res) => {
  const creatorId = req.userId;
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    let cart = await CartModel.findOne({ creatorId });

    if (cart) {
      // checking if product already exists in cart
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        // if product exists, incrementing quantity by 1
        cart.products[productIndex].quantity += 1;
      } else {
        // if product doesn't exist, adding new product with quantity 1
        cart.products.push({ productId, quantity: 1 });
      }
      await cart.save();
    } else {
      // if no cart exists, creating new cart with this product
      cart = await CartModel.create({
        creatorId,
        products: [{ productId, quantity: 1 }],
      });
    }

    await cart.populate("products.productId");

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

cartRouter.post("/remove/:productId", async (req, res) => {
  const creatorId = req.userId;
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    let cart = await CartModel.findOne({ creatorId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // finding the product in cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // decreasing quantity by 1
    cart.products[productIndex].quantity -= 1;

    // removing product from the cart if quantity becomes 0
    if (cart.products[productIndex].quantity <= 0) {
      cart.products.splice(productIndex, 1);
    }

    //deleting the cart if products count becomes zero
    if (cart.products.length === 0) {
      await CartModel.deleteOne({ _id: cart._id });
      return res.status(200).json({
        message: "Product removed and cart deleted",
        cart: null,
      });
    }

    await cart.save();

    await cart.populate("products.productId");

    return res.status(200).json({
      message: "Product quantity decreased successfully",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

cartRouter.delete("/clearcart", async (req, res) => {
  const creatorId = req.userId;

  const result = await CartModel.deleteOne({ creatorId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Cart not found" });
  }

  return res.status(200).json({ message: "Cart cleared successfully" });
});

module.exports = cartRouter;
