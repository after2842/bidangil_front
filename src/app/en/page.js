"use client";

import React from "react";
import FloatingNavbar from "@/components/ui/NavBarEng";
import GlowingEffectDemoSecond from "@/components/ui/GlowingEffectEng";
import Footer from "@/components/ui/FooterEng";
import Restrictions from "@/components/ui/RestrictionsEng";
import ConfirmRequest from "@/assets/icons/confirmRequest.svg";
import PayPhone from "@/assets/icons/payPhone.svg";
import FormSubmit from "@/assets/icons/formSubmit.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Pricing from "@/components/ui/PricingsEng";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LandingHero from "@/components/ui/LandingHeroEn";
const ContainerTextFlip = dynamic(
  () =>
    import("@/components/ui/container-text-flip").then((mod) => mod.default),
  {
    ssr: false, // Disable SSR to avoid hydration error
    loading: () => <p className="text-4xl font-myfont text-white"></p>,
  }
);

const StickyScroll = dynamic(
  () => import("@/components/ui/StickyRevealEng").then((mod) => mod.default),
  {
    ssr: false, // Disable SSR to avoid hydration error
  }
);
export default function Home() {
  const router = useRouter();
  const content = [
    {
      title: "Submit Request",
      description:
        "Tell us what you want from Korea.\nJust share the product link and your preferences — that’s it!",
      content: (
        <div className="h-screen flex items-center justify-center">
          <FormSubmit style={{ width: "100%" }} />
        </div>
      ),
    },
    {
      title: "Confirm Order",
      description:
        "We'll review your request and confirm the item.\nYou'll receive a final quote including import details. Once you pay, we place the order for you.",
      content: (
        <div className="h-screen flex items-center justify-center">
          <ConfirmRequest style={{ width: "100%" }} />
        </div>
      ),
    },
    {
      title: "Make Payment",
      description:
        "When your package is ready to ship, we’ll send you the final bill for the delivery.\nYou can pay via the website (Profile) or using the link sent to your email.",
      content: (
        <div className="h-screen flex items-center justify-center">
          <PayPhone style={{ width: "100%" }} />
        </div>
      ),
    },
    {
      title: "Start Delivery",
      description:
        "We start shipping within 2 business days after your payment. You’ll receive your tracking number and can follow your package’s journey.",
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
