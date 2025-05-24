"use client";
import { apiFetch } from "@/lib/api";
import { useState } from "react";

export default function useSessionPing() {
  const [loggedIn, setLoggedIn] = useState(null); // null = loading

  async function ping() {
    try {
      const res = await apiFetch("/api/session_ping/", {
        method: "GET",
        credentials: "include", // ★ send session cookie
      });
      setLoggedIn(res.ok); // 200 → true, 401 → false
    } catch {
      setLoggedIn(false);
    }
  }

  return loggedIn; // true / false / null
}
