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
            쉽고 빠른 쇼핑
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
              title="배송은 빠르게"
              description={"결제부터 물건을 받기까지 약 7일정도 걸려요.\n"}
            />
          </div>

          <div className="md:col-span-2 md:row-span-2">
            <GridItem
              title="달러로 결제"
              description={
                "미국 마스터카드, 비자카드, 애플페이, 아마존페이 전부 가능해요!\n" +
                "아마존에서 물건을 구입하듯 간단한 카드 정보만으로 결제부터 배송까지 한번에 해보세요.\n"
              }
              isLarge={true} // 17) We'll handle special styling if 'isLarge' is true
            />
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <GridItem
              title="간편한 결제"
              description={
                "주문을 신청하고 나면 휴대폰을 통해서 결제부터 진행상황 확인까지 전부 알려드려요."
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

export function TestglowBento() {
  return (
    <div className="bg-transparent min-h-screen w-full p-4 md:p-8">
      <div className="mx-auto max-w-7xl pt-[50px]">
        <h1 className="font-myfont text-white text-4xl mb-10">기타</h1>
        <div
          className="
                grid grid-cols-1 gap-4
                md:grid-cols-4 md:grid-rows-2
                md:grid-flow-row-dense
            "
        >
          <div className="md:col-span-3 md:row-span-1 bg-black rounded-2xl">
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
    <div className="relative h-full w-full rounded-2xl border border-black p-2 bg-transparent">
      <GlowingEffect
        spread={80}
        borderWidth={3}
        blur={0}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-white p-2  bg-white">
        <div className="relative flex flex-1 flex-col justify-between border border-black rounded-2xl p-6 ">
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

export const GlowingButton = () => {
  const router = useRouter();
  return (
    <button
      className="relative h-full w-full rounded-[2rem] border border-black p-0.5 bg-blue-800"
      onClick={() => {
        router.push("/form");
      }}
    >
      <GlowingEffect
        spread={80}
        borderWidth={1.5}
        blur={0}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex h-full flex-col justify-between gap-1 overflow-hidden rounded-[2rem] p-5 dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-[#d7deea]">
        <h3 className="text-sm font-myfont text-xl text-black">
          지금 주문하기
        </h3>
      </div>
    </button>
  );
};

{
  /* <div
className="
  relative flex h-full flex-col justify-between gap-6
  overflow-hidden
  rounded-xl border-0.75 border-gray-800
  bg-gray-900 p-6
  shadow-[0px_0px_27px_0px_#1a1a1a]
  md:p-6
"
> */
}
