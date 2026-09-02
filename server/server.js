require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();

// Basic Middleware
app.use(cors({ origin: CLIENT_ORIGIN })); 
app.use(express.json());

// Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// TODO: pasang routes setelah dibuat (Milestone 3)
// app.use("/api/projects", require("./src/routes/projectRoutes"));
// app.use("/api/admin", require("./src/routes/authRoutes"));
// app.use("/api/contact", require("./src/routes/messageRoutes"));

async function startServer() {
  await connectDB(); // verifikasi koneksi MongoDB dulu sebelum server listen
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
}

startServer();