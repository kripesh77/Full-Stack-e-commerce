const express = require("express");
const AuthMiddlewareUser = require("../middleware/user/AuthMiddleware");
const cartRouter = express.Router();
const mongoose = require("mongoose");
const { CartModel } = require("../models/db");

cartRouter.use(AuthMiddlewareUser);

cartRouter.get("/", async (req, res) => {
  const creatorId = req.userId;
  try {
    // Find the cart for the user and populate product details
    const cart = await CartModel.findOne({ creatorId }).populate(
      "products.productId"
    );
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Internal error occured" });
  }
});

cartRouter.post("/:productId", async (req, res) => {
  const creatorId = req.userId;
  const { productId } = req.params;
  const quantity = Number(req?.body?.quantity || 1);
  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    return res.status(400).json({
      error: `${!quantity ? "Please provide quantity" : "Invalid request"}`,
    });
  }

  try {
    let cart = await CartModel.findOne({ creatorId });

    if (cart) {
      // Checking if product already in cart
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        // if product exists, updating quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // if product is not in the cart, adding new
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    } else {
      // no cart, so creating new
      cart = await CartModel.create({
        creatorId,
        products: [{ productId, quantity }],
      });
    }

    // Responding with the updated cart
    return res.status(200).json(cart);
  } catch (e) {
    return res.status(500).json({ error: "Internal error occured" });
  }
});

cartRouter.put("/:productId", async (req, res) => {
  const creatorId = req.userId;
  const { productId } = req.params;
  const quantity = req?.body?.quantity;
  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    typeof quantity !== "number"
  ) {
    return res.status(400).json({
      error: `${!quantity ? "Please provide quantity" : "Invalid request"}`,
    });
  }

  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { creatorId, "products.productId": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: "Internal error occured" });
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

cartRouter.delete("/:productId", async (req, res) => {
  const creatorId = req.userId;
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  let cart = await CartModel.findOneAndUpdate(
    { creatorId },
    { $pull: { products: { productId } } },
    { new: true }
  );

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  if (cart.products.length === 0) {
    await CartModel.deleteOne({ _id: cart._id });
    return res
      .status(200)
      .json({ message: "Product removed and cart deleted" });
  }

  res.status(200).json({ message: "Product removed from cart", cart });
});

module.exports = cartRouter;
