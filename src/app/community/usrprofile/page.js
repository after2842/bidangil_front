"use client";
import { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
export default function UserProfile({ searchParams }) {
  const params = useSearchParams();
  const user = params.get("usr") ?? "";
  const [usrdata, setusrdata] = useState();
  const { csrfToken } = useUser();

  const fetchUserinfo = async () => {
    console.log("fetching...");
    const response = await apiFetch(`/api/others_profile/?usr=${user}`, {
      method: "GET",
      //credentials: "include", // sends cookies for session
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    if (response.status === 500) {
      alert("something wrong!");
    }
    const data = await response.json();
    setusrdata(data["result"]);
  };
  useEffect(() => {
    console.log(user);
    fetchUserinfo();
    console.log(usrdata);
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-center items-center border ">
        <div className="py-12">
          {usrdata && (
            <>
              <img src={usrdata.avatar} width={250} height={250} />
              <HoldButton
                nickname={usrdata.nickname}
                address={usrdata.community_address}
                likes={usrdata.likes}
                csrf={csrfToken}
              />
            </>
          )}
        </div>

        <div className="w-2/3">
          {" "}
          {usrdata && (
            <div className="items-center text-xl">
              <span className="font-myfont">{usrdata?.nickname}</span> 님이
              좋아한 포스트
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[260px]">
            {usrdata?.liked_posts?.map((post, idx) => (
              <PostCard post={post} key={idx} />
            ))}
          </div>
        </div>
        <div className="w-2/3 mt-36">
          {" "}
          {usrdata && (
            <div className="items-center text-xl">
              <span className="font-myfont">{usrdata?.nickname}</span> 님의
              포스트
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[260px] mb-12">
            {usrdata?.target_posts?.map((post, idx) => (
              <PostCard post={post} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PostCard = ({ post }) => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col h-full w-full overflow-hidden rounded cursor-pointer shadow-md border bg-gray-100 "
      whileHover={{ scale: 1.03 }} // <— slightly bigger on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => {
        router.push(`funpost/${post.slug}`);
      }}
    >
      {/* Image area */}
      <div className="h-[300px] w-full overflow-hidden">
        <img
          src={post.images[0]?.image_url}
          alt="thumbnail"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text area */}
      <div className="flex flex-col flex-grow px-2 py-1 bg-white">
        <p className="text-sm font-medium ">{post.title}</p>
        <p className="text-xs text-gray-500 mt-auto">
          {formatDate(post.created_at)}
        </p>
      </div>
    </motion.div>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString); // parse to Date object
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}월 ${day}일 ${year}`;
}

function HoldButton({ nickname, address, likes, csrf }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const submitlike = async () => {
    const res = await apiFetch("/api/community_profile/like/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    });
    if (res.status == 500) {
      alert("로그인 후 이용해주세요");
      router.push("/login");
    } else if (res.status === 200) {
      let result = await res.json();
      if (result["result"] == "liked") {
        alert("포스트를 좋아했어요!");
      } else if (result["result"] == "unliked") {
        alert("포스트를 취소했어요!");
      }
    }
  };

  const handleMouseDown = () => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 50;
      setProgress((current / 2000) * 100);
    }, 1);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setProgress(100);

      submitlike();
    }, 1250);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    if (progress === 100) {
      console.log("here");
      setProgress(100);
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    console.log("progress0");
    setProgress(0);
  }, []);
  useEffect(() => {
    console.log("progress changed", progress);
  }, [progress]);
  return (
    <div className="relative w-fll">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="relative w-full h-full rounded rounded-full shadow-md overflow-hidden bg-white"
      >
        <div
          className="absolute left-0 bottom-0 w-full bg-gray-500 opacity-10  transition-all"
          style={{ height: `${progress}%` }}
        />

        <div className="flex flex-col justify-center px-6 py-1">
          <p className="text-left">닉네임 : {nickname}</p>
          <p className="text-left">사는 곳: {address}</p>
          <p className="text-left">인기도 : {likes}</p>
        </div>
      </button>
    </div>
  );
}
