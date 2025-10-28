const express = require("express");
const {
  signup,
  login,
  protect,
  updateMyPassword,
} = require("../controller/authController");
const {
  me,
  updateMe,
  getAllUsers,
  deleteMe,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.get("/", getAllUsers);

userRouter.get("/me", protect, me);
userRouter.patch("/updateMe", protect, updateMe);
userRouter.patch("/updateMyPassword", protect, updateMyPassword);
userRouter.delete("/deleteMe", protect, deleteMe);

module.exports = userRouter;
