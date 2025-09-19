const express = require("express");
const productTestRouter = express.Router();
const { ProductModel } = require("../models/db");

const categoryOptions = Object.freeze({
  0: "all",
  1: "Full Helmet",
  2: "Half Helmet",
  3: "Accessories",
});

productTestRouter.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 3, category: categoryNumber = 0 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const category = Number(categoryNumber);
    const skip = (pageNum - 1) * limitNum;

    if (category !== 0 && !categoryOptions[category]) {
      return res.status(400).json({
        message:
          "Please provide valid category number. 0 for 'all', 1 for 'Full Helmet', 2 for 'Half Helmet' or 3 for 'Accessories'",
      });
    }

    let query = {};
    let products;
    let totalProducts;

    if (category === 0) {
      products = await ProductModel.find().skip(skip).limit(limitNum);
      totalProducts = await ProductModel.countDocuments();
    } else {
      const categoryName = categoryOptions[category];
      query = { category: { $regex: categoryName, $options: "i" } };

      products = await ProductModel.find(query).skip(skip).limit(limitNum);
      totalProducts = await ProductModel.countDocuments(query);
    }

    const totalPages = Math.ceil(totalProducts / limitNum);

    res.status(200).json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
        limit: limitNum,
      },
      category: categoryOptions[category] || "all",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = productTestRouter;
