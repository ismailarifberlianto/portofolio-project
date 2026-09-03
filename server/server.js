require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");
const projectRoutes = require("./src/routes/projectRoutes");
const authRoutes = require("./src/routes/authRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const uploadRoutes = require("./src/routes/uploadRoutes");

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

app.use("/api/projects", projectRoutes);
app.use("/api/admin/projects", projectRoutes.adminRouter);
app.use("/api/admin", authRoutes);
app.use("/api/contact", messageRoutes);
app.use("/api/admin/upload", uploadRoutes);

app.use(errorHandler); 

async function startServer() {
  await connectDB(); // verifikasi koneksi MongoDB dulu sebelum server listen
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
}

startServer();