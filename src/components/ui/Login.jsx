"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconUserCircle,
} from "@tabler/icons-react";

import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginScreen() {
  const router = useRouter();

  const { loginUser, fetchCsrfToken } = useUser();
  const [userpassword, setPassword] = useState("");
  const [useremail, setemail] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await loginUser(userpassword, useremail);
      console.log(result);

      if (result.success) {
        await fetchCsrfToken(); // optional depending on your login flow
        router.push("/");
      } else {
        setError("Invalid login");
        alert("아이디나 비밀번호가 일치하지 않아요!");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      alert("problem");
      setError("로그인 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="shadow-input text-white mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-myfont flex justify-center">
        비단길
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>
      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">이메일 주소</Label>
          <Input
            id="email"
            placeholder="happyShop@bidangil.com"
            type="email"
            value={useremail}
            onChange={(e) => setemail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={userpassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-blue-500 font-medium text-white"
          type="submit"
        >
          로그인
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <div className="text-center font-myfont text-black">
            비단길이 처음이신가요?
          </div>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => {
              router.push("/signup");
            }}
          >
            <IconUserCircle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              회원가입 &rarr;
            </span>
            <BottomGradient />
          </button>

          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google로 로그인하기 &rarr;
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
