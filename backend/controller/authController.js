const UserModel = require("../model/userModel");
const { catchAsyncError } = require("../utils/catchAsyncError");
const { signToken, verifyToken } = require("../utils/jwtActions");

const AppError = require("../utils/appError");

exports.signup = catchAsyncError(async (req, res, next) => {
  //1. GET INFO FROM USER
  const { name, email, password, confirmPassword, passwordChangedAt, role } =
    req.body;

  //2. CREATE NEW USER
  const newUser = await UserModel.create({
    name,
    email,
    password,
    confirmPassword,
    passwordChangedAt,
    role,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }

  const token = signToken(user._id);

  res.json({ status: "success", token, data: { user } });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  //1. CHECK TOKEN EXISTS
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You're not logged in! Please login to continue", 401),
    );
  }

  //2. VERIFY THE TOKEN
  const decoded = await verifyToken(token);

  //3. CHECK IF USER STILL EXISTS
  const freshUser = await UserModel.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError("The token belonging to the user doesn't exists", 401),
    );

  //4.CHECK IF USER CHANGED THE PASSWORD AFTER THE TOKEN WAS ISSUED
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password is recently changed. Please login again", 401),
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          "You don't have the permission to perform this action",
          403,
        ),
      );
    next();
  };
};

exports.updateMyPassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, password, confirmPassword } = req.body;
  if (!currentPassword || !password || !confirmPassword)
    return next(
      new AppError(
        "Please provide all field (currentPassword, password and confirmPassword) to update your password",
        400,
      ),
    );

  //1. GET USER FROM COLLECTOIN
  const user = await UserModel.findById(req.user._id).select("+password");

  //2. COMPARE AND CHECK IF CURRENT PASSWORD IS CORRECT OR NOT
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(
      new AppError("Incorrect current password! Password cannot be updated"),
    );
  }

  //3. IF CURRENT PASSWORD IS CORRECT, UPDATE THE PASSWORD
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  const updatedUser = await user.save();

  //to avoid responding with password, we've set password to undefined.
  updatedUser.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
