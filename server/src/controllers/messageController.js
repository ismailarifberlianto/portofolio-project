const nodemailer = require("nodemailer");
const Message = require("../models/Message");

let transporter = null;
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// POST /api/contact (public)
async function create(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await Message.create({ name, email, message });

    if (transporter) {
      transporter
        .sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.ADMIN_NOTIFY_EMAIL,
          subject: `New message from ${name} (Portfolio Contact Form)`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })
        .catch((err) => console.error("Failed to send notification email:", err.message));
    }

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create };