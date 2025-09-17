"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ContainerTextFlip from "./container-text-flip";

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
        <div className="md:flex md:flex-row flex-col">
          <p className="text-white text-4xl text-center md:text-left md:text-5xl font-myfont">
            한국에 있는 것처럼,
          </p>
          <p className="text-white text-4xl mt-4 md:mt-0 md:text-5xl md:ml-2 font-myfont">
            모든 쇼핑몰 이용해요
          </p>
        </div>

        <p className="hidden md:block text-white text-[20px] md:text-5xl font-myfont">
          인증 없이 절차 없이 빠르게
        </p>

        <div className="text-blue-500 text-xl md:text-5xl font-myfont pt-14">
          <p className="text-white text-center md:hidden">한국에서</p>
          <span className="text-white md:inline hidden">한국에서 </span>
          <ContainerTextFlip className="text-blue-500 text-5xl" />
          <span className="text-white">찾고 계신가요?</span>
        </div>
        <div>
          <button
            className="bg-white border border-blue-500 rounded-full px-6 py-4 text-xl md:px-6 md:py-4 md:text-2xl hover:bg-blue-500 font-myfont mt-14"
            onClick={() => router.push("/form")}
          >
            지금 주문하기
          </button>
        </div>
      </div>
    </section>
  );
}
