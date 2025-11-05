const { catchAsyncError } = require("../utils/catchAsyncError");
const ProductModel = require("../model/productModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const features = new APIFeatures(ProductModel.find(), req.query)
    .filter()
    .sort()
    .project()
    .paginate();

  const products = await features.query;

  const count = await ProductModel.countDocuments();

  const limit = req.query.limit * 1 || 8;

  const totalPages = Math.ceil(count / limit);
  const currentPage = req.query.page * 1 || 1;
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  res.status(200).json({
    status: "success",
    result: products.length,

    data: {
      products,
      totalPages,
      currentPage,
      hasNext,
      hasPrev,
    },
  });
});

exports.getProduct = catchAsyncError(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError(`Please provide product's id`, 400));

  const product = await ProductModel.findById(req.params.id);

  if (!product) return next(new AppError("The product doesn't exists", 404));

  return res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, imageUrl, stock, category } = req.body;

  const product = await ProductModel.create({
    name,
    description,
    price,
    imageUrl,
    stock,
    category,
    creatorId: req.user._id,
  });

  res.status(200).json({ status: "success", data: { product } });
});

exports.updateProductDetail = catchAsyncError(async (req, res, next) => {
  //If one is a seller, he can only update products created by him
  //Otherwise, if one is admin, they can update any products

  const isAdmin = req.user.role === "admin";

  const query = { _id: req.params.id };
  if (!isAdmin) {
    query.creatorId = req.user._id;
  }

  const product = await ProductModel.findOneAndUpdate(query, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new AppError("Tour not found with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
