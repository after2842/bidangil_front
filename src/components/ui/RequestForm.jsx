"use client";
import React, { useEffect, useState } from "react";

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
import Image from "next/image";
import { BottomGradient } from "@/components/ui/Login";
export default function RequestForm({ forms, setforms }) {
  const handleChange = (index, field, value) => {
    const updateform = [...forms];

    updateform[index][field] = value; //.field=> literally meaning the key named "field", not dynamically referring what field refers to
    setforms(updateform);
  };
  const addForms = () => {
    const newForms = [...forms, { url: "", desc: "", price: "" }];
    setforms(newForms);
  };
  const [showPriceWarn, setPriceWarn] = useState(false);
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide ">
      <div className="shadow-input text-white mx-auto max-w-2xl w-full rounded-xl bg-white p-4 md:p-4 dark:bg-black mt-4 ">
        <form className="my-6 mx-6 text-left">
          {" "}
          <div className="flex justify-end">
            <button
              onClick={addForms}
              className="px-3 text-black border border-blue-500 rounded-xl"
              type="button"
            >
              {/* <Image
                src="/images/add.png"
                alt="add"
                width={20} // Set your actual icon size
                height={10}
              /> */}
              추가
            </button>
          </div>
          {forms.map((form, index) => (
            <div key={index}>
              <div>
                {" "}
                {index !== 0 && (
                  <div className="mt-[14px] mb-[10px] h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-900" />
                )}
                <div id={`url${index}`} className="text-black text-sm flex ">
                  url{" "}
                </div>
                <div className="p-[0.1px] rounded-lg shadow-sm">
                  <InputOne
                    id={`url-${index}`}
                    placeholder="https://www.bidangil.co/shop?item-1004"
                    type="text"
                    value={form.url}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                  />
                </div>
              </div>
              {/* Address Line 2 (optional) */}
              <div className="w-full ">
                <h id={`option${index}`} className="text-black text-sm">
                  옵션 <span className="text-[12px] "></span>
                </h>
                <div className="p-[0.1px] rounded-lg shadow-sm">
                  <InputOne
                    id={`desc-${index}`}
                    placeholder="수량, 색상 등의 옵션을 입력해주세요"
                    type="text"
                    value={form.desc}
                    onChange={(e) =>
                      handleChange(index, "desc", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Display error if any */}
        </form>
      </div>
    </div>
  );
}

const Singleform = () => {
  return (
    <div>
      <div className="w-full">
        <h id="addressLine1" className="text-black text-sm">
          URL
        </h>
        <InputOne
          id="url"
          placeholder="put your url here"
          type="text"
          value={forms[0].url}
          onChange={(e) => handleChange(0, "url", e.target.value)}
        />
      </div>
      {/* Address Line 2 (optional) */}
      <div className="w-full mb-6">
        <h id="addressLine2" className="text-black text-sm">
          option <span className="text-[12px] "></span>
        </h>
        <InputOne
          id="desc"
          placeholder="put your options here"
          type="text"
          value={forms[0].desc}
          onChange={(e) => handleChange(0, "desc", e.target.value)}
        />
      </div>
    </div>
  );
};
