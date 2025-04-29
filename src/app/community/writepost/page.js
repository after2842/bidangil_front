/* app/community/write/page.js */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";

const MAX_FILES = 5;

export default function WritePost() {
  const { fetchCsrfToken } = useUser();
  const router = useRouter();

  const [mode, setMode] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]); // <— array of File
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [rating, setRating] = useState(0); // 0–5
  const [hovered, setHovered] = useState(0); // 마우스 올렸을 때 미리보기
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
    if (!mode || (!title.trim() && !rating) || !body.trim()) {
      alert("모든 정보를 입력해주세요");
      return;
    }
    setSending(true);
    const csrf = await fetchCsrfToken();

    const fd = new FormData();
    if (mode === "review") {
      fd.append("category", mode);
      fd.append("title", rating.toString());
      fd.append("content", body);
    } else {
      fd.append("category", mode);
      fd.append("title", title);
      fd.append("content", body);
    }

    files.forEach((file, idx) => fd.append(`image_${idx}`, file));
    console.log("FormData being sent:");
    for (let pair of fd.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const res = await fetch("http://localhost:8000/api/community/post/", {
      method: "POST",
      credentials: "include",
      headers: { "X-csrftoken": csrf }, // DON’T set Content-Type
      body: fd,
    });
    const result = await res.json();
    if (res.ok) {
      alert("✅ 작성 완료!");
      router.push("/community/review");
    } else {
      console.error(result);
      alert("❌ 전송 실패");
    }
    setSending(false);
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
            : "border-blue-400 text-blue-500 hover:bg-blue-100"
        }`}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-[#222]">
      <h1 className="mt-10 font-myfont text-3xl">글 쓰기</h1>

      {/* choose category */}
      <div className="mt-12 flex gap-6">
        <Option value="review" label="리뷰 쓰기" />
        <Option value="share" label="나눔 글쓰기" />
        <Option value="fun" label="재미 게시물" />
      </div>

      {mode && (
        <div className="w-1/2 mt-12 flex flex-col gap-6">
          {mode === "review" ? (
            <div className="flex flex-row items-center">
              <h className="font-myfont mr-3 mt-2">별점</h>
              <div className="flex items-center gap-2 ">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} idx={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {" "}
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                className="w-full border border-blue-400 rounded-xl p-3  text-xl focus:outline-blue-400"
              />
            </>
          )}

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="내용"
            rows={10}
            className="w-full border border-blue-400 rounded-xl text-lg p-4 resize-none  focus:outline-blue-400"
          />

          {/* image upload */}
          <div>
            <label className="font-myfont">
              이미지 첨부&nbsp;
              <span className="text-xs text-gray-400">
                (.png .jpeg .jpg)(최대 {MAX_FILES})
              </span>
            </label>
            <input
              type="file"
              accept="image/png"
              multiple
              onChange={onFileChange}
              className="mt-2 block"
            />
            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}

            {/* previews */}
            <div className="flex flex-wrap gap-4 mt-4">
              {files.map((f, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(f)}
                    className="w-[120px] h-[120px] object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
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
      )}
    </div>
  );
}
