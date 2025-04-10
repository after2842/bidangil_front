"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
export default function Signup() {
  return (
    <section className="bg-black">
      <div className="flex justify-center items-center h-screen bg-[#030819]">
        <SignupFormDemo></SignupFormDemo>
      </div>
    </section>
  );
}
export function SignupFormDemo() {
  const { setUser, csrfToken } = useUser();
  const router = useRouter();
  //1.handle sending code
  const handleSendCode = async () => {
    if (!useremail) {
      alert("이메일을 먼저 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/send_code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": csrfToken,
        },
        body: JSON.stringify({ email: useremail }),
      });

      if (response.ok) {
        alert("인증 코드가 전송되었습니다. 이메일을 확인해주세요!");
        setShowVerificationInput(true); // Show the code input
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.error || "이미 등록된 이메일입니다.");
      }
    } catch (err) {
      console.error("Error sending code:", err);
      alert("서버에 문제가 생겼습니다. 나중에 다시 시도해주세요.");
    }
  };

  // 2. Handle verifying the code
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/verify_code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
          code: verificationCode,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert("인증이 완료되었습니다!");
        // You might set some state to remember it's verified
        // Or store a token for usage in signup
      } else {
        alert(data.error || "코드 인증 실패. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      alert("서버에 문제가 생겼습니다. 나중에 다시 시도해주세요.");
    }
  };

  //3 handle creating a sign up
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/sign_up/", {
        method: "POST",
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userpassword: userpassword,
          useremail: useremail,
          username: username,
        }),
      });

      if (response.status === 201) {
        console.log("Signup successful!");
        const data = await response.json();
        alert("회원가입이 완료되었습니다.");
        setUser(data);
        router.push("/");
      } else if (response.status === 400) {
        console.log("All fields are required");
        alert("모든 정보를 입력해주세요!");
      } else if (response.status === 401) {
        console.log("Email Taken");
        alert("이미 사용된 이메일입니다.");
      } else if (response.status === 402) {
        console.log("email not verified");
        alert("email not verified");
      }

      return { success: true };
    } catch (err) {
      console.error("what error?", err);
      return { success: false, message: err.message };
    }
  };
  const { loginUser } = useUser();
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [useremail, setemail] = useState("");
  const [error, setError] = useState("");

  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="shadow-input text-white mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-myfont flex justify-center">
        비단길
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>
      <form className="my-8" onSubmit={handleSignup}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">이름</Label>
            <Input
              id="firstname"
              placeholder="김비단"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">이메일 주소</Label>
          <div className="flex flex-row ">
            <div
              className="
                grid grid-cols-5 gap-2
                md:grid-cols-5 md:grid-rows-1
                md:grid-flow-row-dense
            "
            >
              <div className="md:col-span-4 md:row-span-1">
                <Input
                  id="email"
                  placeholder="happyShop@bidangil.com"
                  type="email"
                  value={useremail}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <button
                  type="button"
                  onClick={handleSendCode}
                  className=" flex text-center py-3 px-2 text-sm text-white bg-blue-500 rounded-md"
                >
                  코드 전송
                </button>
              </div>
            </div>
          </div>

          {/* Verification Code Input (Shown After Code is Sent) */}
          {showVerificationInput && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="verifyCode"></Label>
              <div className="flex space-x-5">
                <Input
                  id="verifyCode"
                  placeholder="6자리 코드"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="px-2 py-3 text-sm text-white bg-blue-500 rounded-md"
                >
                  코드 인증
                </button>
              </div>
            </LabelInputContainer>
          )}
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
        {/* <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword" >전화번호</Label>
            <Input id="twitterpassword" placeholder="•••-•••-••••" type="twitterpassword" />
          </LabelInputContainer> */}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-blue-500 font-medium text-white"
          type="submit"
        >
          회원가입
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google로 회원가입 &rarr;
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}
const BottomGradient = () => {
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

const CodeInput = () => {
  const [loading, setLoading] = useState(false);
  const [completedCode, setCompletedCode] = useState("");

  // This will be called by <InputCode ...> once all digits are typed
  const handleComplete = (code) => {
    setCompletedCode(code);
  };

  // Function to submit the code to your backend
  const handleSubmit = async () => {
    if (!completedCode || completedCode.length < 6) return;
    try {
      setLoading(true);
      const response = await fetch("/api/sign_up/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: completedCode }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Code verified successfully!");
        // Do something on success, e.g. navigate or show success message
      } else {
        alert(data.error || "Verification failed!");
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App bg-white">
      <div className="flex flex-col justify-center md:p-6">
        <h1 className="text-center font-myfont mb-6">코드를 입력해주세요</h1>

        <InputCode
          length={6}
          label="Code Label"
          loading={loading}
          onComplete={handleComplete}
        />
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={loading || completedCode.length < 6}
            className=" h-10 w-1/2 rounded-md bg-blue-500 font-medium text-white"
          >
            {loading ? "확인중..." : "입력완료"}
          </button>
        </div>
      </div>
    </div>
  );
};

const InputCode = ({ length, label, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="code-input">
      <label className="code-label"></label>
      <div className="code-inputs">
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              ref={(ref) => inputs.current.push(ref)}
            />
          );
        })}
      </div>
    </div>
  );
};
