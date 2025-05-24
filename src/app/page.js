"use client";

import React from "react";
import FloatingNavbar from "@/components/ui/NavigationMenu";
import GlowingEffectDemoSecond from "@/components/ui/GlowingEffectDemo";
import Footer from "@/components/ui/Footer";
import Restrictions from "@/components/ui/Restrictions";
import ConfirmRequest from "@/assets/icons/confirmRequest.svg";
import PayPhone from "@/assets/icons/payPhone.svg";
import FormSubmit from "@/assets/icons/formSubmit.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Pricing from "@/components/ui/Pricinig";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LandingHero from "@/components/ui/LandingHero";
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
  const router = useRouter();
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
        "비단길에서 직접 신청한 물건을 확인해요.\n 상품의 통관안내와 가격을 최종적으로 안내드려요.\n 상품을 결제하시면, 비단길에서 주문을 진행합니다.",
      content: (
        <div className="h-screen flex items-center justify-center">
          <ConfirmRequest style={{ width: "100%" }}></ConfirmRequest>
        </div>
      ),
    },
    {
      title: "결제",
      description:
        "상품의 배송이 준비되면 고객님께 배송비와 수수료를 총합해서 안내드려요.\n 홈페이지->내 정보. 혹은 휴대폰으로 받은 링크로 결제해주세요.",
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
    <div className="w-full relative">
      {/* Section 1 with top background image */}
      <FloatingNavbar></FloatingNavbar>
      <LandingHero />
      <section
        className="
            h-screen
            bg-black            
            md:bg-[url('/images/main_image_2.jpg')]  /* Background starts at md */
            md:bg-cover
            md:bg-center
            filter brightness-100
          "
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
      <section className="h-screen bg-white">
        <Pricing></Pricing>
      </section>
      <section className="bg-gray-200">
        <Restrictions />
      </section>

      {/* <section className=" h-screen ">
        <LampDemo></LampDemo>
      </section> */}
      <Footer className="absolute bottom-0" />
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
