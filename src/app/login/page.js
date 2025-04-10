"use client";
import React from "react";
import { LoginScreen } from "@/components/ui/Login";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
export default function Login() {
  return (
    <section className="bg-black">
      <div className="flex justify-center items-center h-screen bg-[#030819]">
        <LoginScreen></LoginScreen>
      </div>
    </section>
  );
}
