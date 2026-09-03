const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadImage, deleteImage } = require("../controllers/uploadController");

router.use(authMiddleware);

router.post("/", upload.single("image"), uploadImage);
router.delete("/:fileId", deleteImage);

module.exports = router;