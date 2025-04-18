"use client";
import React, { useState } from "react";
import { BottomGradient } from "@/components/ui/Login";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
function LabelInputContainer({ children, className }) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
export function AddressScreen({ address, setAddress, onClose }) {
  // State for address fields
  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-xl shadow-xl"
      >
        <div className="shadow-input text-white mx-auto w-full rounded-xl max-w-md bg-white p-4 md:p-8 dark:bg-black">
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
                value={address.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
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
                value={address.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
              />
            </LabelInputContainer>

            {/* City */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Anaheim"
                type="text"
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </LabelInputContainer>

            {/* State */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="stateUS">State</Label>
              <Input
                id="stateUS"
                placeholder="CA"
                type="text"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </LabelInputContainer>

            {/* Zip Code */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                placeholder="90210"
                type="text"
                value={address.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </LabelInputContainer>

            {/* Display error if any */}
            {error && (
              <div className="mb-4 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-blue-500 font-medium text-white mt-10"
              type="submit"
              onClick={onClose}
            >
              완료
              <BottomGradient />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
