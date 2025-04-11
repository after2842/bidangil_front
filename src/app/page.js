"use client";
import Image from "next/image";
import React from "react";
import FloatingNavbar from "@/components/ui/NavigationMenu";
import BentoGridDemo from "@/components/ui/BentoGrid";
import GlowingEffectDemoSecond from "@/components/ui/GlowingEffectDemo";
import SubmitGPTform from "@/components/ui/GptForm";
import { Button } from "@/components/ui/moving-border";

import Footer from "@/components/ui/Footer";
import LampDemo from "@/components/ui/lamp";
import { TestglowBento } from "@/components/ui/GlowingEffectDemo";
import { GlowingButton } from "@/components/ui/GlowingEffectDemo";

import ConfirmRequest from "@/assets/icons/confirmRequest.svg";
import PayPhone from "@/assets/icons/payPhone.svg";
import FormSubmit from "@/assets/icons/formSubmit.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Pricing from "@/components/ui/Pricinig";
import dynamic from "next/dynamic";

const ContainerTextFlip = dynamic(
  () =>
    import("@/components/ui/container-text-flip").then((mod) => mod.default),
  {
    ssr: false, // Disable SSR to avoid hydration error
    loading: () => <p className="text-4xl font-myfont text-white"></p>,
  }
);

const StickyScroll = dynamic(
  () => import("@/components/ui/StickyReveal").then((mod) => mod.default),
  {
    ssr: false, // Disable SSR to avoid hydration error
  }
);
export default function Home() {
  const content = [
    {
      title: "신청서 작성",
      description:
        "한국에서 사고싶은 물건, 신청서를 작성해 주세요.\n 물건의 URL과 옵션만 적어주면 끝! ",
      content: (
        <div className="h-screen flex items-center justify-center">
          <FormSubmit style={{ width: "100%" }}></FormSubmit>
        </div>
      ),
    },
    {
      title: "신청서 확인",
      description:
        "비단길에서 직접 신청한 물건을 확인해요.\n 상품의 통관안내와 가격을 최종적으로 안내드려요.\n 잠깐! 아직 결제하실 필요 없어요. \n결제는 배송비랑 한번에 결제해요.",
      content: (
        <div className="h-screen flex items-center justify-center">
          <ConfirmRequest style={{ width: "100%" }}></ConfirmRequest>
        </div>
      ),
    },
    {
      title: "결제",
      description:
        "상품이 준비되면 고객님께 배송비, 물건의 가격, 그리고 수수료를 총합해서 안내드려요.\n 홈페이지->내 정보. 혹은 휴대폰으로 받은 링크로 결제해주세요.",
      content: (
        <div className="h-screen flex items-center justify-center">
          <PayPhone style={{ width: "100%" }}></PayPhone>
        </div>
      ),
    },
    {
      title: "배송",
      description:
        "결제 시점 2영업일 내에 배송이 시작돼요.\n 배송이 시작되면 배송 상태와 함께 배송 조회 번호를 알려드려요.",
      content: <DotLottieReact src="lotties/delivery.lottie" loop autoplay />,
    },
  ];
  const contentTitle = content.map((item) => {
    return item.title;
  });
  const contentDescription = content.map((item) => {
    return item.description;
  });
  const contentContent = content.map((item) => {
    return item.content;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger children if needed
        staggerChildren: 0.1,
        // or set a duration
        duration: 0.5,
      },
    },
  };

  // For child items
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="w-full">
      {/* Section 1 with top background image */}
      <FloatingNavbar></FloatingNavbar>
      <section
        className="h-screen bg-cover bg-center filter brightness-150"
        style={{ backgroundImage: "url('/images/main_image.jpg')" }}
      >
        <div className="h-full bg-black/30 flex items-center items-center flex flex-col space-y-10 pt-[200px]">
          {/* <h1 className="text-white text-9xl font-bold font-myfont">비단길</h1> */}

          <p className="text-white text-[20px] md:text-5xl pt-[10px] font-myfont">
            한국에 있는 것처럼, 모든 쇼핑몰 이용해요
          </p>
          <p className="text-white text-[20px] md:text-5xl pt-[10px] font-myfont">
            인증 없이 절차 없이 빠르게
          </p>
          <div className="text-blue-500 text-[30px] font-myfont pt-[50px]">
            <span className=" text-white">한국에서 </span>{" "}
            <ContainerTextFlip className="text-blue-500" />{" "}
            <span className="text-white">찾고 계신가요?</span>
          </div>

          <div className="pt-[60px]">
            <div>
              <GlowingButton></GlowingButton>
            </div>
          </div>
        </div>
      </section>
      <section
        className="h-screen bg-cover bg-center filter brightness-100"
        style={{ backgroundImage: "url('/images/main_image_2.jpg')" }}
      >
        <div className="pt-[120px]">
          <GlowingEffectDemoSecond></GlowingEffectDemoSecond>
        </div>
      </section>
      <section>
        {/* <TestglowBento></TestglowBento> */}
        <StickyScroll
          contentTitle={contentTitle}
          contentDescription={contentDescription}
          contentContent={contentContent}
        />
      </section>
      <section className="h-screen bg-gray-200">
        <Pricing></Pricing>
      </section>

      <section className=" h-screen ">
        <LampDemo></LampDemo>
      </section>
      <Footer />
    </div>
  );
}

export function FullScreenBackground({ children }) {
  return (
    <div
      className="
        h-[100vh]
        w-full
        overflow-y-auto      // allow vertical scrolling
        bg-gradient-to-b
        from-[#0a0e12]
        to-[#030819]
        transition-colors
        duration-1000
      "
    >
      {children}
    </div>
  );
}

export function FullScreenBackgroundLamp({ children }) {
  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-y-auto      // allow vertical scrolling
        bg-gradient-to-b
        from-[#0a0e12]
        to-[#030819]
        transition-colors
        duration-1000
      "
    >
      {children}
    </div>
  );
}
