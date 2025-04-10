"use client";
import { useEffect } from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component

const icons = [
  "/images/amazon.png",
  "/images/amazon.png",
  "/images/amazon.png",
  "/images/amazon.png",
  "/images/amazon.png",
  "/images/amazon.png",
];
const PaymentIconsAnimation = ({ icons }) => {
  return (
    <div className="icons-container relative h-64 w-64 mx-auto">
      {icons.map((iconSrc, index) => {
        const angle = (index * 60 * Math.PI) / 180; // 6 items = 60° each
        const radius = 85; // Distance from center

        return (
          <div
            key={index}
            className="icon-wrapper absolute left-1/2 top-1/2 origin-center"
            style={{
              transform: `translate(-50%, -50%) 
                translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
            }}
          >
            <Image
              src={iconSrc}
              alt="Payment method"
              width={40} // Set your actual icon size
              height={40}
              className="icon animate-float cursor-pointer transition-transform duration-300 hover:scale-110"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PaymentIconsAnimation;
