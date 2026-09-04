import request from "./api";

export function sendMessage(payload) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}