const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProductDetail,
} = require("../controller/productController");
const { protect, restrictTo } = require("../controller/authController");
const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getProduct);

productRouter
  .route("/createProduct")
  .post(protect, restrictTo("admin", "seller"), createProduct);

productRouter
  .route("/updateProductDetail/:id")
  .patch(protect, restrictTo("admin", "seller"), updateProductDetail);

module.exports = productRouter;
