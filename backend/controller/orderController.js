const OrderModel = require("../model/orderModel");
const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const { catchAsyncError } = require("../utils/catchAsyncError");

function generatePublicToken() {
  return crypto.randomBytes(16).toString("hex");
}

async function calculateTotalAmount(products) {
  let total = 0;

  for (let item of products) {
    const product = await ProductModel.findById(item.productId);
    if (!product) {
      throw new AppError(`Product not found: ${item.productId}`, 400);
    }
    if (product.stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        400
      );
    }
    total += product.price * item.quantity;
  }

  return total;
}

function generateEsewaSignature(totalAmount, transactionUuid, productCode) {
  const data = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const secretKey = process.env.ESEWA_SECRET_KEY;

  return crypto.createHmac("sha256", secretKey).update(data).digest("base64");
}

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  // 1. Get user's cart with products
  const cart = await CartModel.findOne({ creatorId: userId }).populate(
    "products.productId"
  );

  if (!cart || cart.products.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  // 2. Calculate total amount and validate stock
  const totalAmount = await calculateTotalAmount(cart.products);

  // 3. Create order (payment is still pending)
  const publicToken = generatePublicToken();
  const order = await OrderModel.create({
    creatorId: userId,
    products: cart.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    })),
    totalAmount: totalAmount,
    publicToken: publicToken,
    paymentStatus: "pending",
  });

  // 4. Generate eSewa payment data
  const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
  const signature = generateEsewaSignature(
    totalAmount,
    publicToken,
    productCode
  );

  const paymentData = {
    amount: totalAmount,
    tax_amount: "0",
    product_service_charge: "0",
    product_delivery_charge: "0",
    total_amount: totalAmount,
    transaction_uuid: publicToken,
    product_code: productCode,
    success_url: `${process.env.BACKEND_URL}/api/v1/orders/verify-payment`,
    failure_url: `${process.env.FRONTEND_URL}/payment-failed`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: signature,
  };

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: {
      order: order,
      paymentData: paymentData,
      esewaPaymentUrl: process.env.ESEWA_PAYMENT_URL,
    },
  });
});

exports.verifyEsewaPayment = catchAsyncError(async (req, res, next) => {
  const { data } = req.query;

  if (!data) {
    // Payment failed or was cancelled
    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }

  // 1. Decode eSewa response
  const decodedData = JSON.parse(Buffer.from(data, "base64").toString());
  const {
    transaction_uuid,
    transaction_code,
    status,
    total_amount,
    product_code,
    signed_field_names,
    signature,
  } = decodedData;

  // 2. Find the order
  const order = await OrderModel.findOne({ publicToken: transaction_uuid });
  if (!order) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-failed?reason=order_not_found`
    );
  }

  // 3. If payment already processed, redirect to success
  if (order.paymentStatus === "completed") {
    return res.redirect(
      `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`
    );
  }

  // 4. Verify signature using signed_field_names from response
  const fieldNames = signed_field_names.split(",");
  const signatureData = fieldNames
    .map((field) => `${field}=${decodedData[field]}`)
    .join(",");

  const computedSignature = crypto
    .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
    .update(signatureData)
    .digest("base64");

  if (computedSignature !== signature) {
    // Update order status to failed
    await OrderModel.findByIdAndUpdate(order._id, { paymentStatus: "failed" });
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-failed?reason=invalid_signature`
    );
  }

  // 5. Verify amount matches
  if (parseFloat(total_amount) !== order.totalAmount) {
    await OrderModel.findByIdAndUpdate(order._id, { paymentStatus: "failed" });
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-failed?reason=amount_mismatch`
    );
  }

  if (status === "COMPLETE") {
    // 6. Update order payment status
    order.paymentStatus = "completed";
    order.esewaTransactionCode = transaction_code;
    await order.save();

    // 7. Update product stock (non-atomic, but acceptable)
    for (let item of order.products) {
      await ProductModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // 8. Clear user's cart (only if payment successful)
    await CartModel.findOneAndUpdate(
      { creatorId: order.creatorId },
      { $set: { products: [] } }
    );

    // Redirect to frontend success page
    return res.redirect(
      `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`
    );
  } else {
    // Payment failed
    order.paymentStatus = "failed";
    await order.save();
    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
});

exports.getOrderHistory = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await OrderModel.find({ creatorId: userId })
    .populate("products.productId")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// Check payment status with eSewa (fallback if no response received)
exports.checkPaymentStatus = catchAsyncError(async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  // Find the order
  const order = await OrderModel.findOne({ _id: orderId, creatorId: userId });
  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // If already completed, return current status
  if (order.paymentStatus === "completed") {
    return res.status(200).json({
      success: true,
      data: { status: "completed", order },
    });
  }

  // Check with eSewa
  const esewaStatusUrl = process.env.ESEWA_STATUS_CHECK_URL;
  const queryParams = new URLSearchParams({
    product_code: process.env.ESEWA_PRODUCT_CODE,
    total_amount: order.totalAmount.toString(),
    transaction_uuid: order.publicToken,
  });

  try {
    const response = await fetch(`${esewaStatusUrl}?${queryParams}`);
    const data = await response.json();

    if (data.status === "COMPLETE") {
      // Update order
      order.paymentStatus = "completed";
      order.esewaTransactionCode = data.ref_id;
      await order.save();

      // Update stock and clear cart
      for (let item of order.products) {
        await ProductModel.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }

      await CartModel.findOneAndUpdate(
        { creatorId: order.creatorId },
        { $set: { products: [] } }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: { status: "completed", order },
      });
    } else if (data.status === "PENDING") {
      return res.status(200).json({
        success: true,
        message: "Payment is still pending",
        data: { status: "pending", order },
      });
    } else {
      // Payment failed or other status
      order.paymentStatus = "failed";
      await order.save();

      return res.status(200).json({
        success: true,
        message: `Payment status: ${data.status}`,
        data: { status: data.status.toLowerCase(), order },
      });
    }
  } catch (error) {
    return next(
      new AppError("Failed to verify payment status with eSewa", 500)
    );
  }
});
