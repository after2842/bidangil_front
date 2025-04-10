"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { GlowingEffect } from "./glowing-effect"; // Ensure correct file path
import { Sparkles } from "lucide-react";
export default function VerticalStepsWithGlow() {
  const steps = [
    {
      label: "신청서 작성",
      detail: "홈페이지의 지금 시작하기를 통해 원하시는 물건을 적어주세요.",
    },
    {
      label: "물건 구매",
      detail:
        "비단길에서 고객님의 신청서 작성 후 24시간 안에 물건 구매를 완료합니다.",
    },
    {
      label: "구매비용&배송비 결제",
      detail: "카드 혹은 간편결제로 구매 비용 및 배송비를 빠르게 결제해주세요.",
    },
    {
      label: "배송",
      detail:
        "결제 완료 후 당일 혹은 익일 출고되며, 보통 2~3일 이내에 도착합니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-myfont">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white pb-[15px]">이용 방법</h1>
        <p className="text-gray-300 text-sm">
          여기서 네 단계의 과정을 차례대로 살펴보세요.
        </p>
      </div>

      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        {" "}
        <div className="relative w-full max-w-md h-64 rounded-2xl border p-10"></div>
        <GlowingEffect
          glow={true}
          blur={0} // Larger blur for more obvious glow
          proximity={64}
          spread={80} // Increase spread to enlarge glow area
          borderWidth={3}
          inactiveZone={0.01}
          disabled={false} // Must be false to enable glow
          className="w-full h-full rounded-xl"
        />
        <div className="w-full h-full rounded-xl">
          <h1>hello</h1>
        </div>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="relative w-full rounded-xl border border-gray-800 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GlowingEffect
                glow={true}
                blur={15} // Larger blur for more obvious glow
                proximity={64}
                spread={80} // Increase spread to enlarge glow area
                borderWidth={3}
                inactiveZone={0.3}
                movementDuration={2}
                disabled={false} // Must be false to enable glow
                className="w-full h-full rounded-xl"
              />
              <div className="relative bg-gray-900 rounded-xl p-8 min-h-[16rem]">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  {step.label}
                </h2>
                <p className="text-base text-gray-300">{step.detail}</p>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function SimpleGlowingContainer() {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <div className="relative w-full max-w h-64 rounded-2xl border p-2">
        <GlowingEffect
          spread={80}
          borderWidth={3}
          blur={0}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Simple Glowing Card
              </h3>
              <p className="text-sm text-black dark:text-neutral-400">
                Move your cursor around this card to see the beautiful glowing
                effect in action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//   blur={0}
//   borderWidth={3}
//   spread={80}
//   glow={true}
//   disabled={false}
//   proximity={64}
//   inactiveZone={0.01}
