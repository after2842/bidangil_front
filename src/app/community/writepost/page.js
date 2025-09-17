/* app/community/write/page.js */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const MAX_FILES = 9;

export default function WritePost() {
  const { fetchCsrfToken, fetchCommunityInfo, communityProfile, csrfToken } =
    useUser();
  const router = useRouter();

  const [mode, setMode] = useState(null);
  const [title, setTitle] = useState("");
  const [sharetitle, setSharetitle] = useState("");
  const [sharebody, setSharebody] = useState("");
  const [posts, setposts] = useState([]);

  const [funtitle, setFuntitle] = useState("");
  const [funbody, setFunbody] = useState("");
  const [restAddress, setrestAddress] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]); // <— array of File
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [rating, setRating] = useState(0); // 0–5
  const [hovered, setHovered] = useState(0); // 마우스 올렸을 때 미리보기
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");

  const [funcategory, setFuncategory] = useState("");
  const [meetupcategory, setMeetupcategory] = useState("");
  const [toggleMyposts, setToggleMyposts] = useState(false);
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
  /* ---------- file handler ---------- */
  const onFileChange = (e) => {
    const chosen = Array.from(e.target.files); // list → array
    const all = [...files, ...chosen];

    // keep only png and first MAX_FILES
    const ALLOWED = ["image/png", "image/jpeg", "image/jpg"];
    const filtered = all
      .filter((f) => ALLOWED.includes(f.type))
      .slice(0, MAX_FILES);

    if (
      chosen.some(
        (f) => !["image/png", "image/jpeg", "image/jpg"].includes(f.type)
      )
    ) {
      setErr("PNG 파일만 가능합니다.");
    } else if (all.length > MAX_FILES) {
      setErr(`최대 ${MAX_FILES}개까지만 업로드할 수 있어요.`);
    } else {
      setErr("");
    }
    setFiles(filtered);
    e.target.value = ""; // reset picker
  };

  const removeFile = (idx) => setFiles((f) => f.filter((_, i) => i !== idx));

  /* ---------- submit ---------- */
  const handleSubmit = async () => {
    if (!mode) {
      alert("모든 정보를 입력해주세요");
      return;
    }

    if (mode === "review") {
      if (!rating || !body.trim()) {
        alert("별점과 내용을 입력해주세요");
        return;
      }
    } else if (mode === "share") {
      if (
        !sharetitle.trim() ||
        !sharebody.trim() ||
        !selectedState ||
        !selectedCounty
      ) {
        alert("제목, 내용, 주/카운티를 모두 입력해주세요");
        return;
      }
    } else if (mode === "fun") {
      if (funcategory === "food") {
        if (!funtitle.trim() || !funbody.trim() || !restAddress.trim()) {
          alert("제목, 내용, 음식점 주소를 입력해주세요");
          console.log(title, body, restAddress);
          return;
        }
      } else if (funcategory === "meetup") {
        if (
          !funtitle.trim() ||
          !funbody.trim() ||
          !selectedState ||
          !selectedCounty ||
          !meetupcategory
        ) {
          alert("제목, 내용, 주/카운티, 모임 유형을 입력해주세요");
          return;
        }
      } else if (funcategory === "chat") {
        if (!funtitle.toString() || !funbody.toString()) {
          alert("제목과 내용을 입력해주세요");
          return;
        }
      } else {
        alert("기능 카테고리를 선택해주세요");
        return;
      }
    }
    setSending(true);
    const csrf = await fetchCsrfToken();

    const fd = new FormData();
    if (mode === "review") {
      fd.append("category", mode);
      fd.append("title", rating.toString());
      fd.append("content", body);
    } else if (mode === "share") {
      fd.append("category", mode);
      fd.append("title", sharetitle);
      fd.append("content", sharebody);
      fd.append("state", selectedState);
      fd.append("county", selectedCounty);
    } else if (mode === "fun") {
      if (funcategory === "food") {
        fd.append("category", mode);
        fd.append("funcategory", "food");
        fd.append("title", funtitle);
        fd.append("content", funbody);
        fd.append("restaurantaddress", restAddress);
      } else if (funcategory === "meetup") {
        fd.append("category", mode);
        fd.append("funcategory", "meetup");
        fd.append("title", funtitle);
        fd.append("content", funbody);
        fd.append("state", selectedState);
        fd.append("county", selectedCounty);
        fd.append("meetupcategory", meetupcategory);
      } else if (funcategory === "chat") {
        fd.append("category", mode);
        fd.append("funcategory", "chat");
        fd.append("title", funtitle);
        fd.append("content", funbody);
      }
    }

    files.forEach((file, idx) => fd.append(`image_${idx}`, file));
    console.log("FormData being sent:");
    for (let pair of fd.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const res = await apiFetch("/api/community/post/", {
      method: "POST",
      credentials: "include",
      headers: { "X-csrftoken": csrf }, // DON’T set Content-Type
      body: fd,
    });
    const result = await res.json();
    if (res.ok) {
      alert("✅ 작성 완료!");
      router.push("/community/funpost");
    } else {
      console.error(result);
      alert("❌ 전송 실패");
    }
    setSending(false);
  };

  const handleSharetitle = (e) => {
    if (e.length > 50) {
      alert("제목은 50자 까지만 가능해요");
    } else {
      setSharetitle(e);
    }
  };
  const Star = ({ idx }) => {
    const filled = idx <= (hovered || rating);
    return (
      <motion.img
        whileHover={{ scale: 1.15 }}
        src={filled ? "/svgs/star.svg" : "/svgs/star_empty.svg"}
        width={20}
        height={20}
        className="cursor-pointer"
        onMouseEnter={() => setHovered(idx)}
        onMouseLeave={() => setHovered(0)}
        onClick={() => setRating(idx)}
        alt={`${idx} star`}
      />
    );
  };
  /* ---------- UI helpers ---------- */
  const Option = ({ value, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      onClick={() => setMode(value)}
      className={`px-6 py-3 rounded-2xl font-myfont text-xl border-2 transition-all
        ${
          mode === value
            ? "bg-blue-500 text-white border-blue-500"
            : "border-blue-400 text-blue-500 hover:bg-blue-200"
        }`}
    >
      {label}
    </motion.button>
  );

  useEffect(() => {
    console.log("avatar called");
    fetchCommunityInfo();
    console.log("fdasfsda", communityProfile);
  }, []);

  return (
    <div className="relative h-screen w-full ">
      <Navbar
        communityProfile={communityProfile}
        clickSideMenu={clickSideMenu}
      />

      <div className="absolute right-2 mt-1 w-[200px]">
        {toggleSideMenu && (
          <Sidemenu
            clickMyprofile={clickMyprofile}
            setToggleMyposts={setToggleMyposts}
          />
        )}
      </div>
      {toggleEditProfile && (
        <EditProfile
          clickMyprofile={clickMyprofile}
          communityProfile={communityProfile}
          csrfToken={csrfToken}
          fetchCommunityInfo={fetchCommunityInfo}
          setToggleEditProfile={setToggleEditProfile}
        />
      )}
      {/* choose category */}
      <div className="items-center flex flex-col">
        <div className="mt-12 flex gap-6">
          <Option value="review" label="리뷰 쓰기" />
          <Option value="share" label="나눔 글쓰기" />
          <Option value="fun" label="소통 글쓰기" />
        </div>
        {mode && (
          <div className="w-1/2 mt-12 flex flex-col gap-6">
            {mode === "review" && (
              <>
                {" "}
                <div className="flex flex-row items-center">
                  <h className="font-myfont mr-3 mt-2">별점</h>
                  <div className="flex items-center gap-2 ">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} idx={i} />
                    ))}
                  </div>
                </div>
                <div>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="내용"
                    rows={10}
                    className="w-full border border-blue-400 rounded-xl text-lg p-4 resize-none focus:outline-blue-400 shadow shadow-md"
                  />
                </div>
              </>
            )}{" "}
            {mode === "share" && (
              <>
                {" "}
                <div className="flex justify-start">
                  <KoreanAmericanSelector
                    selectedCounty={selectedCounty}
                    selectedState={selectedState}
                    setSelectedCounty={setSelectedCounty}
                    setSelectedState={setSelectedState}
                  />
                </div>
                <input
                  value={sharetitle}
                  onChange={(e) => handleSharetitle(e.target.value)}
                  placeholder="제목"
                  className="w-full border border-blue-400 rounded-xl p-3  text-xl focus:outline-blue-400"
                />
                <textarea
                  value={sharebody}
                  onChange={(e) => setSharebody(e.target.value)}
                  placeholder="내용"
                  rows={10}
                  className="w-full border border-blue-400 rounded-xl text-lg p-4 resize-none  focus:outline-blue-400"
                />
              </>
            )}
            {mode === "fun" && (
              <>
                <Funselector
                  funcategory={funcategory}
                  setFuncategory={setFuncategory}
                  selectedCounty={selectedCounty}
                  selectedState={selectedState}
                  setSelectedCounty={setSelectedCounty}
                  setSelectedState={setSelectedState}
                  meetupcategory={meetupcategory}
                  setMeetupcategory={setMeetupcategory}
                  restAddress={restAddress}
                  setrestAddress={setrestAddress}
                />
                {funcategory === "food" ? (
                  <div className="flex flex-col gap-4">
                    <input
                      value={funtitle}
                      onChange={(e) => setFuntitle(e.target.value)}
                      placeholder="가게 이름"
                      className="w-full border border-blue-400 rounded-xl p-3 text-lg focus:outline-blue-400"
                    />
                    <input
                      placeholder="가게 주소"
                      value={restAddress}
                      onChange={(e) => setrestAddress(e.target.value)}
                      className="w-full border border-blue-400 rounded-xl p-3  text-lg focus:outline-blue-400"
                    />
                  </div>
                ) : (
                  <input
                    value={funtitle}
                    onChange={(e) => setFuntitle(e.target.value)}
                    placeholder="제목"
                    className="w-full border border-blue-400 rounded-xl p-3  text-xl focus:outline-blue-400"
                  />
                )}

                <textarea
                  value={funbody}
                  onChange={(e) => setFunbody(e.target.value)}
                  placeholder="내용"
                  rows={10}
                  className="w-full border border-blue-400 rounded-xl text-lg p-4 resize-none  focus:outline-blue-400"
                />
              </>
            )}
            {/* image upload */}
            <div>
              <label className="font-myfont ml-2">
                이미지 첨부&nbsp;
                <span className="text-xs text-gray-400">
                  (.png .jpeg .jpg)(최대 {MAX_FILES})
                </span>
              </label>
              <div>
                {/* Hidden native input */}
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/png, image/jpg, image/jpeg"
                  multiple
                  onChange={onFileChange}
                  className="hidden"
                />

                {/* Custom label styled like a button */}
                <label
                  htmlFor="fileUpload"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded rounded-full cursor-pointer mt-2 hover:bg-blue-700 "
                >
                  이미지 업로드
                </label>
              </div>

              {err && <p className="text-red-500 text-sm mt-1">{err}</p>}

              {/* previews */}
              <div className="flex flex-wrap gap-4 mt-4">
                {files.map((f, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(f)}
                      className="w-[240px] h-[240px] object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute -top-0 -right-0 bg-transparent text-white rounded-full w-6 h-6 text-md"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* actions */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setMode(null);
                  setTitle("");
                  setBody("");
                  setFiles([]);
                }}
                className="px-6 py-2 rounded-xl border border-gray-400 text-gray-600 hover:bg-gray-100 mb-10"
              >
                취소
              </button>
              <button
                disabled={sending}
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 mb-10"
              >
                {sending ? "전송 중…" : "등록"}
              </button>
            </div>
          </div>
        )}{" "}
      </div>
      {toggleMyposts && (
        <Myposts csrfToken={csrfToken} setToggleMyposts={setToggleMyposts} />
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
        <button
          className=" px-4 mt-4 hover:text-blue-500"
          onClick={() => {
            router.push("/community/review");
          }}
        >
          리뷰
        </button>
        <button className=" px-4 mt-4">나눔</button>
        <button
          className=" px-4 mt-4 hover:text-blue-500"
          onClick={() => {
            router.push("/community/funpost");
          }}
        >
          소통
        </button>
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
              src={communityProfile.avatar}
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

const Sidemenu = ({ clickMyprofile, setToggleMyposts }) => {
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

        <button
          className="hover:text-blue-500 ml-3"
          onClick={() => setToggleMyposts(true)}
        >
          내가 쓴 글
        </button>
      </div>
    </div>
  );
};

const EditProfile = ({
  setToggleEditProfile,
  communityProfile,
  csrfToken,
  fetchCommunityInfo,
}) => {
  const [nickname, setnickname] = useState("");

  const router = useRouter();

  const [state, setstate] = useState("");
  const [county, setcounty] = useState("");
  const [fullAddress, setfullAddress] = useState("");
  const addressList = [
    {
      state: "AZ",
      counties: ["Maricopa", "Pima", "Pinal", "Yavapai", "Coconino"],
    },
    {
      state: "CA",
      counties: [
        "Los Angeles",
        "Orange",
        "Santa Clara",
        "San Diego",
        "San Francisco",
        "Alameda",
        "Riverside",
        "San Bernardino",
      ],
    },
    {
      state: "CO",
      counties: ["Denver", "Arapahoe", "Jefferson", "Adams", "Douglas"],
    },
    {
      state: "FL",
      counties: [
        "Broward",
        "Miami-Dade",
        "Orange",
        "Hillsborough",
        "Palm Beach",
      ],
    },
    {
      state: "GA",
      counties: ["Gwinnett", "Fulton", "DeKalb", "Cobb", "Clayton"],
    },
    {
      state: "HI",
      counties: ["Honolulu", "Hawaii", "Maui", "Kauai", "Kalawao"],
    },
    { state: "IL", counties: ["Cook", "DuPage", "Lake", "Will", "Kane"] },
    {
      state: "MA",
      counties: ["Middlesex", "Suffolk", "Norfolk", "Essex", "Worcester"],
    },
    {
      state: "MD",
      counties: [
        "Montgomery",
        "Howard",
        "Baltimore",
        "Anne Arundel",
        "Prince George's",
      ],
    },
    {
      state: "MI",
      counties: ["Wayne", "Oakland", "Macomb", "Washtenaw", "Kent"],
    },
    {
      state: "MN",
      counties: ["Hennepin", "Ramsey", "Dakota", "Anoka", "Washington"],
    },
    {
      state: "NC",
      counties: ["Wake", "Mecklenburg", "Guilford", "Durham", "Forsyth"],
    },
    {
      state: "NJ",
      counties: [
        "Bergen",
        "Middlesex",
        "Hudson",
        "Essex",
        "Morris",
        "Union",
        "Passaic",
        "Somerset",
      ],
    },
    {
      state: "NV",
      counties: ["Clark", "Washoe", "Carson City", "Douglas", "Elko"],
    },
    {
      state: "NY",
      counties: [
        "Queens",
        "New York (Manhattan)",
        "Nassau",
        "Kings (Brooklyn)",
        "Westchester",
        "Suffolk",
        "Rockland",
        "Erie",
      ],
    },
    {
      state: "OH",
      counties: ["Cuyahoga", "Franklin", "Hamilton", "Montgomery", "Summit"],
    },
    {
      state: "PA",
      counties: [
        "Philadelphia",
        "Montgomery",
        "Allegheny",
        "Bucks",
        "Delaware",
      ],
    },
    {
      state: "TX",
      counties: [
        "Harris",
        "Dallas",
        "Travis",
        "Tarrant",
        "Collin",
        "Bexar",
        "Fort Bend",
        "Williamson",
      ],
    },
    {
      state: "VA",
      counties: [
        "Fairfax",
        "Loudoun",
        "Arlington",
        "Prince William",
        "Alexandria",
      ],
    },
    {
      state: "WA",
      counties: ["King", "Pierce", "Snohomish", "Clark", "Thurston"],
    },
  ];

  const [addressModal, setAddressModal] = useState(false);
  const [targetcounties, setTargetcounties] = useState();
  const [hover, setHover] = useState(false);
  const [verifiedNickname, setVerifiedNickname] = useState("");
  const [verifyNicknameClicked, setVerfiedNicknameClicked] = useState(false);
  const [likeModal, setlikeModal] = useState(false);

  const editProfileSubmit = async () => {
    console.log("submitted!");
    if (verifiedNickname !== "ok" && nickname !== communityProfile.nickname) {
      alert("닉네임 중복을 확인해주세요");
      return;
    }
    const response = await apiFetch("/api/community/update_profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        nickname: nickname,
        address: fullAddress,
      }),
    });
    if (response.ok) {
      alert("정보가 업데이트 되었어요");
      setToggleEditProfile(false);
      fetchCommunityInfo();
    }
  };

  const clickStates = (e) => {
    if (e !== "") {
      const target = addressList.find((item) => item.state === e);
      setTargetcounties(target);
      setstate(e);
      //setAddressModal(false);
    }
  };
  const clickCounty = (e) => {
    if (e !== "") {
      setcounty(e);

      setAddressModal(false);
    }
  };
  const changeNickname = (e) => {
    setVerfiedNicknameClicked(false);
    if (e.length > 11) {
      alert("닉네임은 최대 11글자까지만 가능해요");
    } else {
      setnickname(e);
    }
  };

  const validateNickname = async (e) => {
    setVerfiedNicknameClicked(true);
    const response = await apiFetch("/api/validate_nickname/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
      body: JSON.stringify({
        nickname: nickname,
      }),
    });
    console.log(response);
    const data = await response.json();
    if (data["result"]) {
      setVerifiedNickname("ok");
    } else {
      setVerifiedNickname("no");
    }
  };
  useEffect(() => {
    setfullAddress(communityProfile.address);
    setnickname(communityProfile.nickname);
    console.log("comad", communityProfile);
  }, []);

  useEffect(() => {
    if (county !== "") {
      const address = county + ", " + state;
      setfullAddress(address);
      setstate("");
    }
  }, [county]);
  useEffect(() => {
    console.log("targetcounties", targetcounties);
  }, [targetcounties]);
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
                <div className="border border-blue-500 h-8 rounded-2xl text-center flex relative">
                  <input
                    type="nickname"
                    value={nickname}
                    onChange={(e) => changeNickname(e.target.value)}
                    placeholder="닉네임"
                    className="py-full rounded-2xl w-full text-center"
                  />{" "}
                  {nickname !== "" &&
                    nickname !== communityProfile?.nickname && (
                      <div className="flex justify-center items-center absolute right-[-55px] top-[4px]">
                        <button
                          className="rounded-full px-[5px] text-sm bg-white border shadow-sm hover:bg-gray-50"
                          value={nickname}
                          onClick={(e) => {
                            validateNickname(e.target.value);
                          }}
                        >
                          {!verifyNicknameClicked ? (
                            <div>확인</div>
                          ) : (
                            <>
                              {verifiedNickname === "ok" ? (
                                <div>👍</div>
                              ) : (
                                <p className="text-black">사용중</p>
                              )}
                            </>
                          )}
                        </button>
                      </div>
                    )}
                </div>{" "}
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1">사는 곳</label>
                <div className="relative">
                  <input
                    type="address"
                    readOnly
                    placeholder="지역을 알려주세요"
                    value={fullAddress}
                    onClick={() => {
                      addressModal
                        ? setAddressModal(false)
                        : setAddressModal(true);
                    }}
                    className="border border-blue-500 h-8 rounded-2xl p-2 text-center w-full cursor-pointer"
                  />

                  {addressModal && (
                    <div className="absolute z-10 mt-12 w-full rounded rounded-xl border border-blue-500  bg-white shadow py-4">
                      <div className="w-full max-h-[200px] overflow-y-auto">
                        {state === "" &&
                          addressList.map((obj, idx) => (
                            <div className="w-full" key={idx}>
                              <button
                                key={idx}
                                onClick={(e) => {
                                  clickStates(e.target.value);
                                }}
                                className=" rounded rounded-full text-center hover:bg-gray-50 w-full"
                                value={obj.state}
                              >
                                {obj.state}
                              </button>
                            </div>
                          ))}
                        {state !== "" &&
                          targetcounties?.counties?.map((obj, idx) => (
                            <div className="w-full" key={idx}>
                              <button
                                key={idx}
                                value={obj}
                                onClick={(e) => {
                                  clickCounty(e.target.value);
                                }}
                                className=" rounded rounded-full text-center hover:bg-blue-50 w-full"
                              >
                                {obj}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <h className="mb-1">인기도</h>

                {/* blue border “likes” bar */}
                <div className="relative border border-blue-500 h-8 rounded-2xl flex items-center justify-between ">
                  <span className="ml-3">‎ </span>
                  <span>{communityProfile?.likes}</span>{" "}
                  <span
                    className="text-[8px] mr-3 cursor-pointer"
                    onClick={() => setlikeModal(!likeModal)}
                  >
                    ▼
                  </span>
                </div>

                {/* scrollable avatar column */}
                {likeModal && (
                  <div className="absolute top-[530px] w-[180px] max-h-48 overflow-y-auto flex flex-col space-y-1 ">
                    {communityProfile?.liked_users_avatar?.map((src, idx) => (
                      <div
                        key={idx}
                        className="flex flex-row items-center hover:bg-gray-200 border border-rounded rounded-full cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/community/usrprofile?usr=${communityProfile?.liked_users_nickname[idx]}`
                          )
                        }
                      >
                        {" "}
                        <img
                          key={idx}
                          src={src}
                          alt="liked user"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                        <span className="text-gray-500 ml-2">
                          {communityProfile?.liked_users_nickname[idx]}
                        </span>
                      </div>
                    ))}{" "}
                  </div>
                )}
              </div>
            </div>
            <img
              src={communityProfile.avatar}
              width={350}
              height={350}
              className="mx-auto object-contain"
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
          <div className="space-x-4 flex justify-end mt-[100px] mr-4 ">
            <button
              onClick={() => setToggleEditProfile(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              취소
            </button>
            <button
              onClick={() => editProfileSubmit()}
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

const KoreanAmericanSelector = ({
  selectedCounty,
  selectedState,
  setSelectedCounty,
  setSelectedState,
}) => {
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCounty(""); // reset county when state changes
  };

  const handleCountyChange = (e) => setSelectedCounty(e.target.value);
  const stateCountyData = {
    California: ["Los Angeles County", "Orange County", "Santa Clara County"],
    "New York": ["Queens County", "Nassau County", "New York County"],
    Texas: ["Harris County", "Dallas County", "Tarrant County"],
    "New Jersey": ["Bergen County", "Middlesex County", "Hudson County"],
    Illinois: ["Cook County", "Lake County", "DuPage County"],
  };
  return (
    <div className="w-full max-w-lg mx-auto  p-6 bg-white rounded-xl space-y-6 shadow shadow-lg border">
      {/* State dropdown */}
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          지역을 알려주세요
        </label>
        <select
          id="state"
          name="state"
          value={selectedState}
          onChange={handleStateChange}
          className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-700"
        >
          {Object.keys(stateCountyData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* County radio buttons */}
      {selectedState && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            카운티를 선택해주세요
            <span className="font-semibold"></span>
          </p>
          <div className="flex flex-wrap gap-3">
            {stateCountyData &&
              stateCountyData[selectedState].map((county) => (
                <label key={county} className="cursor-pointer">
                  <input
                    type="radio"
                    name="county"
                    value={county}
                    checked={selectedCounty === county}
                    onChange={handleCountyChange}
                    className="peer sr-only"
                  />
                  <span className="px-4 py-2 rounded-full border border-gray-300 text-sm transition peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600">
                    {county}
                  </span>
                </label>
              ))}
          </div>
        </div>
      )}

      {/* Display selection */}
      {selectedState && selectedCounty && (
        <div className="text-sm text-gray-700">
          지역:{" "}
          <span className="font-semibold">
            {selectedCounty}, {selectedState}
          </span>
        </div>
      )}
    </div>
  );
};

const categories = [
  { key: "food", label: "맛집", emoji: "🍽️" },
  { key: "meetup", label: "모임", emoji: "🤝" },
  { key: "chat", label: "랜선수다", emoji: "💬" },
];

const meetupCategorylist = ["스포츠", "여행", "음식", "게임", "학교"];

function Funselector({
  funcategory,
  setFuncategory,
  selectedCounty,
  setSelectedCounty,
  selectedState,
  setSelectedState,
  meetupcategory,
  setMeetupcategory,
}) {
  return (
    <div>
      <div className="flex flex-row gap-12 justify-center w-full max-w-2xl mx-auto py-6  p-4 items-center">
        {categories.map((cat) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={cat.key}
            onClick={(e) => setFuncategory(cat.key)}
            className={`flex flex-col items-center justify-center w-full py-8 rounded-2xl border shadow transition select-none cursor-pointer
            ${funcategory === cat.key ? "bg-blue-300 text-white" : "bg-white hover:bg-blue-50"}
          `}
          >
            <span className="text-4xl mb-2" role="img" aria-label={cat.label}>
              {cat.emoji}
            </span>
            <span className="text-sm font-medium tracking-wide text-gray-700">
              {cat.label}
            </span>
          </motion.button>
        ))}
      </div>
      {funcategory == "food" && <></>}

      {funcategory === "meetup" && (
        <KoreanAmericanSelector
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}
      {funcategory === "meetup" && selectedCounty !== "" && (
        <div className="w-full max-w-lg mx-auto  p-6 bg-white rounded-xl space-y-6 shadow shadow-lg gap-4 border mt-4">
          <div className="">
            <h className="text-sm">어떤 모임인가요?</h>
          </div>
          <div className="flex justify-center items-center gap-4">
            {meetupCategorylist.map((category, index) => (
              <button
                className={`border rounded rounded-full px-4 py-1 ${meetupcategory === category ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-50"}`}
                onClick={() => setMeetupcategory(category)}
                key={index}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Myposts = ({ posts, csrfToken, setToggleMyposts }) => {
  const [myposts, setmyposts] = useState([]);

  const router = useRouter();
  const fetchMyposts = async () => {
    const res = await apiFetch("/api/posts/get_my_posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });

    const data = await res.json();
    setmyposts(data["results"]);
  };
  useEffect(() => {
    fetchMyposts();
    console.log("mypost", myposts);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="relative bg-white w-2/3 h-[70vh] p-8 rounded-xl shadow-xl">
        <div className="h-[50vh] overflow-y-auto flex flex-col">
          {myposts?.map((mypost, index) => (
            <div key={index}>
              <div>
                <button className="border rounded rounded-full overflow-y-auto p-2 mb-1 hover:bg-gray-100 w-full">
                  <div className="flex flex-row justify-between items-center">
                    <p
                      className="text-left ml-4"
                      onClick={() => router.push(`funpost/${mypost.slug}`)}
                    >
                      {mypost.title}
                    </p>
                    <p className="text-xs mr-2 ">
                      {"["}11{"]"}
                    </p>
                  </div>
                </button>
              </div>
              <div className="w-full rounded ml-4"></div>
              <div className="flex flex-row justify-end mb-4">
                {" "}
                {mypost.post_like.liked_avatars.length !== 0 ? (
                  <span className="text-xs flex items-center mr-2">좋아요</span>
                ) : (
                  <>‎ </>
                )}
                {mypost?.post_like?.liked_avatars.map((obj, i) => (
                  <>
                    <button key={i}>
                      <img
                        src={obj}
                        width={30}
                        height={30}
                        className="rounded rounded-full border shadow mr-1 opacity-80 hover:opacity-100"
                        onClick={() =>
                          router.push(
                            `/community/usrprofile?usr=${mypost?.post_like?.liked_nickname[i]}`
                          )
                        }
                      ></img>
                    </button>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-4 bottom-12 ">
          <div className="space-x-4 flex justify-end mt-[100px] mr-4">
            <button
              onClick={() => setToggleMyposts(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

