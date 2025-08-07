require("dotenv").config();
const { JWT_SECRET_SELLER } = process.env;
const jwt = require("jsonwebtoken");

function AuthMiddlewareSeller(req, res, next) {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //If token is invalid, this throws an error
    const { sellerId } = jwt.verify(token, JWT_SECRET_SELLER);
    req.sellerId = sellerId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = AuthMiddlewareSeller;
