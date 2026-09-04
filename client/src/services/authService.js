import request, { setToken, clearToken, getToken } from "./api";

export function login(email, password) {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function logout() {
  clearToken();
}

export { setToken };