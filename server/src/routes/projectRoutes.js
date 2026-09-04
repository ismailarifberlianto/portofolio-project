const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;

// Admin (mounted separately in app.js with the /api/admin/projects prefix)
module.exports.adminRouter = express.Router()
  .use(authMiddleware)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", remove);