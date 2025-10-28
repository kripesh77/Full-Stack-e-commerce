const express = require("express");
const { restrictTo, protect } = require("../controller/authController");
const { add, getCart, remove } = require("../controller/cartController");
const cartRouter = express.Router();

cartRouter.get("/", protect, restrictTo("user"), getCart);
cartRouter.post("/add/:productId", protect, restrictTo("user"), add);
cartRouter.post("/remove/:productId", protect, restrictTo("user"), remove);

module.exports = cartRouter;
