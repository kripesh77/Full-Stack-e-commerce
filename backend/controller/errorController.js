const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateEntry = (err) => {
  return new AppError(
    `${err.keyValue.email || err.keyValue.name} already exists`,
    400,
  );
};

const handleValidationError = (err) => {
  const errorMessage = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  return new AppError(`Invalid input data. ${errorMessage}`, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, please login again!", 401);

const handleJWTTokenExpiredError = () =>
  new AppError("Token expired. Please relogin", 401);

function sendDevError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

function sendProdError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = {
      ...err,
      name: err.name,
      message: err.message,
      stack: err.stack,
    };

    if (error.code === 11000) error = handleDuplicateEntry(error);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError")
      error = handleJWTTokenExpiredError();

    sendProdError(error, res);
  }
};
