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
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
