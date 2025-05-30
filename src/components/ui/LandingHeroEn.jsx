"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ContainerTextFlip from "./ContextFlipEn";

export default function LandingHero() {
  const router = useRouter();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 1️⃣ True background image – preloaded & optimized */}
      <Image
        src="/images/main_image.jpg" // ⬅ in /public/images
        alt="ackground"
        fill /* position: absolute; inset: 0 */
        priority /* <link rel="preload"> for LCP */
        sizes="100vw" /* avoid CLS warnings */
        className="object-cover object-center brightness-150"
      />

      {/* 2️⃣ Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 3️⃣ Foreground content */}
      <div className="relative z-10 flex h-full flex-col items-center pt-[200px] space-y-10">
        <p className="text-white text-4xl md:text-7xl font-arimo font-bold">
          Your Gateway to Korean Shopping
        </p>
        <p className="text-white text-4xl md:text-4xl font-arimo font-bold">
          We buy it and ship it
        </p>

        <p className="hidden md:block text-white text-[20px] md:text-6xl font-arimo font-bold"></p>

        <div className="text-blue-500 text-xl md:text-4xl font-myfont pb-20">
          <span className="text-white">K- </span>
          <ContainerTextFlip className="text-blue-500" />
          <span className="text-white">?</span>
        </div>

        <button
          className="bg-white border border-blue-500 rounded-full px-4 py-2 text-xl md:px-24 md:py-4 md:text-2xl hover:bg-gray-100 font-arimo font-bold"
          onClick={() => router.push("/en/form")}
        >
          order now
        </button>
      </div>
    </section>
  );
}
