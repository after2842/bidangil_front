"use client";
import DeliveryFeeCalculator from "./CalculatorEng";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import BannedItemsNotice from "./BannedItemsEng";
import { PartiallyBannedItemsNotice } from "./BannedItemsEng";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
      <div className="w-full max-w-7xl">
        <h1 className="text-5xl text-white mb-12 font-myfont text-left mt-24">
          Others
        </h1>
      </div>

      <div className="w-full max-w-7xl mb-12">
        <div className="w-full h-full p-12 border rounded-xl bg-white">
          <div className="w-full text-center">
            <h2 className="font-bold text-4xl">
              Restricted or Prohibited Items
            </h2>
          </div>

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
                  Prohibited
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
                  Restricted
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
            <h2 className="text-4xl font-bold">
              How is shipping cost calculated?
            </h2>
          </div>

          <div className="relative mb-12 text-lg">
            <p>
              Shipping fees are calculated
              <span className="text-blue-500">
                {" "}
                based on the volume and weight of your items.
              </span>
            </p>
            <p>
              We compare the price based on volume and the price based on
              weight. Whichever is higher will be your final shipping cost.
            </p>

            <div className="text-center pt-12">
              <button
                className="border rounded-full px-3 py-1 text-md text-white bg-gray-900 hover:shadow"
                onClick={() => setToggleCalc(!toggleCalc)}
              >
                Try Calculator
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
          <h2 className="text-4xl font-bold">Reviews</h2>

          <div className="mt-8">
            <h3 className="text-lg">
              Check out what our customers are saying about{" "}
              <span className="text-blue-500">BDG</span>
            </h3>
            <div className="h-4" />
          </div>
          <div className="text-center pt-12  text-lg">
            <button
              className="border rounded-full px-3 py-1 text-md text-white bg-gray-900 hover:shadow"
              onClick={() => router.push("/community/review")}
            >
              Reviews
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
                    <div className="text-2xl font-bold">Total Reviews: </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      {totalReviews}
                    </div>
                  </div>

                  <div className="flex mb-8">
                    <div className="text-2xl font-bold">Ratings: </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      4.8/5
                    </div>
                  </div>
                  <div className="flex mb-8">
                    <div className="text-2xl font-bold">
                      Monthly Active Users:{" "}
                    </div>
                    <div className="absolute right-16 text-2xl font-bold">
                      {totalUsers}
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
        <div className="w-full h-full border rounded-xl bg-white mt-12">
          <div className="w-full text-center text-4xl font-bold pt-12">
            Customer Support
          </div>

          <div className="w-full px-12 pt-12">
            <div className="text-center">
              <span className="text-xl">
                Add us on KakaoTalk and send us a message. We’ll get back to you
                within 24 hours.
              </span>

              <div className="mb-10">
                <button
                  className="cursor-pointer text-white text-xl mt-12 border bg-black rounded-full px-4 py-2 hover:bg-gray-900"
                  onClick={() =>
                    window.open("https://pf.kakao.com/_SvRHG", "_blank")
                  }
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
