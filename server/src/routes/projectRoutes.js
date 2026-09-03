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

// Admin (dipasang terpisah di app.js dengan prefix /api/admin/projects)
module.exports.adminRouter = express.Router()
  .use(authMiddleware)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", remove);