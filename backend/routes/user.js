require("dotenv").config();
const { JWT_SECRET_USER } = process.env;

const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/db");
const AuthMiddlewareUser = require("../middleware/user/AuthMiddleware");

const app = express();

app.use(express.json());
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const reqBodySchema = z.object({
    name: z.string().min(3, "Please provide valid name"),
    email: z.email("Please provide valid email"),
    password: z.string().min(6, "Password must be atleast 6 character long"),
  });
  const parsedDataWithSuccess = reqBodySchema.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res
      .status(400)
      .json({ error: parsedDataWithSuccess.error.format() });
  }

  const { name, email, password } = parsedDataWithSuccess.data;
  const trimmedEmail = email.toLowerCase().trim();
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    //if there already exists a user with the email, then this create function throws an exception
    await UserModel.create({
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

userRouter.post("/signin", async (req, res) => {
  const reqBodySchema = z.object({
    email: z.email("please provide a valid email"),
    password: z.string().min(6, "Please provide valid password"),
  });
  const parsedDataWithSuccess = reqBodySchema.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res
      .status(400)
      .json({ error: parsedDataWithSuccess.error.format() });
  }

  const { email, password } = req.body;
  const trimmedEmail = email.toLowerCase().trim();
  const user = await UserModel.findOne({ email: trimmedEmail });
  if (user) {
    const { password: hash } = user;
    const isPasswordCorrect = await bcrypt.compare(password, hash);
    if (!isPasswordCorrect)
      return res.status(409).json({ message: "Password Incorrect" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_USER);
    res.status(200).json({ token });
  } else {
    res.status(409).json({ message: "User doesnot exists" });
  }
});

userRouter.get("/me", AuthMiddlewareUser, async (req, res) => {
  const { userId } = req;
  const user = await UserModel.findOne({ _id: userId });
  if (user) {
    const { id, name, email } = user;
    res.status(200).json({ id, name, email });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = userRouter;
