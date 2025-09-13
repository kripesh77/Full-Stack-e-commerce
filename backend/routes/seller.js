require("dotenv").config();
const { JWT_SECRET_SELLER } = process.env;

const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SellerModel } = require("../models/db");
const AuthMiddlewareSeller = require("../middleware/seller/AuthMiddleware");

const app = express();

app.use(express.json());
const sellerRouter = express.Router();

sellerRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const reqBodySchema = z.object({
    name: z.string().min(3, "Please provide valid name"),
    email: z.email("Please provide valid email"),
    password: z.string().min(6, "Password must be atleast 6 character long"),
  });
  const parsedDataWithSuccess = reqBodySchema.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res
      .status(400)
      .json({ error: z.treeifyError(parsedDataWithSuccess.error) });
  }

  const { email, password } = parsedDataWithSuccess.data;
  const trimmedEmail = email.toLowerCase().trim();
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    //if there already exists a seller with the email, then this create function throws an exception
    await SellerModel.create({
      ...parsedDataWithSuccess.data,
      email: trimmedEmail,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Signup successful !" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});

sellerRouter.post("/signin", async (req, res) => {
  const reqBodySchema = z.object({
    email: z.email("please provide a valid email"),
    password: z.string().min(6, "Please provide valid password"),
  });
  const parsedDataWithSuccess = reqBodySchema.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res
      .status(400)
      .json({ error: z.treeifyError(parsedDataWithSuccess.error) });
  }

  const { email, password } = req.body;
  const trimmedEmail = email.toLowerCase().trim();
  const seller = await SellerModel.findOne({ email: trimmedEmail });
  if (seller) {
    const isPasswordCorrect = await bcrypt.compare(password, seller.password);
    if (!isPasswordCorrect)
      return res.status(409).json({ error: "Password Incorrect" });

    const token = jwt.sign({ sellerId: seller._id }, JWT_SECRET_SELLER);
    res.status(200).json({ token });
  } else {
    res.status(409).json({ error: "Seller doesnot exists" });
  }
});

sellerRouter.get("/me", AuthMiddlewareSeller, async (req, res) => {
  const { sellerId } = req;
  const user = await SellerModel.findOne({ _id: sellerId });
  if (user) {
    const { id, name, email } = user;
    res.status(200).json({ id, name, email });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = sellerRouter;
