"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiFetch, wsUrl } from "@/lib/api";
export default function Createavatar() {
  const router = useRouter();
  const [page, setpage] = useState(1);
  const [answer, setAnswer] = useState([]);
  const { fetchCsrfToken } = useUser();
  const [avatarUrl, setavatarUrl] = useState("");
  const answerClicked = (value) => {
    const newAnswer = [...answer];
    newAnswer[page - 1] = value;
    setAnswer(newAnswer);
  };
  // personalityMap[질문번호][선택지-1] → 단어
  const personalityMap = {
    1: [
      "내향·휴식형", // Q1-1  집에 콕 ― 휴식으로 충전
      "즉흥·모험형", // Q1-2  무계획 외출 ― 새로운 자극 선호
      "사교·친화형", // Q1-3  사람 만남 ― 에너지 얻는 타입
      "체계·계획형",
    ], // Q1-4  체크리스트 실행 ― 계획적

    2: [
      "즉시행동형", // Q2-1  바로 짐 싼다
      "신중도전형", // Q2-2  망설이다가 출발
      "안정지향형", // Q2-3  거절 ― 예측 가능성 중시
      "현실분석형",
    ], // Q2-4  조건 따져 결정

    3: [
      "스토리텔러형", // Q3-1  재미있는 3단 스토리
      "데이터전달형", // Q3-2  슬라이드·팩트 중심
      "키워드스프린터형", // Q3-3  짧고 굵게 키워드
      "무대긴장형",
    ], // Q3-4  순서 미루는 타입

    4: [
      "완벽주의감독형", // Q4-1  시네마틱 스토리보드
      "브이로그러버형", // Q4-2  일상 브이로그
      "협업기획형", // Q4-3  친구들 분업·합본
      "임팩트속성형",
    ], // Q4-4  마감 직전 임팩트 편집
  };

  const handleSubmit = async () => {
    console.log("All Answer:", answer);

    const csrf_token = await fetchCsrfToken();

    const personality = answer
      .slice(1)
      .map((value, index) => personalityMap[index + 1][Number(value) - 1]);

    const payload = { species: answer[0], personality: personality };
    try {
      const response = await apiFetch("/api/create_avatar/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-csrftoken": csrf_token,
        },

        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        alert("성공적으로 전송되었습니다! ");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    if (page === 6) {
      console.log("sent!");
      handleSubmit();
    }
  }, [page, handleSubmit]);
  useEffect(() => {
    try {
      console.log("websocket connecting..");
      const socket = new WebSocket(wsUrl("/ws/avatars/"));
      console.log("websocket connected");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        //console.log("still connected!");
        if (data.message === "Avatar is ready!") {
          // Show avatar!
          //alert("avatar is finished");
          console.log("Avatar URL:", data.avatar_url);
          setavatarUrl(data.avatar_url);
        }
      };
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      <div className="w-4/5 h-[80vh] bg-white border border-2 shadow rounded-xl flex flex-col">
        <div className="text-center font-myfont text-3xl mt-8">
          <h>아바타 생성</h>
        </div>
        <QuestionAvatar
          page={page}
          answerClicked={answerClicked}
          setAnswer={setAnswer}
          answer={answer}
          setpage={setpage}
          avatarUrl={avatarUrl}
        />{" "}
        <div className="flex flex-row justify-between text-xl">
          {page && page > 1 ? (
            <button
              className="border border-blue-500 px-4 rounded-2xl py-[2px] ml-24 mb-12 hover:text-white hover:bg-blue-500"
              onClick={() => {
                setpage(page - 1);
              }}
            >
              이전
            </button>
          ) : (
            <>⠀</>
          )}
          {page && page < 6 ? (
            <button
              className="border border-blue-500 px-4 rounded-2xl py-[2px] mr-24 mb-12 hover:text-white hover:bg-blue-500"
              onClick={() => {
                setpage(page + 1);
              }}
            >
              다음
            </button>
          ) : (
            <>⠀</>
          )}
          {page && page === 6 && avatarUrl !== "" && (
            <button
              className="border border-blue-500 px-4 py-[2px] rounded-2xl mr-24 mb-12 hover:text-white hover:bg-blue-500"
              onClick={() => {
                router.push("/community");
              }}
            >
              좋아요!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const QuestionAvatar = ({
  setpage,
  page,
  answerClicked,
  setAnswer,
  answer,
  avatarUrl,
}) => {
  return (
    <div className="w-4/5 h-full flex justify-center mx-auto">
      <div className="flex flex-col w-full ml-8">
        {page && page === 1 && (
          <>
            <SpeciesSelector
              setAnswer={setAnswer}
              answer={answer}
              setpage={setpage}
            />
          </>
        )}
        {page && page === 2 && (
          <>
            <div className="mt-24 text-3xl">
              <h>
                <span className="text-blue-500 text-3xl">Q1.</span> 당신은
                주말에 오랜만에 아무 약속도 없는 자유시간을 얻었다. 이때 당신은?
              </h>
            </div>
            <div className="flex flex-col space-y-3 mt-24 items-start text-xl">
              <button
                value="1"
                className={`hover:text-blue-500 ${answer[1] === "1" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                1. 집에 콕 박혀서 푹 쉰다.
              </button>
              <button
                value="2"
                className={`hover:text-blue-500 ${answer[1] === "2" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                2. 무작정 밖으로 나가서 뭔가 할 거리를 찾는다.
              </button>
              <button
                value="3"
                className={`hover:text-blue-500 ${answer[1] === "3" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                3. 친구들에게 연락해서 같이 놀 계획을 세운다.
              </button>
              <button
                value="4"
                className={`hover:text-blue-500 ${answer[1] === "4" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                4. 평소 가고 싶었던 곳이나 하고 싶었던 일을 미리 정리해
                실행한다.
              </button>
            </div>
          </>
        )}
        {page && page === 3 && (
          <>
            {" "}
            <div className="mt-24 text-3xl ">
              <h>
                <span className="text-blue-500 text-3xl">Q2.</span> 친구가
                갑자기 &quot;깜짝 여행 가자!&quot;고 제안한다. 출발은 내일
                아침이다. 당신은?
              </h>
            </div>
            <div className="flex flex-col space-y-3 mt-24 items-start text-xl">
              <button
                value="1"
                className={`hover:text-blue-500 ${answer[2] === "1" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                1. 신나서 바로 짐 싼다.
              </button>
              <button
                value="2"
                className={`hover:text-blue-500 ${answer[2] === "2" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                2. 망설이지만 결국 따라간다.
              </button>
              <button
                value="3"
                className={`hover:text-blue-500 ${answer[2] === "3" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                3. &quot;미리 말해줬어야지!&quot; 하고 거절한다.
              </button>
              <button
                value="4"
                className={`hover:text-blue-500 ${answer[2] === "4" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                4. 조건(거리, 비용 등)을 따져보고 결정한다.
              </button>
            </div>
          </>
        )}
        {page && page === 4 && (
          <>
            {" "}
            <div className="mt-24 text-3xl flex flex-col ">
              <h>
                <span className="text-blue-500 text-3xl">Q3.</span> 5년 만의
                동창회에서 마이크가 넘어왔다.
              </h>
              <h>
                즉석에서 &quot;근황 & 앞으로의 목표&quot;를 2분 내로 말해달라는
                요청! 당신은?
              </h>
            </div>
            <div className="flex flex-col space-y-3 mt-24 items-start text-xl">
              <button
                value="1"
                className={`hover:text-blue-500 ${answer[3] === "1" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  1. 재미있는 실패담 → 교훈 → 다짐의 3단 구조로 청중을 웃기고
                  울린다. 즉흥이지만 제스처·목소리 톤이 완벽.
                </p>
              </button>
              <button
                value="2"
                className={`hover:text-blue-500 ${answer[3] === "2" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  2. 연도별 커리어 지표(회사·포지션·사이드프로젝트)를 요약한
                  5-컷 슬라이드를 휴대폰으로 띄워 &apos;팩트 중심&apos; 보고.
                </p>
              </button>
              <button
                value="3"
                className={`hover:text-blue-500 ${answer[3] === "3" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  3. 핵심 키워드 세 개(예: &apos;이직·결혼·마라톤&apos;)만
                  던지고 &apos;끝나고 술자리에서 자세히!&apos; 라며 마이크를
                  넘긴다.
                </p>
              </button>
              <button
                value="4"
                className={`hover:text-blue-500 ${answer[3] === "4" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  4. 얼굴이 빨개지며 머뭇대다 진행자에게 &quot;다음 사람
                  먼저…&quot;라고 부탁, 뒤에서 메모를 준비해 순서를 미룬다.
                </p>
              </button>
            </div>
          </>
        )}
        {page && page === 5 && (
          <>
            {" "}
            <div className="mt-24 text-3xl flex flex-col">
              <h>
                <span className="text-blue-500 text-3xl">Q4.</span> 당신은
                &apos;나의 하루를 영상으로&apos; 학교 과제를 받았다. <br />
                사용 가능한 장비는 스마트폰과 간단한 편집 앱뿐. 제출 기한은
                내일이다. 당신의 계획은?
              </h>
            </div>
            <div className="flex flex-col space-y-3 mt-24 items-start text-xl">
              <button
                value="1"
                className={`hover:text-blue-500 ${answer[4] === "1" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  1. 새벽 일출 촬영부터 밤하늘 타임랩스까지,
                  시간대·조명·배경음악을 미리 작성 후 촬영한다.
                </p>
              </button>
              <button
                value="2"
                className={`hover:text-blue-500 ${answer[4] === "2" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  2. 기상 알람이 울리는 순간부터 잠들 때까지 자연스러운 일상을
                  실시간으로 찍어 하이라이트만 잘라 편집한다.
                </p>
              </button>
              <button
                value="3"
                className={`hover:text-blue-500 ${answer[4] === "3" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  3. 친구 3명을 섭외해 각자 아침·점심·저녁 파트를 담당하게 하고,
                  밤에 온라인 미팅으로 영상을 합친다.
                </p>
              </button>
              <button
                value="4"
                className={`hover:text-blue-500 ${answer[4] === "4" ? "text-blue-500" : ""}`}
                onClick={(e) => {
                  answerClicked(e.currentTarget.value);
                }}
              >
                <p>
                  4. 촬영은 간단히 두어 컷만 찍어두고, 마감 직전에 효과·자막·밈
                  이미지를 집중 삽입해 &apos;짧고 임팩트 있게&apos; 완성한다.
                </p>
              </button>
            </div>
          </>
        )}
        {page && page > 5 && (
          <div className="w-full h-full flex justify-center items-center">
            {" "}
            {avatarUrl === "" ? (
              <div className="text-center">
                흠... 아직 로딩중이에욤!
                <br /> 완성되면 알려드릴테니, 페이지를 나가셔도 좋아요
              </div>
            ) : (
              <div>
                {" "}
                <img
                  src={avatarUrl}
                  width={514}
                  height={514}
                  className="w-[514px] h-[514px] object-cover mb-4"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function SpeciesSelector({ setAnswer, answer, setpage }) {
  const speciesList = [
    "사람",
    "로봇",
    "곰",
    "유니콘",
    "쇠똥구리",
    "외계인",
    "펭귄",
    "드래곤",
    "판다",
  ];

  const [selected, setSelected] = useState(null);

  const handleClick = (sp) => {
    setSelected(sp);

    // 인덱스 0에만 종족 저장
    setAnswer((prev) => {
      const arr = [...prev];
      arr[0] = sp;
      return arr;
    });
  };

  useEffect(() => {
    console.log(answer);
  }, [answer]);
  return (
    <div className="w-full mx-auto p-6 flex flex-col items-center gap-8">
      <div className="w-full text-left">
        <h2 className="text-2xl font-semibold text-left mt-12">당신은?</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {speciesList.map((sp) => (
          <motion.button
            key={sp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleClick(sp)}
            className={` rounded-2xl border-2 px-4 py-8 text-center transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              selected === sp
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            {sp}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
