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
        credentials: "include", // ★ send session cookie
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
              router.push("/");
            }}
            className="text-white text-4xl font-bold font-myfont pt-[10px]"
          >
            비단길
          </button>
        </div>

        {/* Right: Menu Options */}
        <nav className="flex items-center space-x-8 text-white">
          <button>
            <a href="/community" className=" font-semibold hover:underline">
              커뮤니티
            </a>
          </button>

          {user ? (
            <div className="flex items-center space-x-8 text-white">
              <button onClick={logout}>로그아웃</button>
              <a href="/profile" className="font-semibold hover:underline">
                내 정보
              </a>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="font-semibold hover:underline"
            >
              로그인
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
