"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  contentTitle,
  contentDescription,
  contentContent,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const descriptionbyline = contentDescription.map((lines) => {
    return lines.split("\n");
  });
  // 1) Create a ref:
  const ref = useRef(null);

  // Track entire page scroll with offset from "start start" to "end start"
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = contentTitle.length;

  // Update activeCard whenever scrollYProgress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll progress (0 to 1):", latest);
    // Create breakpoints for each card: 0, 1/cardLength, 2/cardLength, ...
    const cardsBreakpoints = [0, 0.204, 0.376, 0.644];
    // Find the breakpoint closest to the current scroll progress
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );

    setActiveCard(closestBreakpointIndex);
  });

  // Background colors and gradients for each card
  const backgroundColors = [
    "#030819", // slate-900
    "#000000", // black
    "#030819", // neutral-900
  ];
  const linearGradients = [
    "linear-gradient(to bottom right,rgb(255, 255, 255),rgb(255, 255, 255))", // cyan-500 to emerald-500
    "linear-gradient(to bottom right,rgb(255, 255, 255),rgb(255, 255, 255))", // pink-500 to indigo-500
    "linear-gradient(to bottom right,rgb(255, 255, 255),rgb(255, 255, 255))", // orange-500 to yellow-500
  ];

  // Track which gradient to display on the right sticky card
  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      as="section"
      /**
       * initial="hidden" => starts hidden
       * whileInView="visible" => triggers once in viewport
       * viewport={{ once: false, amount: 0.2 }} => triggers at ~20% visibility
       */
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      /**
       * Animate the backgroundColor based on activeCard
       */
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex justify-center space-x-20  p-10"
    >
      <div className="relative flex items-start px-16">
        <div className="max-w-2xl">
          {contentTitle.map((item, index) => (
            <div key={item + index} className="my-[150px]">
              <motion.h2
                // If you want the first card to fade in from 0, add initial={{ opacity: 0 }} back
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-4xl font-bold text-slate-100 whitespace-pre-line"
              >
                {item}
              </motion.h2>
              <motion.p
                // same logic for paragraph
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-10 max-w-sm text-slate-300 text-lg "
              >
                <div className="space-y-1">
                  {descriptionbyline[index].map((line, i) => (
                    <RenderLine
                      key={i}
                      line={line}
                      highlight={[
                        "URL과 옵션만 적어주면 끝",
                        "통관안내와 가격을 최종적으로 안내드려요.",
                        "휴대폰으로 받은 링크로 결제해주세요",
                        "배송이 시작돼요",
                      ]}
                    ></RenderLine>
                  ))}
                </div>
              </motion.p>
            </div>
          ))}

          {/* Extra spacing at the bottom if needed */}
          <div className="h-40" />
        </div>
      </div>

      {/* Right-side sticky content box (only shows on large screens) */}
      <div
        className={cn(
          " sticky top-20 hidden h-[100vh] w-[40vw] overflow-hidden rounded-md bg-white lg:block rounded-2xl bg-transparent",
          contentClassName
        )}
      >
        {contentContent[activeCard] ?? null}
      </div>
    </motion.div>
  );
};

const escapeRegExp = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

const RenderLine = ({ line, highlight, highlightClass = "text-blue-500" }) => {
  // Ensure `highlights` is an array.
  const highlights = Array.isArray(highlight) ? highlight : [highlight];

  // Build the regex pattern from the array.
  const pattern = highlights.map(escapeRegExp).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  // Split the line by the regex. This will preserve the highlight words in the resulting array.
  const parts = line.split(regex);

  return (
    <p className="whitespace-pre-line">
      {parts.map((part, index) =>
        // If the part matches any of the highlights (case-insensitive)
        highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
          <span key={index} className={highlightClass}>
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </p>
  );
};
