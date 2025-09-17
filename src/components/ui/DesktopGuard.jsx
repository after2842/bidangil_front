"use client";

import { useEffect, useState } from "react";
import { Laptop } from "lucide-react";
import Image from "next/image";
export default function DesktopGuard({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setChecked(true);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!checked) return null; // avoid initial flash

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-neutral-50 p-6">
        <div className="flex flex-col">
          <div className="flex max-w-md flex-col items-center space-y-4 rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
            <Image
              src="/Logo.png"
              alt="logo"
              width={10}
              height={10}
              className="h-10 w-10"
            />
            <h1 className="text-[18px] font-bold tracking-tight text-center">
              데스크탑 환경에서 이용해주세요.
            </h1>
            <p className="text-center text-[13px] text-neutral-600">
              비단길은 한국 온라인 쇼핑몰 구매대행을 위한 서비스를 제공합니다.
              데스크탑 환경 혹은 테블렛에서 비단길을 이용하시면 쾌적한 환경을
              제공해드립니다.
            </p>
          </div>
          <div className="mt-8 flex max-w-md flex-col items-center space-y-4 rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
            <Image
              src="/Logo.png"
              width={10}
              height={10}
              alt="logo"
              className="h-10 w-10"
            />
            <h1 className="text-xl font-semibold tracking-tight">
              Desktop Experience Required
            </h1>
            <p className="text-center text-sm text-neutral-600">
              Our site shines brightest on larger screens.
              <br />
              Please come back on a laptop or desktop for the full experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

