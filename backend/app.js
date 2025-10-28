const express = require("express");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const productRouter = require("./routes/productRoute");
const morgan = require("morgan");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const cors = require("cors");

const app = express();

// Body parser
app.use(express.json());

// CORS configuration - allow frontend origin
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check endpoint for Sevalla
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "E-commerce API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
