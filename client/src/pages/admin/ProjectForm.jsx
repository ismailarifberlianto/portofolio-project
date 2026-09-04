import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectById, createProject, updateProject } from "../../services/projectService";
import { uploadImage, deleteImage } from "../../services/uploadService";
import "./ProjectForm.css";

const EMPTY_FORM = {
  title: "",
  description: "",
  techStack: "",
  category: "solo",
  role: "",
  liveUrl: "",
  repoUrl: "",
};

function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [thumbnail, setThumbnail] = useState({ url: "", fileId: "" });
  const [images, setImages] = useState([]); // [{url, fileId}]
  const [status, setStatus] = useState(isEdit ? "loading" : "ready"); // loading | ready | saving | error
  const [error, setError] = useState("");
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    getProjectById(id)
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title || "",
          description: p.description || "",
          techStack: (p.techStack || []).join(", "),
          category: p.category || "solo",
          role: p.role || "",
          liveUrl: p.liveUrl || "",
          repoUrl: p.repoUrl || "",
        });
        setThumbnail({ url: p.thumbnailUrl || "", fileId: p.thumbnailFileId || "" });
        setImages(p.images || []);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message || "Failed to load project");
        setStatus("error");
      });
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    setError("");

    try {
      // Kalau ganti thumbnail lama, hapus yang lama dulu di ImageKit
      if (thumbnail.fileId) {
        await deleteImage(thumbnail.fileId).catch(() => null);
      }
      const res = await uploadImage(file, "thumbnail");
      setThumbnail({ url: res.data.url, fileId: res.data.fileId });
    } catch (err) {
      setError(err.message || "Failed to upload thumbnail");
    } finally {
      setUploadingThumbnail(false);
    }
  }

  async function handleGalleryChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingGallery(true);
    setError("");

    try {
      const uploaded = await Promise.all(files.map((file) => uploadImage(file, "gallery")));
      setImages((prev) => [
        ...prev,
        ...uploaded.map((res) => ({ url: res.data.url, fileId: res.data.fileId })),
      ]);
    } catch (err) {
      setError(err.message || "Failed to upload screenshots");
    } finally {
      setUploadingGallery(false);
    }
  }

  async function handleRemoveImage(fileId) {
    try {
      await deleteImage(fileId).catch(() => null);
      setImages((prev) => prev.filter((img) => img.fileId !== fileId));
    } catch (err) {
      setError(err.message || "Failed to remove image");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const payload = {
      title: form.title,
      description: form.description,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category: form.category,
      role: form.role,
      liveUrl: form.liveUrl,
      repoUrl: form.repoUrl,
      thumbnailUrl: thumbnail.url,
      thumbnailFileId: thumbnail.fileId,
      images,
    };

    try {
      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save project");
      setStatus("ready");
    }
  }

  if (status === "loading") return <p className="project-form__hint">Loading project...</p>;

  return (
    <div className="project-form">
      <h1>{isEdit ? "Edit Project" : "New Project"}</h1>

      {error && <p className="project-form__error">{error}</p>}

      <form onSubmit={handleSubmit} className="project-form__form">
        <label className="project-form__field">
          <span>Title</span>
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label className="project-form__field">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </label>

        <label className="project-form__field">
          <span>Tech Stack (comma separated)</span>
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />
        </label>

        <div className="project-form__row">
          <label className="project-form__field">
            <span>Category</span>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="solo">Solo</option>
              <option value="team">Team</option>
            </select>
          </label>

          <label className="project-form__field">
            <span>Role</span>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Full-Stack Developer"
            />
          </label>
        </div>

        <div className="project-form__row">
          <label className="project-form__field">
            <span>Live Demo URL</span>
            <input name="liveUrl" value={form.liveUrl} onChange={handleChange} />
          </label>

          <label className="project-form__field">
            <span>Repository URL</span>
            <input name="repoUrl" value={form.repoUrl} onChange={handleChange} />
          </label>
        </div>

        <div className="project-form__field">
          <span>Thumbnail</span>
          {thumbnail.url && (
            <img
              src={thumbnail.url}
              alt="Thumbnail preview"
              className="project-form__thumb-preview"
            />
          )}
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {uploadingThumbnail && <p className="project-form__hint">Uploading...</p>}
        </div>

        <div className="project-form__field">
          <span>Screenshots (gallery)</span>
          <div className="project-form__gallery">
            {images.map((img) => (
              <div key={img.fileId} className="project-form__gallery-item">
                <img src={img.url} alt="Screenshot" />
                <button type="button" onClick={() => handleRemoveImage(img.fileId)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
          {uploadingGallery && <p className="project-form__hint">Uploading...</p>}
        </div>

        <button type="submit" className="project-form__submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;