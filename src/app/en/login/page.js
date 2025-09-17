"use client";
import React from "react";
import { LoginScreenEng } from "@/components/ui/Login";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";

export default function Login() {
  return (
    <section className="bg-black">
      <div className="flex justify-center items-center h-screen bg-black md:bg-[#030819]">
        <LoginScreenEng></LoginScreenEng>
      </div>
    </section>
  );
}
