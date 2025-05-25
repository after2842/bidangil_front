"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CompliancePage />
    </Suspense>
  );
}
/* ──────────────────────────────────────────
   품목별 규정 데이터 (예시 3개만 작성)
   나머지 품목(매니큐어, 담배, 주사기 … 영양제)은
   같은 구조로 이어서 추가하세요.
   ────────────────────────────────────────── */
const items = [
  {
    id: "alcohol",
    title: "주류 (Alcoholic Beverages)",
    sections: [
      {
        header: "허용 여부",
        body: "주류는 국제우편·특송으로 개인 간 배송이 원칙적으로 금지됩니다. USPS·UPS·FedEx 모두 개인 주류 배송을 받지 않습니다.",
      },
      {
        header: "허용 조건 및 예외사항",
        body: "상업 면허 수입업자를 거치거나, 여행자가 직접 휴대 반입할 때 21세 이상 성인 1인당 1리터까지 면세가 가능합니다.",
      },
      {
        header: "기타 주의사항",
        body: "허가 없이 주류를 보내다 적발되면 압수·벌금 대상입니다. 주세·연방 주류세가 부과될 수 있으니 주의하세요.",
      },
    ],
    refs: [
      {
        label: "CBP – Traveler Liquor Rules",
        url: "https://www.cbp.gov/travel/international-visitors/kbyg/know-duty",
      },
      {
        label: "USPS – Alcohol Prohibition",
        url: "https://about.usps.com/publications/pub52/pub52c3_024.htm",
      },
    ],
  },

  {
    id: "perfume",
    title: "향수 (Perfume)",
    sections: [
      {
        header: "허용 여부",
        body: "향수는 알코올 함량으로 인해 항공 위험물(Class 3)로 분류되어 국제 우편·항공 특송으로는 발송 불가입니다.",
      },
      {
        header: "허용 조건 및 예외사항",
        body: "알코올이 없는 고체·오일 향수는 소량 배송 가능할 수 있으나, 항공이 아닌 해상 운송 전문 업체를 사용해야 합니다.",
      },
      {
        header: "기타 주의사항",
        body: "압력 변화로 누출 위험이 커서 적발 시 반송·폐기될 수 있습니다. 개인은 현지 구매나 휴대를 권장합니다.",
      },
    ],
    refs: [
      {
        label: "USPS – Flammable Liquids",
        url: "https://about.usps.com/publications/pub52/pub52c3_014.htm",
      },
      {
        label: "IATA – Dangerous Goods (Class 3)",
        url: "https://www.iata.org/en/publications/dgr/",
      },
    ],
  },

  {
    id: "air-freshener",
    title: "방향제 (Air Fresheners)",
    sections: [
      {
        header: "허용 여부",
        body: "에어로졸 스프레이형은 항공 배송 금지. 젤·석고 등 비휘발성 방향제는 성분에 따라 소량 허용됩니다.",
      },
      {
        header: "허용 조건 및 예외사항",
        body: "알코올 농도가 높은 디퓨저 오일은 금지. 리튬배터리 내장 제품은 배터리 운송 규정 충족 필요.",
      },
      {
        header: "기타 주의사항",
        body: "액체형은 누액 방지 3중 포장 필수. 동일 제품을 다량 보내면 상업 수입으로 간주될 수 있습니다.",
      },
    ],
    refs: [
      {
        label: "USPS – Aerosols Prohibited",
        url: "https://about.usps.com/publications/pub52/pub52c3_006.htm",
      },
      {
        label: "FAA – Hazardous Materials",
        url: "https://www.faa.gov/hazmat",
      },
    ],
  },

  /* ↓↓↓ 여기에 나머지 품목을 동일 구조로 추가 ↓↓↓ */
];

/* ──────────────────────────────────────────
   참고 링크 버튼
   ────────────────────────────────────────── */
function RefButton({ label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 mt-3 inline-block rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
    >
      {label}
    </a>
  );
}

/* ──────────────────────────────────────────
   메인 컴플라이언스 페이지
   ────────────────────────────────────────── */
function CompliancePage() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item"); // ?item=perfume 등
  const sectionRefs = useRef({});

  /* URL 파라미터 변동 시 해당 섹션으로 스크롤 */
  useEffect(() => {
    if (item && sectionRefs.current[item]) {
      sectionRefs.current[item].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [item]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 leading-relaxed">
      <h1 className="mb-10 text-3xl font-extrabold">
        한국 → 미국 개인 배송 규정
      </h1>

      {items.map(({ id, title, sections, refs }) => (
        <div
          key={id}
          ref={(el) => (sectionRefs.current[id] = el)}
          className="mb-16 scroll-mt-24"
        >
          {/* 품목 제목 */}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

          {/* 세부 섹션 */}
          {sections.map(({ header, body }) => (
            <div key={header} className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">{header}</h3>
              <p className="mt-2 whitespace-pre-line">{body}</p>
            </div>
          ))}

          {/* 참고 링크 버튼 */}
          <div className="flex flex-wrap">
            {refs.map(({ label, url }) => (
              <RefButton key={url} label={label} url={url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
