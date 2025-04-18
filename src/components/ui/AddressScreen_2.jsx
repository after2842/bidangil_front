"use client";
import React, { useState } from "react";
import { BottomGradient } from "@/components/ui/Login";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import {
  InputThird,
  InputHalf,
  InputTwoThird,
  InputOne,
} from "@/components/ui/input_3";

export function AddressScreen({ address, setAddress }) {
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
    <div className="w-full h-full">
      <div className="shadow-input text-white mx-auto max-w-2xl w-full rounded-xl bg-white p-4 md:p-4 dark:bg-black mt-4 ">
        {/* Title */}

        <form className="my-4 mx-6 text-left " onSubmit={handleSubmit}>
          {/* Address Line 1 */}
          <div className="flex w-full space-x-2">
            <div className="flex flex-col w-2/3">
              <h id="addressLine1" className="text-black">
                주소 1
              </h>
              <InputOne
                id="addressLine1"
                placeholder="123 Main St."
                type="text"
                value={address.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
              />
            </div>
            {/* Address Line 2 (optional) */}
            <div className="flex flex-col w-1/3">
              <h id="addressLine2" className="text-black">
                주소 2 <span className="text-[12px] "></span>
              </h>
              <InputOne
                id="addressLine2"
                placeholder="Apt, Suite, etc."
                type="text"
                value={address.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full space-x-2 mt-6">
            <div className="flex flex-col w-1/3">
              <h id="city" className="text-black">
                도시<span className="text-[12px] ">(city)</span>
              </h>
              <InputOne
                id="city"
                placeholder="Los Angeles"
                type="text"
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            {/* Address Line 2 (optional) */}
            <div className="flex flex-col w-1/3">
              <h id="state" className="text-black">
                주<span className="text-[12px] ">(state)</span>
              </h>
              <InputOne
                id="state"
                placeholder="Apt, Suite, etc."
                type="text"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <h id="zip" className="text-black">
                우편번호 <span className="text-[12px] ">(zip code)</span>
              </h>
              <InputOne
                id="zip"
                placeholder="Apt, Suite, etc."
                type="text"
                value={address.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full space-x-2 mt-24">
            <div className="flex flex-col w-1/3">
              <h id="addressLine1" className="text-black">
                이름
              </h>
              <InputOne
                id="name"
                placeholder="name"
                type="text"
                value={address.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            {/* Address Line 2 (optional) */}
            <div className="flex flex-col w-1/3">
              <h id="phone" className="text-black">
                전화번호 <span className="text-[12px] "></span>
              </h>
              <InputOne
                id="phone"
                placeholder="1112223333"
                type="text"
                value={address.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>
          {/* Display error if any */}
          {error && (
            <div className="mb-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
        </form>
      </div>
    </div>
  );
}
