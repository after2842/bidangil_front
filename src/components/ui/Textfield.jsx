"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

const TextField = React.forwardRef(function TextField(
  { className, ...props },
  ref
) {
  const radius = 100; // Increase or decrease for different hover radius
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            #3b82f6,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/textfield rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        ref={ref}
        className={cn(
          `
          h-[350px]
          resize-none
          shadow-input 
             dark:placeholder-text-neutral-600 
             flex w-full rounded-md 
             border-none bg-gray-50 
             px-3 py-2 text-md text-black
             transition duration-400 
             group-hover/textfield:shadow-none
             placeholder:text-neutral-400 
             focus-visible:ring-[2px]
             focus-visible:ring-neutral-400 
             focus-visible:outline-none
             disabled:cursor-not-allowed 
             disabled:opacity-50
             dark:bg-zinc-800 
             dark:text-white 
             dark:shadow-[0px_0px_1px_1px_#404040]
             dark:focus-visible:ring-neutral-600`,
          className
        )}
        {...props}
      />
    </motion.div>
  );
});

TextField.displayName = "TextField";
export default TextField;
