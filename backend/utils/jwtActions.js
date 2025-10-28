const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.verifyToken = async (token) =>
  await promisify(jwt.verify)(token, process.env.JWT_SECRET);
