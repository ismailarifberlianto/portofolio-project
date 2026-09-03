const Message = require("../models/Message");

// POST /api/contact (public)
async function create(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi" });
    }

    await Message.create({ name, email, message });

    // TODO Milestone 4/lanjutan: kirim notifikasi via nodemailer di sini kalau mau

    res.status(201).json({ message: "Pesan berhasil dikirim" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create };