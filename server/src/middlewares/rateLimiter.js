const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again in 15 minutes." }
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages sent. Please try again in 1 hour." }
})

module.exports = { loginLimiter, contactLimiter }