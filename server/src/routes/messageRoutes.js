const express = require("express");
const router = express.Router();
const { create } = require("../controllers/messageController");
const { contactLimiter } = require("../middlewares/rateLimiter");

router.post("/", contactLimiter, create);

module.exports = router;