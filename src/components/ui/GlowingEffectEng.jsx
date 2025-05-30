"use client";

import { GlowingEffect } from "./glowing-effect"; // 2) We import the GlowingEffect component that handles a neon glow effect.

import { useRouter } from "next/navigation";

import PaymentIconsAnimation from "@/components/ui/PaymentAnimation";
const icons = [
  "/images/amazon.png",
  "/images/amex.png",
  "/images/apple.png",
  "/images/btc.png",
  "/images/visa.png",
  "/images/master.png",
];

export default function GlowingEffectDemoSecond() {
  return (
    <div className="bg-transparent min-h-screen w-full p-4 md:p-8 mt-[-20px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-left font-myfont">
          <h1 className="text-4xl font-bold text-white pb-[15px]">
            Delivery & Payment
          </h1>
        </div>

        <div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-3 md:grid-rows-2
            md:grid-flow-row-dense
          "
        >
          <div className="md:col-span-1 md:row-span-1">
            <GridItem
              title="Fast Delivery"
              description={
                "From checkout to your front door\nDelivery takes about 7 days!"
              }
            />
          </div>

          <div className="md:col-span-2 md:row-span-2">
            <GridItem
              title="Pay in USD"
              description={
                "We accept U.S. cards — Mastercard, Visa, Apple Pay, Amazon Pay.\n" +
                "Just like shopping on Amazon, a few clicks and your order is on its way to your doorstep."
              }
              isLarge={true}
            />
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <GridItem
              title="Simple Checkout"
              description={
                "Once you place an order, we update on everything. It's all on your phone."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 19) The GridItem component: each card is rendered here
const GridItem = ({ title, description, isLarge = false }) => {
  return (
    <div
      // 20) We conditionally add more height if 'isLarge' is true, so it stands out
      className={`h-full ${isLarge ? "min-h-[24rem] md:min-h-[30rem]" : "min-h-[14rem]"}`}
    >
      <div
        className="
          relative       // 21) Because we'll place GlowingEffect absolutely inside
          h-full
          rounded-3xl  // 22) Larger corners => a stylized container
          border border-gray-800
          p-2
          md:rounded-3xl
          md:p-3
        "
      >
        <GlowingEffect
          blur={0} // 23) Currently blur=0 => no blur. You can increase for bigger glow
          borderWidth={3} // 24) The border around which the glow will appear
          spread={80} // 25) The radius or spread of the glowing area
          glow={true} // 26) must be true to show the glow
          disabled={false} // 27) must be false to register pointer/mouse movement
          proximity={64} // 28) how close the pointer must be to the container
          inactiveZone={0.01} // 29) a small radius around the center to disable the glow
        />

        <div
          className="
            relative flex h-full flex-col justify-between gap-6
            overflow-hidden
            rounded-xl border-0.75 border-gray-800
            bg-gray-900 p-6
            shadow-[0px_0px_27px_0px_#1a1a1a]
            md:p-6
          "
        >
          <div className="relative flex h-full flex-col justify-between">
            <div className="space-y-3">
              <h
                className={`
                  font-semibold font-sans -tracking-4 text-balance text-white mb-8
                  ${isLarge ? "pt-0.5 text-4xl md:text-5xl" : "pt-0.5 text-3xl md:text-3xl"}
                `}
              >
                {title}
              </h>
              <div className="hidden md:block">
                {isLarge && <PaymentIconsAnimation icons={icons} />}
              </div>

              {/* 33) Description text in gray-400, also slightly bigger if isLarge */}

              {/* This container will grow to push title down */}
              <h2
                className={`
                absolute bottom-0
                whitespace-pre-line
                font-sans text-gray-300
                ${isLarge ? "text-lg md:text-xl" : "text-md md:text-lg"}
              `}
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
