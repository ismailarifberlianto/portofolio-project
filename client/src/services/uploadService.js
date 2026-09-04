import request from "./api";

export function uploadImage(file, folder = "thumbnail") {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  return request("/admin/upload", {
    method: "POST",
    body: formData,
  });
}

export function deleteImage(fileId) {
  return request(`/admin/upload/${fileId}`, { method: "DELETE" });
}