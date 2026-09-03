const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 100, // 15 menit
  max: 5, // 5 percobaan
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit." }
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 100, // 1 jam
  max: 3, // 3 percobaan
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak pesan dikirim. Coba lagi dalam 1 jam." }
})

module.exports = { loginLimiter, contactLimiter }