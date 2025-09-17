"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { apiFetch } from "@/lib/api";
import useSessionPing from "./SessionPing";

export default function FloatingNavbar() {
  const router = useRouter();
  const { user, setUser, csrfToken } = useUser();
  const logoutUser = () => {
    setUser(null);
  };
  const logout = async () => {
    await apiFetch("/api/logout/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    });
    logoutUser();
  };
  async function ping() {
    try {
      const res = await apiFetch("/api/session_ping/", {
        method: "GET",
      });
      setUser(res.ok); // 200 → true, 401 → false
    } catch {
      setUser(false);
    }
  }
  useEffect(() => {
    ping();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Navbar Wrapper */}
      <div className="flex items-center justify-between px-5 py-1 bg-black shadow-lg backdrop-blur-sm ">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              router.push("/en");
            }}
            className="text-white text-4xl font-bold font-myfont pt-[10px]"
          >
            BDG
          </button>
        </div>

        {/* Right: Menu Options */}
        <nav className="flex items-center space-x-8 text-white">
          <button onClick={() => router.push("/en/community")}>
            <span className="font-semibold hover:underline">Community</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-8 text-white">
              <button onClick={logout}>Logout</button>
              <button onClick={() => router.push("/en/profile")}>
                <span className="font-semibold hover:underline">Profile</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/en/login")}
              className="font-semibold hover:underline"
            >
              Log in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
