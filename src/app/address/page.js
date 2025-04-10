"use client";
import React, { useState } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils"; // Or wherever you have your `cn` helper
import { BottomGradient } from "@/components/ui/Login";

// Reusable Label component (same as in your LoginScreen)
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

// Reusable Input component (same as in your LoginScreen)
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the radius of the hover effect
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
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        className={cn(
          `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md 
          border-none bg-gray-50 px-3 py-2 text-md text-black transition duration-400 group-hover/input:shadow-none file:border-0 
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
Input.displayName = "Input";

// Reusable container for Label + Input
function LabelInputContainer({ children, className }) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

export function AddressScreen() {
  // State for address fields
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateUS, setStateUS] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation (example)
    if (!addressLine1 || !city || !stateUS || !zipCode) {
      setError("모든 주소를 기입해주세요");
      return;
    }
    // TODO: Handle submit logic (API call, etc.)
    console.log("Submitted Address:", {
      addressLine1,
      addressLine2,
      city,
      state: stateUS,
      zipCode,
    });
  };

  return (
    <div className="shadow-input text-white mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      {/* Title */}
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-myfont flex justify-center">
        수령인 주소
      </h2>

      <form className="my-12" onSubmit={handleSubmit}>
        {/* Address Line 1 */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="addressLine1">Address 1</Label>
          <Input
            id="addressLine1"
            placeholder="123 Main St."
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </LabelInputContainer>

        {/* Address Line 2 (optional) */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="addressLine2">
            Address 2 <span className="text-[12px] "></span>
          </Label>
          <Input
            id="addressLine2"
            placeholder="Apt, Suite, etc."
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </LabelInputContainer>

        {/* City */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Anaheim"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </LabelInputContainer>

        {/* State */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="stateUS">State</Label>
          <Input
            id="stateUS"
            placeholder="CA"
            type="text"
            value={stateUS}
            onChange={(e) => setStateUS(e.target.value)}
          />
        </LabelInputContainer>

        {/* Zip Code */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            placeholder="90210"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </LabelInputContainer>

        {/* Display error if any */}
        {error && (
          <div className="mb-4 text-sm font-semibold text-red-600">{error}</div>
        )}

        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-blue-500 font-medium text-white mt-10"
          type="submit"
        >
          완료
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export default function Address() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#030819]">
      <AddressScreen />
    </div>
  );
}
