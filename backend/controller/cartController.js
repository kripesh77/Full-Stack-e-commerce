const { default: mongoose } = require("mongoose");
const CartModel = require("../model/cartModel");
const { catchAsyncError } = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

exports.getCart = catchAsyncError(async (req, res, next) => {
  console.log(req.user._id);
  const cart = await CartModel.findOne({ creatorId: req.user._id }).populate(
    "products.productId"
  );

  console.log(cart?.products);

  return res.status(200).json({
    status: "success",
    result: cart?.products?.length || 0,
    cart: cart?.products || null,
  });
});

exports.add = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    return next(new AppError("Invalid product id", 400));
  }
  //1. finding cart for the user. If not, creating one
  let cart = await CartModel.findOrCreateCart(req.user._id);

  //2. adding product to cart using instance method
  await cart.addProduct(req.params.productId);

  //3. populating products before responding
  await cart.populate("products.productId");

  return res.status(200).json({
    status: "success",
    message: "Product quantity increased successfully",
    cart,
  });
});

exports.remove = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    return next(new AppError("Invalid product id", 400));
  }

  try {
    // finding user's cart
    let cart = await CartModel.findOne({ creatorId: req.user._id });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    // decreasing quantity as well as removing product quantity if necessary using instance method
    await cart.decreaseProductQuantityOrRemove(req.params.productId);

    // checking if cart is empty and deleting if necessary
    const wasDeleted = await cart.deleteIfEmpty();

    if (wasDeleted) {
      return res.status(200).json({
        status: "success",
        message: "Product removed and cart deleted",
        cart: null,
      });
    }

    // populating product details before responding
    await cart.populate("products.productId");

    return res.status(200).json({
      status: "success",
      message: "Product quantity decreased successfully",
      cart,
    });
  } catch (error) {
    return next(error);
  }
});
