"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
export default function FloatingNavbar() {
  const router = useRouter();
  const { user, setUser, csrfToken } = useUser();
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const logout = () => {
    fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    logoutUser();
  };

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
