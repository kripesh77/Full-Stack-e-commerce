require("dotenv").config();
const { PORT, MY_DATABASE_LINK } = process.env;
const express = require("express");
const cors = require("cors");
const sellerRouter = require("./routes/seller");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const mongoose = require("mongoose");
const generalLimiter = require("./middleware/rate-limiter/generalLimiter");
const authLimiter = require("./middleware/rate-limiter/authLimiter");
const orderRouter = require("./routes/order");
const productTestRouter = require("./routes/productTest");
const app = express();

app.use(cors());
app.use(express.json());
app.use(generalLimiter);
app.use("/api/auth/seller", authLimiter, sellerRouter);
app.use("/api/auth/user", authLimiter, userRouter);
app.use("/api/products", productRouter);
app.use("/api/v2/products", productTestRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

async function main() {
  await mongoose.connect(MY_DATABASE_LINK);
  console.log("Connection to the database successful");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
main();
