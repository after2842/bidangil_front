"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
const InputTwoThird = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

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
      className="group/input rounded-lg p-[1px] transition duration-300 w-[66%] border border-blue-200"
    >
      <input
        type={type}
        className={cn(
          `shadow-input dark:placeholder-text-neutral-600 flex h-8  rounded-md w-full
              border-none bg-white px-3 py-2 text-md text-black transition duration-400 group-hover/input:shadow-none file:border-0 
              file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 
              focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] 
              dark:focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
const InputThird = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

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
      className="group/input rounded-lg p-[1px] transition duration-300 w-[33%] border border-blue-200"
    >
      <input
        type={type}
        className={cn(
          `shadow-input dark:placeholder-text-neutral-600 flex h-8  rounded-md w-full
            border-none bg-white px-3 py-2 text-md text-black transition duration-400 group-hover/input:shadow-none file:border-0 
            file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 
            focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] 
            dark:focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

const InputOne = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

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
      className="group/input rounded-lg p-[1px] transition duration-300 w-full border border-blue-200 shadow-sm"
    >
      <input
        type={type}
        className={cn(
          `shadow-input dark:placeholder-text-neutral-600 flex h-8  rounded-md w-full
            border-none bg-white px-3 py-2 text-md text-black transition duration-400 group-hover/input:shadow-none file:border-0 
            file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 
            focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] 
            dark:focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
const InputHalf = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

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
      className="group/input rounded-lg p-[2px] transition duration-300 w-[50%] border-blue-200"
    >
      <input
        type={type}
        className={cn(
          `shadow-input dark:placeholder-text-neutral-600 flex h-8  rounded-md w-full
          border-none bg-white px-3 py-2 text-md text-black transition duration-400 group-hover/input:shadow-none file:border-0 
          file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 
          focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] 
          dark:focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
InputOne.displayName = "InputOne";
InputHalf.displayName = "Input";
InputThird.displayName = "Input";
InputTwoThird.displayName = "Input";
export { InputHalf, InputThird, InputTwoThird, InputOne };
