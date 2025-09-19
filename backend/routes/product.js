const express = require("express");
const { ProductModel } = require("../models/db");
const AuthMiddlewareSeller = require("../middleware/seller/AuthMiddleware");
const productInputValidation = require("../middleware/seller/productInputValidation/productInputValidation");
const mongoose = require("mongoose");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    // If search parameter is provided, perform search
    if (search) {
      const keyword = search.trim();

      if (!keyword) {
        return res
          .status(400)
          .json({ error: "Search keyword cannot be empty" });
      }

      // Create regex pattern for case-insensitive search
      const searchRegex = new RegExp(keyword, "i");

      // Search in name, description, and category fields
      const products = await ProductModel.find({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
        ],
      });

      if (products.length === 0) {
        return res.status(404).json({
          message: "No products found. Try searching other products.",
          products: [],
        });
      }

      return res.status(200).json({
        message: `Found ${products.length} product(s) matching "${keyword}"`,
        products,
      });
    }

    // If no search parameter, return all products
    const products = await ProductModel.find({});
    res.status(200).json({ products });
  } catch (error) {
    return res.status(501).json({ error: "Internal error occured !!" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id.trim();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  try {
    const product = await ProductModel.findOne({ _id: id });
    if (product) {
      res.status(200).json({ product });
    } else {
      return res.status(404).json({ error: "The product doesnot exist !" });
    }
  } catch (error) {
    return res.status(404).json({ error: "Internal issue" });
  }
});

productRouter.post(
  "/",
  AuthMiddlewareSeller,
  productInputValidation,
  async (req, res) => {
    const data = req.data;
    try {
      const product = await ProductModel.create(data);
      res.status(200).json({ message: "Product Added Successfully", product });
    } catch (e) {
      res.status(501).json({ error: "Unexpected error occured" });
    }
  }
);

productRouter.patch(
  "/:id",
  AuthMiddlewareSeller,
  productInputValidation,
  async (req, res) => {
    const { id } = req.params;
    const data = req.data;
    try {
      const product = await ProductModel.findOneAndUpdate(
        { _id: id, creatorId: data.creatorId },
        data,
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Data updated successfully", product });
    } catch (error) {
      return res
        .status(501)
        .json({ error: "Update unsuccessful, Please try again later" });
    }
  }
);

productRouter.delete("/:id", AuthMiddlewareSeller, async (req, res) => {
  const sellerId = req.sellerId;
  const { id } = req.params;
  try {
    const product = await ProductModel.findOneAndDelete({
      _id: id,
      creatorId: sellerId,
    });
    if (product) {
      return res
        .status(200)
        .json({ message: "Data deleted successfully", product });
    } else {
      return res.status(404).json({
        error:
          "Product doesnot exists or you donot have access to modify the product",
      });
    }
  } catch (e) {
    res
      .status(501)
      .json({ error: "Error deleting the product, try again later" });
  }
});

module.exports = productRouter;
