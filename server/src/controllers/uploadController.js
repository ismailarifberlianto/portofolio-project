const getImagekit = require("../config/imagekit");

// POST /api/admin/upload (admin, multipart/form-data field "image")
async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imagekit = getImagekit();
    const folder =
      req.body.folder === "gallery" ? "/portfolio/gallery" : "/portfolio/thumbnails";

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder,
      useUniqueFileName: true,
    });

    res.status(201).json({
      message: "Successfully uploaded",
      data: {
        url: result.url,
        fileId: result.fileId,
        thumbnailUrl: result.thumbnailUrl,
        width: result.width,
        height: result.height,
      },
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/admin/upload/:fileId (admin)
async function deleteImage(req, res, next) {
  try {
    const imagekit = getImagekit();
    await imagekit.deleteFile(req.params.fileId);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadImage, deleteImage };