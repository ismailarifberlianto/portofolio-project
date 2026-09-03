import request from "./api";

export function getProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/projects${query ? `?${query}` : ""}`);
}

export function getProjectById(id) {
  return request(`/projects/${id}`);
}