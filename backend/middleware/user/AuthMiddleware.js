require("dotenv").config();
const { JWT_SECRET_USER } = process.env;
const jwt = require("jsonwebtoken");

function AuthMiddlewareUser(req, res, next) {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //If token is invalid, this throws an error
    const { userId } = jwt.verify(token, JWT_SECRET_USER);
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = AuthMiddlewareUser;
