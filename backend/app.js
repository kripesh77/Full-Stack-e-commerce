const express = require("express");
const path = require("path");
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

// API routes - Define API routes BEFORE serving static files
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

// Serve static files from React frontend app in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build folder
  const frontendBuildPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendBuildPath));
  
  // Handle React routing - return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  // Health check endpoint for development
  app.get("/", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "E-commerce API is running",
      environment: process.env.NODE_ENV || "development",
    });
  });
}

// Handle undefined API routes
app.use("/api/*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
