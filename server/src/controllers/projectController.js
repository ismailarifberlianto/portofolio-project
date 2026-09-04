const Project = require("../models/Project");
const getImagekit = require("../config/imagekit");

// GET /api/projects (public) — filter opsional category solo atau team
async function getAll(req, res, next) {
  try {
    const { category } = req.query;
    let query = Project.query();

    if (category) query = query.where("category", category);

    const projects = await query.orderBy("createdAt", "desc").all();
    res.json({ data: projects });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:id (public)
async function getById(req, res, next) {
  try {
    const project = await Project.find(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projek tidak ditemukan" });
    }

    res.json({ data: project });
  } catch (err) {
    next(err);
  }
}

// POST /api/admin/projects (admin)
async function create(req, res, next) {
  try {
    const {
      title,
      description,
      techStack,
      category,
      role,
      thumbnailUrl,
      thumbnailFileId,
      images,
      liveUrl,
      repoUrl,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title dan description wajib diisi" });
    }

    const project = await Project.create({
      title,
      description,
      techStack: techStack || [],
      category: category || "solo",
      role: role || "",
      thumbnailUrl: thumbnailUrl || "",
      thumbnailFileId: thumbnailFileId || "",
      images: images || [],
      liveUrl: liveUrl || "",
      repoUrl: repoUrl || "",
      createdBy: req.admin.id,
    });

    res.status(201).json({ message: "Projek berhasil dibuat", data: project });
  } catch (err) {
    next(err);
  }
}

// PUT /api/admin/projects/:id (admin)
async function update(req, res, next) {
  try {
    const existing = await Project.find(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Projek tidak ditemukan" });
    }

    if (
      req.body.thumbnailFileId &&
      existing.thumbnailFileId &&
      req.body.thumbnailFileId !== existing.thumbnailFileId
    ) {
      try {
        await getImagekit().deleteFile(existing.thumbnailFileId);
      } catch (err) {
        console.error("Gagal hapus thumbnail lama di ImageKit:", err.message);
      }
    }

    const updated = await Project.where("_id", req.params.id).update(req.body);

    res.json({ message: "Projek berhasil diperbarui", data: updated });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/admin/projects/:id (admin)
async function remove(req, res, next) {
  try {
    const existing = await Project.find(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Projek tidak ditemukan" });
    }

    const fileIds = [
      existing.thumbnailFileId,
      ...((existing.images || []).map((img) => img.fileId)),
    ].filter(Boolean);

    if (fileIds.length) {
      try {
        await getImagekit().bulkDeleteFiles(fileIds);
      } catch (err) {
        console.error("Gagal hapus file terkait di ImageKit:", err.message);
      }
    }

    await Project.destroy(req.params.id);

    res.json({ message: "Projek berhasil dihapus" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };