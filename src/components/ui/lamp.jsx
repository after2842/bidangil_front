"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";
import { useRouter } from "next/navigation";
export default function LampDemo() {
  const [showEvent, setShowEvent] = useState(false);
  const router = useRouter();
  return (
    <div>
      <LampContainer>
        <div className="h-full mt-[500px]">
          <div className="text-white font-myfont text-5xl md:text-6xl flex space-x-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mb-10 text-center"
              onClick={() => {
                router.push("/community/review");
              }}
            >
              리뷰
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mb-10 text-center"
              onClick={() => {
                router.push("/community");
              }}
            >
              커뮤니티
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mb-10 text-center"
              onClick={() => setShowEvent(true)}
            >
              이벤트
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {showEvent && (
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setShowEvent(false)}
              />

              {/* card */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="fixed z-50 inset-0 flex items-center justify-center"
              >
                <div className="w-[90%] max-w-md rounded-2xl bg-white from-blue-600 to-cyan-500 text-white p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold mb-4 text-center text-black">
                    한달 100명 선착순 EVENT
                  </h2>
                  <p className="text-lg leading-relaxed text-black">
                    <span className="font-semibold">
                      비단길을 이용하시는 모든 고객님께 달마다 100명
                      <br /> 대행 수수료를 면제해드립니다.
                    </span>
                  </p>

                  <button
                    onClick={() => setShowEvent(false)}
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 rounded-xl py-2 font-semibold backdrop-blur-sm text-white border "
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        ></motion.h1>
      </LampContainer>
    </div>
  );
}
const RealTimeClock = ({ leftFree }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update currentDate every second.
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup the timer when the component unmounts.
    return () => clearInterval(timer);
  }, []);

  // Format the date to "DD.MM.YYYY HH:mm"
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div>
      {formattedDate} <br />
      <div className="mt-4">
        <span className="font-myfont">
          까지
          <span className="text-blue-500 text-5xl">{" " + leftFree + " "}</span>
          명이 <span className="text-5xl">무료로</span> 서비스를 이용했어요.
        </span>
      </div>
    </div>
  );
};

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-slate-950 w-full  z-0",
        className
      )}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center scale-y-125">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-5">
        {children}
      </div>
    </div>
  );
};

export function TestglowBento() {
  return (
    <div className="bg-black min-h-screen w-full p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-myfont text-white text-4xl mb-10">기타</h1>
        <div
          className="
                grid grid-cols-1 gap-8
                md:grid-cols-4 md:grid-rows-2
                md:grid-flow-row-dense
            "
        >
          <div className="md:col-span-3 md:row-span-1">
            <SimpleGlowingContainer
              title={"대행 수수료"}
              content={
                "대행수수료는 대행수수료 그리고 명이는 지금 내 옆에 핸드폰 하고 있는 중 하하 공부 좋아 대박인걸" +
                "대행수수료 그리고 명이는 지금 내 옆에 핸드폰 하고 있는 중 하하 공부 좋아 대박인걸" +
                "대행수수료 그리고 명이는 지금 내 옆에 핸드폰 하고 있는 중 하하 공부 좋아 대박인걸" +
                "대행수수료 그리고 명이는 지금 내 옆에 핸드폰 하고 있는 중 하하 공부 좋아 대박인걸"
              }
            ></SimpleGlowingContainer>
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <SimpleGlowingContainer
              title={"환율"}
              content={
                "환율은 환율입니당 그리고 나는 " +
                "환율 찰지를 신청서 보낸 시점으로 생각합니담"
              }
            ></SimpleGlowingContainer>
          </div>

          <div className="md:col-span-2 md:row-span-1">
            <SimpleGlowingContainer
              title={"배송비"}
              content={
                "배송비는 무게랑 부피에 따라 다릅니다. " +
                "무게가 부피무게보다 무거우면 무게 기준으로 되고," +
                "부피무게는 몰라욤. 더공부필요"
              }
            ></SimpleGlowingContainer>
          </div>

          <div className="md:col-span-2 md:row-span-1">
            <SimpleGlowingContainer
              title={"리뷰"}
              content={
                "저희 리뷰 짱 좋아욤" +
                "리뷰볼라믄 여기 클릭해주세욤" +
                "부피무게는 몰라욤. 더공부필요"
              }
            ></SimpleGlowingContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const SimpleGlowingContainer = ({ title, content }) => {
  return (
    <div className="relative h-full w-full rounded-2xl border border-gray-800 p-1 bg-blue-900">
      <GlowingEffect
        spread={80}
        borderWidth={3}
        blur={0}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-[#e6eefa]">
        <div className="relative flex flex-1 flex-col justify-between gap-">
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold text-black dark:text-white">
              {title}
            </h3>
            <p className="text-md text-black dark:text-neutral-400 pt-[100px]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
