"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const exbody =
  "한국 순수문학의 절정과도 같다고 평가받는다. 특히 '자기가 죽거든 자기 입던 옷을 꼭 그대로 입혀서 묻어 달라고…….'로 끝나는 소설의 결미는, 단연코 단편의 미덕이자 정수라고 일컬어진다. 청자의 반응을 완전히 배제시키고, 결말 이후를 온전히 독자의 상상과 심정에 맡기며 등장인물과 동일시되도록 서술한 이 기법은 순수문학에서 작가세계를 경험하는 외부인으로서 치부되어 왔던 독자의 관념을 완전히 뒤바꾸고, 독자가 온전히 세계를 사유할 수 있도록 했다.그러한 관점에서 소설의 결미는 작가 본인이 차라리 내 목을, 탈 등을 포함하여 여러 전위적인 작품과 실험적 연구, 한국 최초로 가로쓰기를 시도했던 것을 생각해 본다면, 순수문학의 의의를 새롭게 해보려한 작가의 의도가 여실히 드러나는 부분이다.소녀가 도시에서 왔고, 소년은 촌 사람임을 감안해본다면 모더니즘자연과 도시의 조화로 구분지어질 수도 있고, 소녀의 가문이 대가 끊겼다는 부분에서는 세대 또는 한 시대의 몰락 등으로 다양한 해석이 가능하다.65년째 한국 교과서에 수록되어 있는 작품으로서, 국민 단편소설로 꼽힌다.달밤, 운수 좋은 날, 무진기행 등 명작들이 즐비한 한국 문학사에서 소나기가 차지하는 비중은 그다지 크지 않지만, 문단의 거목인 작가 황순원의 초기작품을 논할 때 별, 독 짓는 늙은이와 함께 반드시 거론되는 작품이며, 순수문학의 정수와도 같은 작품이기에 한국 단편문학에서 완결성을 점할 때 순위권에서 자주 보이는 작품이다.";
/* ---------- Dummy post data ---------- */
const post = {
  title: "황순원의 무진기행",
  body: exbody,
  images: [
    "https://bidangilimage.s3.us-west-1.amazonaws.com/posts/023068b4-d0c0-410e-8b8b-da5017c53386.png",
    "https://bidangilimage.s3.us-west-1.amazonaws.com/posts/3ddc1548-5394-4bb3-a5e9-ae55f40da01e.jpeg",
    "https://bidangilimage.s3.us-west-1.amazonaws.com/posts/e5f355e0-d616-4eb4-bf4a-058d0de92e9e.jpeg",
    "https://bidangilimage.s3.us-west-1.amazonaws.com/posts/7d0f0f81-1265-4357-a5c6-1a446f1951fa.jpeg",
    "https://bidangilimage.s3.us-west-1.amazonaws.com/posts/d0cc07cd-d727-413d-9cc0-f5889c6f0f3d.jpeg",
  ],
};

export default function PostPage() {
  const { fetchCommunityInfo, communityProfile } = useUser();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);
  const [togglecommnet, setTogglecomment] = useState(false);
  const fetchPost = async () => {
    const res = await apiFetch("/api/community/post/", {
      method: "POST",
      credentials: "include",
      headers: { "X-csrftoken": csrf }, // DON’T set Content-Type
      body: fd,
    });
    const result = await res.json();
  };
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
  useEffect(() => {
    fetchCommunityInfo();
  }, []);

  /* ----- comment state ----- */
  const [comments, setComments] = useState([]);
  const [newTopComment, setNewTopComment] = useState("");

  /* ----- image modal state ----- */
  const [modalIdx, setModalIdx] = useState(null); // null = closed

  /* ---------- helpers ---------- */
  const addComment = (text, parentId = null, depth = 1) => {
    if (!text.trim()) return;

    const addRec = (nodes) =>
      nodes.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              { id: Date.now(), text, depth, upvotes: 0, replies: [] },
            ],
          };
        }
        return { ...c, replies: addRec(c.replies) };
      });

    if (parentId === null) {
      setComments([
        { id: Date.now(), text, depth: 1, upvotes: 0, replies: [] },
        ...comments,
      ]);
    } else {
      setComments(addRec(comments));
    }
  };

  const upvoteComment = (id) => {
    const upRec = (nodes) =>
      nodes.map((c) =>
        c.id === id
          ? { ...c, upvotes: c.upvotes + 1 }
          : { ...c, replies: upRec(c.replies) }
      );
    setComments(upRec(comments));
  };

  /* ---------- JSX ---------- */
  return (
    <div>
      <Navbar
        communityProfile={communityProfile}
        clickSideMenu={clickSideMenu}
      />
      <div className="absolute right-2 mt-1 w-[200px]">
        {toggleSideMenu && <Sidemenu clickMyprofile={clickMyprofile} />}
      </div>
      {toggleEditProfile && (
        <EditProfile
          clickMyprofile={clickMyprofile}
          communityProfile={communityProfile}
        />
      )}{" "}
      {modalIdx !== null && (
        <ImageModal
          images={post.images}
          idx={modalIdx}
          setIdx={setModalIdx}
          onClose={() => setModalIdx(null)}
        />
      )}
      <div className="max-w-4xl mx-auto p-6 space-y-6 mt-24">
        {/* Post */}
        <div className="space-y-4 border-b pb-6">
          <h1 className="text-3xl font-bold text-center">{post.title}</h1>
          <p>{post.body}</p>

          {/* Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {post.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Post ${idx}`}
                className="rounded-lg cursor-pointer object-cover h-full w-full"
                onClick={() => setModalIdx(idx)}
              />
            ))}
          </div>
        </div>

        {/* New top-level comment */}
        <div>
          {!togglecommnet ? (
            <button
              className="w-full border rounded rounded-full mb-2 py-2 hover:bg-gray-100"
              onClick={() => setTogglecomment(true)}
            >
              <p className="text-gray-500">이야기를 남겨주세요</p>
            </button>
          ) : (
            <>
              <div className="relative w-full">
                <textarea
                  className="w-full resize-none p-2 pr-16 pb-10 rounded"
                  placeholder="시작하기"
                  value={newTopComment}
                  onChange={(e) => setNewTopComment(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "100px";
                    e.target.style.height = `${e.target.scrollHeight + 10}px`;
                  }}
                />

                {/* Absolutely positioned inside the textarea container */}
                <div className="absolute bottom-[11px] right-1">
                  <button
                    className="text-black px-3 py-1 border rounded-full bg-white hover:text-blue-500 text-sm"
                    onClick={() => {
                      addComment(newTopComment);
                      setNewTopComment("");
                    }}
                  >
                    완료
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Comment tree */}
        <section className="space-y-4">
          {comments.map((c) => (
            <CommentNode
              key={c.id}
              node={c}
              addComment={addComment}
              upvoteComment={upvoteComment}
            />
          ))}
        </section>

        {/* ---------- Image Modal ---------- */}
      </div>
    </div>
  );
}

