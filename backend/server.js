require("dotenv").config();
const { PORT = 5000, MY_DATABASE_LINK, NODE_ENV, CORS_ORIGIN } = process.env;
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

// CORS configuration for production
const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? [CORS_ORIGIN, "https://your-domain.sevalla.com"]
      : true,
  credentials: true,
};

app.use(cors(corsOptions));
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
