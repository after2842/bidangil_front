"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function Community({ searchParams }) {
  const { fetchCommunityInfo, communityProfile, csrfToken } = useUser();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);
  const page = Number(searchParams.page ?? 1);
  const perPage = 12; // posts per page
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [hasNext, setHasNext] = useState(true);
  const [toggleMyposts, setToggleMyposts] = useState(false);
  async function loadPage() {
    const res = await apiFetch(
      `/api/get_reviews/?page=${page}&size=${perPage}`
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("Server returned", res.status, text);
      alert("요청 실패 (" + res.status + ")");
      return;
    }
    const json = await res.json(); //parse

    setReviews(json.results); // first page replaces
    setTotalPages(Number(json.total_pages) + 1);

    setHasNext(json.has_next);
  }
  useEffect(() => {
    console.log("avatar called");
    fetchCommunityInfo();
    loadPage();
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
            <Review reviews={reviews} page={page} totalPages={totalPages} />
          </div>
          <div className="absolute right-2 mt-1 w-[200px]">
            {toggleSideMenu && (
              <Sidemenu
                clickMyprofile={clickMyprofile}
                setToggleMyposts={setToggleMyposts}
              />
            )}
          </div>
        </div>
      </div>
      <Paginator page={page} totalPages={totalPages} />
      {toggleEditProfile && (
        <EditProfile
          clickMyprofile={clickMyprofile}
          communityProfile={communityProfile}
          setToggleEditProfile={setToggleEditProfile}
          csrfToken={csrfToken}
          fetchCommunityInfo={fetchCommunityInfo}
        />
      )}
      {toggleMyposts && (
        <Myposts csrfToken={csrfToken} setToggleMyposts={setToggleMyposts} />
      )}
    </div>
  );
}
function Paginator({ page, totalPages }) {
  const router = useRouter();
  return (
    <div className="mt-8 flex justify-center items-center gap-2 text-sm  pb-16">
      {[...Array(totalPages)].map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => router.push(`/community/review?page=${p}`)}
            className={`px-3 py-1 rounded rounded-full ${
              p === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        );
      })}
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
          className=" px-4 mt-4 text-blue-500"
          onClick={() => router.push("/community/review")}
        >
          리뷰
        </button>
        <button
          className=" px-4 mt-4 hover:text-blue-500"
          onClick={() => router.push("/community/funpost")}
        >
          이야기
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
        {communityProfile?.avatar ? (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "blue-50" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full shadow shadow-md"
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
        ) : (
          <button
            className="text-xl font-myfont mr-4 hover:text-blue-500"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
        )}{" "}
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

const Review = ({ reviews, page, totalPages }) => {
  const handleNext = () => {
    if (hasNext) loadPage(page + 1);
  };

  return (
    <div>
      {reviews &&
        reviews.map((review, i) => <ReviewCard reviewData={review} key={i} />)}
    </div>
  );
};

const ReviewCard = ({ reviewData }) => {
  const rating = Number(reviewData.title); //title = rating in reviews categories
  const content = reviewData.content;
  const images = reviewData.images;
  const nickname = reviewData.user_nickname;
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
              {Array.from({ length: rating }).map((_, i) => (
                <Image
                  src="/svgs/star.svg"
                  width={20}
                  height={20}
                  alt="star"
                  key={i}
                />
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
          images.map((image, index) => (
            <img
              src={image.image_url}
              width={200}
              height={200}
              className="mr-4"
              alt="usr_image"
              key={index}
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
                <button
                  key={index}
                  className="border rounded rounded-full overflow-y-auto p-2 mb-1 hover:bg-gray-100 w-full"
                >
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
