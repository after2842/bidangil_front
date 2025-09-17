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

export function AddressScreenEng({ address, setAddress }) {
  // State for address fields
  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation (example)
    if (
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.zip
    ) {
      setError("Please fill in all address fields");
      return;
    }
    // TODO: Handle submit logic (API call, etc.)
    console.log("Submitted Address:", {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  return (
    <div className="w-full h-full">
      <div className="hidden md:block shadow-input text-white mx-auto max-w-2xl w-full rounded-xl bg-white p-4 md:p-4 dark:bg-black mt-4 ">
        {/* Title */}

        <form className="my-4 mx-6 text-left " onSubmit={handleSubmit}>
          {/* Address Line 1 */}
          <div className="flex w-full space-x-2">
            <div className="flex flex-col w-2/3">
              <h id="addressLine1" className="text-black">
                Address 1
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
                Address 2 <span className="text-[12px] ">(Optional)</span>
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
                City
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
                State
              </h>
              <InputOne
                id="state"
                placeholder="CA"
                type="text"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <h id="zip" className="text-black">
                ZIP Code
              </h>
              <InputOne
                id="zip"
                placeholder="90210"
                type="text"
                value={address.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full space-x-2 mt-24">
            <div className="flex flex-col w-1/3">
              <h id="addressLine1" className="text-black">
                Name
              </h>
              <InputOne
                id="name"
                placeholder="John Doe"
                type="text"
                value={address.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            {/* Address Line 2 (optional) */}
            <div className="flex flex-col w-1/3">
              <h id="phone" className="text-black">
                Phone Number
              </h>
              <InputOne
                id="phone"
                placeholder="(555) 123-4567"
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
      <div className="block md:hidden shadow-input w-full rounded-xl p-2 dark:bg-black mt-4">
        {/* Title */}

        <form className="my-4 mx-6 text-left " onSubmit={handleSubmit}>
          {/* Address Line 1 */}
          <div className="flex flex-col w-full ">
            <div className="flex flex-col w-full ">
              <h id="addressLine1" className="text-black">
                Address 1
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
            <div className="flex flex-col w-1/2 mt-2 ">
              <h id="addressLine2" className="text-black">
                Address 2
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
          <div className="flex w-full mt-6 space-x-2">
            <div className="flex flex-col w-1/2">
              <h id="city" className="text-black">
                City
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
                State
              </h>
              <InputOne
                id="state"
                placeholder="CA"
                type="text"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>{" "}
          </div>
          <div className="flex flex-col w-1/2 mt-2">
            <h id="zip" className="text-black">
              ZIP Code
            </h>
            <InputOne
              id="zip"
              placeholder="90210"
              type="text"
              value={address.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full mt-16">
            <div className="flex flex-col w-full">
              <h id="addressLine1" className="text-black">
                Name
              </h>
              <InputOne
                id="name"
                placeholder="John Doe"
                type="text"
                value={address.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            {/* Address Line 2 (optional) */}
            <div className="flex flex-col w-full mt-2">
              <h id="phone" className="text-black">
                Phone Number
              </h>
              <InputOne
                id="phone"
                placeholder="(555) 123-4567"
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
