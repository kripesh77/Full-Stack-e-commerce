const UserModel = require("../model/userModel");
const AppError = require("../utils/appError");
const { catchAsyncError } = require("../utils/catchAsyncError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.me = (req, res) => {
  const user = req.user;

  res.status(200).json({ status: "success", data: { details: user } });
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // this updateMe is for general updates, like (name, email)
  // we should have separate route to change our password

  if (req.body.password || req.body.confirmPassword) {
    console.log("hello");
    return next(
      new AppError(
        "Cannot update password through route. Please use /api/v1/users/updateMyPassword route",
        400
      )
    );
  }

  // Also, we don't want user to change everything
  // We want to filter the changes
  // This is curcial as they might request for their role to change to admin, which should not be possible.
  const filteredBody = filterObj(req.body, "name", "email"); // name and email are allowed fields
  const updatedUserInfo = await UserModel.findByIdAndUpdate(
    req.user._id,
    filteredBody,
    { new: true, runValidators: true }
  );

  res.status(200).json({ status: "success", data: { user: updatedUserInfo } });
});

//rather than deleting the user, flaggin the user as inactive
exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find().select("-role -__v");

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});
