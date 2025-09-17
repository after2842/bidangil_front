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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(userpassword, useremail);
      console.log(result);

      if (result.success) {
        await fetchCsrfToken(); // optional depending on login flow
        const savedAddress = sessionStorage.getItem("savedAddress");
        const savedForms = sessionStorage.getItem("savedForms");
        if (savedAddress && savedForms) {
          router.push("/form");
        } else {
          router.push("/");
        }
      } else {
        alert("아이디나 비밀번호가 일치하지 않아요!");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      alert("problem");
    }
  };

  return (
    <div className="shadow-input text-white mx-auto w-[350px]  md:border-none md:w-full max-w-md rounded-2xl md:bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-2xl font-bold md:text-neutral-800 dark:text-neutral-200 font-myfont flex justify-center">
        비단길 로그인
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>
      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="md:text-black text-white">
            이메일 주소
          </Label>
          <Input
            id="email"
            placeholder="happyShop@bidangil.com"
            type="email"
            value={useremail}
            onChange={(e) => setemail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="password" className="md:text-black text-white">
            비밀번호
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={userpassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-full md:rounded-md bg-blue-600 md:bg-blue-500 font-medium text-white"
          type="submit"
        >
          로그인
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <div className="text-center font-myfont text-white md:text-black">
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

export function LoginScreenEng() {
  const router = useRouter();

  const { loginUser, fetchCsrfToken } = useUser();
  const [userpassword, setPassword] = useState("");
  const [useremail, setemail] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(userpassword, useremail);
      console.log(result);

      if (result.success) {
        await fetchCsrfToken(); // optional depending on login flow
        const savedAddress = sessionStorage.getItem("savedAddress");
        const savedForms = sessionStorage.getItem("savedForms");
        if (savedAddress && savedForms) {
          router.push("/en/form");
        } else {
          router.push("/en");
        }
      } else {
        alert("Email or password does not match!");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      alert("Problem occurred");
    }
  };

  return (
    <div className="shadow-input text-white mx-auto w-[350px]  md:border-none md:w-full max-w-md rounded-2xl md:bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-2xl font-bold md:text-neutral-800 dark:text-neutral-200 font-myfont flex justify-center">
        Bidangil Login
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>
      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="md:text-black text-white">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="happyShop@bidangil.com"
            type="email"
            value={useremail}
            onChange={(e) => setemail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="password" className="md:text-black text-white">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={userpassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-full md:rounded-md bg-blue-600 md:bg-blue-500 font-medium text-white"
          type="submit"
        >
          Login
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <div className="text-center font-myfont text-white md:text-black">
            New to Bidangil?
          </div>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => {
              router.push("/en/signup");
            }}
          >
            <IconUserCircle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Sign Up &rarr;
            </span>
            <BottomGradient />
          </button>

          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Login with Google &rarr;
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

