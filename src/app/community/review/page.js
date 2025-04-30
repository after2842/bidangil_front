"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Community() {
  const { fetchCommunityInfo, communityProfile } = useUser();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);
  useEffect(() => {
    console.log("avatar called");
    fetchCommunityInfo();
    console.log("fdasfsda", communityProfile);
  }, []);
  const clickMyprofile = () => {
    if (toggleEditProfile) {
      setToggleEditProfile(false);
    } else {
      setToggleEditProfile(true);
    }
  };
  const clickSideMenu = () => {
    if (toggleSideMenu) {
      setToggleSideMenu(false);
    } else {
      setToggleSideMenu(true);
    }
  };
  return (
    <div className="relative h-screen w-full bg-white">
      <Navbar
        clickSideMenu={clickSideMenu}
        communityProfile={communityProfile}
      />
      <div className={`${toggleEditProfile ? "blur-md" : ""} transition-all`}>
        <div className=" flex justify-center">
          <div className="mt-16 w-3/5 h-full bg-white rounded-2xl p-4 ">
            <Review />
          </div>
          <div className="absolute right-2 mt-1 w-[200px]">
            {toggleSideMenu && <Sidemenu clickMyprofile={clickMyprofile} />}
          </div>
        </div>
      </div>
      {toggleEditProfile && (
        <EditProfile
          clickMyprofile={clickMyprofile}
          communityProfile={communityProfile}
        />
      )}
    </div>
  );
}

const Navbar = ({ clickSideMenu, communityProfile }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <button
        className="font-myfont text-black text-2xl mt-4 ml-8"
        onClick={() => {
          router.push("/");
        }}
      >
        비단길
      </button>

      <div className="flex font-myfont text-xl">
        <button className=" px-4 mt-4 text-blue-500">리뷰</button>
        <button className=" px-4 mt-4">나눔</button>
        <button className=" px-4 mt-4">한국-미국</button>
        <button
          className=" px-4 mt-4 hover:text-blue-500"
          onClick={() => {
            router.push("/form");
          }}
        >
          구매대행 신청
        </button>
      </div>
      <div className="mr-2 mt-2">
        {communityProfile && (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "blue-100" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full"
            onClick={clickSideMenu}
          >
            <img
              src={communityProfile}
              width={45}
              height={40}
              className="rounded-full border border-gray-600 border-[1px] p-1"
              alt="asdf"
            ></img>
          </motion.button>
        )}{" "}
      </div>
    </div>
  );
};

