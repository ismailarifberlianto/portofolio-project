import request from "./api";

export function getProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/projects${query ? `?${query}` : ""}`);
}

export function getProjectById(id) {
  return request(`/projects/${id}`);
}

export function createProject(payload) {
  return request("/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProject(id, payload) {
  return request(`/admin/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProject(id) {
  return request(`/admin/projects/${id}`, { method: "DELETE" });
}