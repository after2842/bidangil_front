// src/lib/api.js
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://bidangil.co";

/** Shorthand for regular REST calls */
export async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...opts,
  });
  return res;
}

/** Helper to build WebSocket URLs */
export function wsUrl(path) {
  // http  -> ws   |   https -> wss
  const proto = API_BASE.startsWith("https") ? "wss" : "ws";
  const host = API_BASE.replace(/^https?:\/\//, "");
  return `${proto}://${host}${path}`;
}