const EditProfile = ({ clickMyprofile, communityProfile }) => {
  const [nickname, setnickname] = useState("");
  const changeNickname = (e) => {
    setnickname(e);
  };
  const [hover, setHover] = useState(false);

  return (
    <div>
      {" "}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white w-2/3 h-[70vh] p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl mb-4 text-center font-myfont">내 캐릭터</h2>
          <div className="flex">
            <div className="flex flex-col mt-4 space-y-12 w-full">
              <div className="flex flex-col w-1/2">
                <label className="mb-1">닉네임</label>
                <input
                  type="nickname"
                  value={nickname}
                  onChange={(e) => changeNickname(e.target.value)}
                  placeholder="nickname"
                  className="border border-blue-500 h-8 rounded-2xl p-2 text-center"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1">사는 곳</label>
                <input
                  type="nickname"
                  value={nickname}
                  onChange={(e) => changeNickname(e.target.value)}
                  placeholder="nickname"
                  className="border border-blue-500 h-8 rounded-2xl p-2 text-center"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1">인기도</label>
                <input
                  type="nickname"
                  value={nickname}
                  onChange={(e) => changeNickname(e.target.value)}
                  placeholder="nickname"
                  className="border border-blue-500 h-8 rounded-2xl p-2 text-center"
                />
              </div>
            </div>
            <img
              src={communityProfile}
              width={350}
              height={350}
              className="mx-auto"
            ></img>
            <div className="w-full flex justify-end">
              <Link
                href="/community/createavatar"
                target="_blank"
                className={`flex justify-center items-center w-1/2 h-full py-4 px-6 border-2 rounded-xl 
                  transition-all duration-300
                  ${hover ? "bg-blue-400 text-white scale-105 shadow-lg" : "bg-white text-blue-500 border-blue-400"}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <button>
                  <span className="text-xl font-bold tracking-wider text-center">
                    아바타
                    <br /> 생성하기
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="space-x-4 flex justify-end mt-[100px] mr-4">
            <button
              onClick={() => clickMyprofile()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              취소
            </button>
            <button
              onClick={() => clickMyprofile()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidemenu = ({ clickMyprofile }) => {
  const router = useRouter();
  return (
    <div className=" rounded-xl flex flex-col items-start space-y-4 border shadow-md p-2">
      <div className="flex">
        <svg
          width="16"
          height="17"
          viewBox="0 -5 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5ZM13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5ZM3.02448 10.2903C3.16276 10.1835 3.33034 10.1177 3.50495 10.1118C4.01604 10.0945 4.27556 10.2136 4.47518 10.4393C4.86035 10.8748 4.60724 11.5818 4.1542 11.9462C3.32132 12.616 2.67734 13.4973 2.30604 14.4998H13.693C13.3218 13.4975 12.678 12.6164 11.8454 11.9466C11.3924 11.5822 11.1394 10.875 11.5246 10.4395C11.7243 10.2137 11.9838 10.0947 12.4948 10.1121C12.6693 10.1181 12.8368 10.1839 12.975 10.2906C14.5963 11.5427 15.7152 13.3928 15.9862 15.502C16.0566 16.0498 15.6021 16.4998 15.0499 16.4998H0.949191C0.396906 16.4998 -0.0575638 16.0498 0.0128305 15.502C0.283899 13.3927 1.40298 11.5424 3.02448 10.2903Z"
            fill="#222222"
          />
        </svg>

        <button className="hover:text-blue-500 ml-3" onClick={clickMyprofile}>
          내 캐릭터
        </button>
      </div>
      <div className="flex">
        <svg
          width="15"
          height="18"
          viewBox="0 -4 15 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5H10.5M5 13H10.5M5 9H9.5M13 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H13C13.5523 17 14 16.5523 14 16V2C14 1.44772 13.5523 1 13 1Z"
            stroke="#222222"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <button
          className="hover:text-blue-500 ml-3"
          onClick={() => {
            router.push("/community/writepost");
          }}
        >
          글 쓰기
        </button>
      </div>
      <div className="flex">
        <svg
          width="16"
          height="16"
          viewBox="0 -5 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.58594 1L8.58594 3H17V15H1V1H6.58594Z"
            stroke="#222222"
            stroke-width="2"
          />
        </svg>

        <button className="hover:text-blue-500 ml-3">내가 쓴 글</button>
      </div>
    </div>
  );
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const PAGE_SIZE = 10;

  // first load
  useEffect(() => {
    loadPage(1);
  }, []);

  async function loadPage(p) {
    const res = await fetch(
      `http://localhost:8000/api/get_reviews/?page=${p}&size=${PAGE_SIZE}`
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("Server returned", res.status, text);
      alert("요청 실패 (" + res.status + ")");
      return;
    }
    const json = await res.json(); //parse
    if (p === 1) {
      setReviews(json.results); // first page replaces
    } else {
      setReviews((prev) => [...prev, ...json.results]); // append
    }
    setHasNext(json.has_next);
    setPage(p);
  }

  const handleNext = () => {
    if (hasNext) loadPage(page + 1);
  };

  return (
    <div>
      {reviews && reviews.map((review) => <ReviewCard reviewData={review} />)}
      <div className="w-full">
        <div className="flex mt-12 mb-4 justify-between">
          {page !== 1 ? (
            <button
              className="font-myfont text-2xl ml-4"
              onClick={() => loadPage(page - 1)}
            >
              {"< "}이전
            </button>
          ) : (
            <>⠀</>
          )}

          <button
            className="font-myfont text-2xl mr-4 hover:text-blue-500"
            onClick={handleNext}
            disabled={!hasNext}
          >
            다음{" >"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ reviewData }) => {
  const rating = Number(reviewData.title); //title = rating in reviews categories
  const content = reviewData.content;
  const images = reviewData.images;
  const nickname = reviewData.nickname;
  const avatar_url = reviewData.avatar;
  const date = reviewData.created_at;

  return (
    <div className="ml-8 mt-12">
      <div className="flex">
        <img
          src={avatar_url}
          width={60}
          height={60}
          className="rounded-full"
        ></img>
        <div className="ml-2">
          <div className="flex flex-col">
            <p>{nickname}</p>
            <div className="flex">
              {Array.from({ length: rating }).map(() => (
                <Image src="/svgs/star.svg" width={20} height={20} alt="star" />
              ))}
            </div>
            <div className="text-[10px] mt-1 ml-1">{formatDate(date)}</div>
          </div>
        </div>
      </div>
      <div className="pr-16 mt-3 ml-2">
        <p>{content}</p>
      </div>
      <div className="mt-2 ml-2 flex">
        {images &&
          images.map((image) => (
            <img
              src={image.image_url}
              width={200}
              height={200}
              className="mr-4"
            />
          ))}
      </div>
    </div>
  );
};
function formatDate(dateString) {
  const date = new Date(dateString); // parse to Date object
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}월 ${day}일 ${year}`;
}