/* ---------- Recursive comment node ---------- */
function CommentNode({ node, addComment, upvoteComment }) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="relative">
      {/* L-shape connector */}
      {node.depth > 1 && (
        <>
          {/* vertical */}
          <span className="absolute -left-3 top-0 h-full "></span>
          {/* horizontal */}
          <span className="absolute -left-3 top-4 w-3 border-t-2 border-gray-300"></span>
        </>
      )}

      <div className="border p-4 rounded space-y-2 ml-4">
        <p className="text-sm whitespace-pre-line">{node.text}</p>

        {/* Action row */}
        <div className="flex gap-4 text-xs text-blue-600">
          {node.depth < 4 && (
            <button onClick={() => setShowReply(!showReply)}>답글</button>
          )}
          <button onClick={() => upvoteComment(node.id)}>
            추천&nbsp;({node.upvotes})
          </button>
        </div>

        {/* Reply input */}
        {showReply && node.depth < 4 && (
          <div className="mt-2 flex gap-2 text-sm">
            <input
              className="border rounded px-2 py-1 flex-1"
              placeholder="멋진 답글"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="text-blue-600"
              onClick={() => {
                addComment(replyText, node.id, node.depth + 1);
                setReplyText("");
                setShowReply(false);
              }}
            >
              완료
            </button>
          </div>
        )}

        {/* Child replies */}
        {node.replies.length > 0 && (
          <div className="mt-2 space-y-2">
            {node.replies.map((r) => (
              <CommentNode
                key={r.id}
                node={r}
                addComment={addComment}
                upvoteComment={upvoteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageModal({ images, idx, setIdx, onClose }) {
  /* ───────── disable body scroll while modal is open ───────── */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll

    return () => (document.body.style.overflow = original); // restore
  }, []);

  /* ───────── helpers ───────── */
  const pairLen = images.length; // total count
  const next = () => setIdx((idx + 2) % pairLen);
  const prev = () => setIdx((idx - 2 + pairLen) % pairLen);

  // compute indices for the second image (wrap safely)
  const secondIdx = (idx + 1) % pairLen;

  /* ───────── JSX ───────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* close × */}
      <button
        className="absolute top-4 right-6 text-white text-opacity-20 text-3xl hover:text-opacity-100"
        onClick={onClose}
      >
        ×
      </button>

      {/* prev ‹ */}
      <button
        className="absolute left-10 text-white text-5xl select-none text-opacity-50 hover:text-opacity-100"
        onClick={prev}
      >
        ‹
      </button>

      {/* image pair */}
      <div className="flex gap-4 overflow-hidden">
        <img
          src={images[idx]}
          alt={`image ${idx}`}
          className="max-h-[80vh] max-w-[45vw] rounded shadow-lg object-contain"
        />
        <img
          src={images[secondIdx]}
          alt={`image ${secondIdx}`}
          className="max-h-[80vh] max-w-[45vw] rounded shadow-lg object-contain"
        />
      </div>

      {/* next › */}
      <button
        className="absolute right-10 text-white text-5xl select-none text-opacity-50 hover:text-opacity-100"
        onClick={next}
      >
        ›
      </button>
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
          onClick={() => router.push("/community/review")}
        >
          리뷰
        </button>
        <button className=" px-4 mt-4 text-blue-500">이야기</button>
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
            className="rounded-full shadow shadow-md"
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
