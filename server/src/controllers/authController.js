const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const user = await User.where("email", email).first();

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };