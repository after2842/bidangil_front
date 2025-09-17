"use client";

import { GlowingEffect } from "./glowing-effect"; // 2) We import the GlowingEffect component that handles a neon glow effect.
import { CreditCard, Truck, BellRing } from "lucide-react";
import PaymentIconsAnimation from "@/components/ui/PaymentAnimation";
import { useState, useEffect } from "react";
const icons = [
  "/images/amazon.png",
  "/images/amex.png",
  "/images/apple.png",
  "/images/btc.png",
  "/images/visa.png",
  "/images/master.png",
];
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsSmall(media.matches);
    handler(); // initialize
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return isSmall;
}
export default function GlowingEffectDemoSecond() {
  const isSmallScreen = useIsSmallScreen();
  const descriptionPayment = isSmallScreen
    ? "미국 마스터카드, 비자카드, 애플페이 전부 가능해요! 아마존에서 물건 구입하듯 이용해보세요."
    : "미국 마스터카드, 비자카드, 애플페이, 아마존페이 전부 가능해요!\n" +
      "아마존에서 물건을 구입하듯 간단한 카드 정보만으로 결제부터 배송까지 한번에 해보세요.\n";
  return (
    <div className="bg-transparent min-h-screen w-full p-4 md:p-8 mt-[-20px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-left font-myfont">
          <h1 className=" hidden md:block text-center md:text-left mt-12 md:mt-0 text-4xl md:font-bold text-white md:pb-[15px]">
            쉽고 빠른 쇼핑
          </h1>
        </div>

        <div
          className="
            grid grid-cols-1 gap-8 md:gap-12
            md:grid-cols-3 md:grid-rows-2
            md:grid-flow-row-dense
          "
        >
          <div className="md:col-span-1 md:row-span-1">
            <GridItem
              title="배송은 빠르게"
              description={"결제부터 물건을 받기까지 약 7일정도 걸려요.\n"}
            />
          </div>

          <div className="md:col-span-2 md:row-span-2">
            <GridItem
              title="달러로 결제"
              description={descriptionPayment}
              isLarge={true} // 17) We'll handle special styling if 'isLarge' is true
            />
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <GridItem
              title="실시간 알림"
              description={
                "주문을 신청하고 나면 휴대폰을 통해서 결제부터 진행상황 확인까지 전부 알려드려요."
              }
              iden={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 19) The GridItem component: each card is rendered here
const GridItem = ({ title, description, isLarge = false, iden = false }) => {
  return (
    <div
      // 20) We conditionally add more height if 'isLarge' is true, so it stands out
      className={`h-full ${isLarge ? "md:min-h-[24rem] md:min-h-[30rem] min-h-[12rem]" : "min-h-[12rem] md:min-h-[14rem]"}`}
    >
      <div
        className="
          relative       
          h-full
          rounded-xl 
          md:border md:border-gray-800
          p-1
          md:p-2
          md:rounded-3xl
        
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
          className="hidden md:block"
        />

        <div
          className="
            relative flex h-full flex-col justify-between gap-6
            overflow-hidden
            rounded-xl md:rounded-xl md:border-0.75 md:border-black md:border-gray-800
            bg-gray-900
            border-[0.5px] border-black
            md:bg-gray-900 p-6
            md:shadow-[0px_0px_27px_0px_#1a1a1a]
            md:p-6
          "
        >
          <div className="relative flex h-full flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-row">
                <h
                  className={`
                  font-semibold font-sans -tracking-4 text-balance text-white md:text-white mb-8
                  ${isLarge ? "pt-0.5 text-3xl md:text-5xl" : "pt-0.5 text-3xl md:text-3xl"}
                `}
                >
                  {title}
                </h>
                {isLarge && (
                  <div className="md:hidden absolute right-4">
                    <CreditCard className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                {!isLarge && iden && (
                  <div className="md:hidden absolute right-4">
                    <BellRing className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                {!isLarge && !iden && (
                  <div className="md:hidden absolute right-4">
                    <Truck className="w-8 h-8 text-blue-500" />
                  </div>
                )}
              </div>

              <div className="hidden md:block">
                {isLarge && <PaymentIconsAnimation icons={icons} />}
              </div>

              {/* 33) Description text in gray-400, also slightly bigger if isLarge */}

              {/* This container will grow to push title down */}
              <h2
                className={`
                absolute bottom-0
                whitespace-pre-line
                font-sans text-gray-200 md:text-gray-300
                ${isLarge ? "text-md md:text-xl" : "text-md md:text-lg"}
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
