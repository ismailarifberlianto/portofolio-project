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
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((url) => url.trim())
  : ["http://localhost:5173", "https://portofolio.mailab.my.id"];

const app = express();
app.set('trust proxy', 1);

// Basic Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS Policy"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
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
app.use("/projects", projectRoutes);
app.use("/api/admin/projects", projectRoutes.adminRouter);
app.use("/api/admin", authRoutes);
app.use("/api/contact", messageRoutes);
app.use("/api/admin/upload", uploadRoutes);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on ${PORT}`);

  try {
    await connectDB();
    console.log("Database connected");
  } catch (error) {
    console.error("Failed connecting to Database:", error.message);
  }
});