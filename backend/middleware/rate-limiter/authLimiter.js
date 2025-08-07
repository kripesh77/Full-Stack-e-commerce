const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 3, // 3 requests per 5 seconds
  message: "Too many attempts, please try again in a few seconds.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = authLimiter;
