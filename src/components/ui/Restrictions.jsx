"use client";
import DeliveryFeeCalculator from "./Calculator";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import BannedItemsNotice from "./BannedItems";
import { PartiallyBannedItemsNotice } from "./BannedItems";
import { useRouter } from "next/navigation";
import { Plus, Info } from "lucide-react";
import { apiFetch } from "@/lib/api";
export default function Restrictions() {
  const [toggleCalc, setToggleCalc] = useState(false);
  const [toggleRestriction, setToggleRestriction] = useState(false);
  const [togglePartialRest, setTogglePartialRest] = useState(false);
  const router = useRouter();
  const [totalReviews, setTotalReviews] = useState(177);
  const [totalUsers, setTotalUsers] = useState(316);
  const sentinelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sentinelRef, // what we’re watching
    offset: ["start end", "end start"],
    // when sentinel top hits viewport bottom  … sentinel bottom hits viewport top
  });

  // Convert the motion value into a boolean flag */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // v goes 0 → 1 as the sentinel scrolls through the viewport
    if (v > 0.5 && !toggleRestriction) setToggleRestriction(true); // show

    if (v <= 0.25 && toggleRestriction) setToggleRestriction(false); // hide (optional)

    if (v >= 1 && !togglePartialRest) setTogglePartialRest(true);
    if (v <= 0.9 && togglePartialRest) setTogglePartialRest(false);
  });
  const fetchSummary = async () => {
    try {
      const res = await apiFetch(`/api/summarize_reliable/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert("서버오류");
        return;
      }
      setTotalReviews(data?.results?.reviews);
      setTotalUsers(data?.results?.usrs);
    } catch (_) {}
  };
  useEffect(() => {
    fetchSummary();
  }, [totalReviews]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 ">
      <div className="w-full max-w-7xl  ">
        <h1 className="text-5xl text-black mb-12 font-myfont text-left mt-24 text-white ">
          기타
        </h1>
      </div>
      <div className=" w-full max-w-7xl mb-12 ">
        <div className="w-full h-full p-12 border rounded-xl bg-white">
          <div className="w-full text-center">
            <h className="font-bold text-4xl">배송 불가/제약 물품</h>
          </div>
          <div></div>

          <div ref={sentinelRef} style={{ height: 1 }} />
          <AnimatePresence>
            {toggleRestriction && (
              <motion.div
                key="restrictions"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mt-8"
              >
                {" "}
                <div className="w-full text-xl mt-12 mb-4 ml-24">
                  배송 불가한 품목
                </div>
                <BannedItemsNotice />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {togglePartialRest && (
              <motion.div
                key="Partrestrictions"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mt-8"
              >
                <div className="w-full text-xl mt-24 mb-4 ml-24">
                  배송 제약 품목
                </div>
                <PartiallyBannedItemsNotice />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full max-w-7xl gap-4">
        <div className="md:col-span-3 bg-white border rounded-xl pt-12 px-12">
          <div className="text-center mb-8">
            <h className="text-4xl font-bold">배송비는 어떻게 책정되나요?</h>
          </div>

          <div className="relative mb-12 text-lg">
            {" "}
            <p>
              배송비는 물품의{" "}
              <span className="text-blue-500">부피와 무게에 따라서</span> 가격이
              측정돼요.
            </p>
            <p>
              부피로 계산한 가격과 무게로 계산한 가격 중 더 비싼 가격이 고객님의
              배송비가 돼요.
            </p>{" "}
            <Info
              size={15}
              strokeWidth={1.5}
              className="cursor-pointer absolute right-12 top-8 hover:text-blue-500"
            />
            <div className="text-center pt-12  ">
              <button
                className="border rounded-full px-3 py-1 text-md text-white bg-gray-900 hover:shadow"
                onClick={() => setToggleCalc(!toggleCalc)}
              >
                계산해보기
              </button>
            </div>
          </div>

          <AnimatePresence>
            {toggleCalc && (
              <motion.div
                key="calc"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-8"
              >
                <DeliveryFeeCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative md:col-span-2 bg-white border rounded-xl p-12 text-center">
          <h className="text-4xl font-bold ">리뷰</h>
          <div className="mt-8">
            <h className="text-lg">
              비단길을 이용하신 고객님들의{" "}
              <span className="text-blue-500">리뷰</span>를 만나보세요!
            </h>
            <div className="h-4" />
          </div>
          <div className="text-center pt-12  text-lg">
            <button
              className="border rounded-full px-3 py-1 text-md text-white bg-gray-900 hover:shadow"
              onClick={() => router.push("/community/review")}
            >
              리뷰 보기
            </button>
            <div>
              <Plus
                size={20}
                strokeWidth={1.5}
                className="absolute top-1 right-1 cursor-pointer hover:text-blue-500"
                onClick={() => setToggleCalc(!toggleCalc)}
              />
            </div>

            {toggleCalc && (
              <motion.div
                key="calc"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-8"
              >
                <div className="text-left pt-4">
                  <div className="flex mb-8">
                    <div className="text-2xl font-bold">총 리뷰: </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      {totalReviews}
                      <span className="text-lg">개</span>
                    </div>
                  </div>

                  <div className="flex mb-8">
                    <div className="text-2xl font-bold">평균 별점: </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      4.8/5<span className="text-lg">점</span>
                    </div>
                  </div>
                  <div className="flex mb-8">
                    <div className="text-2xl font-bold">월 이용자수: </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      {totalUsers}
                      <span className="text-lg">명</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full max-w-7xl mb-12">
        {" "}
        <div className="  w-full h-full  border rounded-xl bg-white mt-12">
          <div className="w-full text-center text-4xl font-bold pt-12">
            상담 및 고객센터
          </div>

          <div className="w-full px-12 pt-12">
            <div className="text-center">
              {/* &nbsp; */}
              <span className="text-xl">
                카카오톡 플러스친구 추가 후, 문의를 주시면 24시간 이내에 답변을
                드립니다.
              </span>{" "}
              <div className="mt-12 mb-10">
                {" "}
                <h
                  className="cursor-pointer text-white text-2xl mt-24 border bg-black rounded-full px-4 py-2 hover:bg-gray-900 "
                  onClick={() =>
                    window.open("https://pf.kakao.com/_SvRHG", "_blank")
                  }
                >
                  문의하기
                </h>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
