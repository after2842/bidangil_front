"use client";
import { useRouter } from "next/navigation";
/**
 * Minimalistic banned‑items notice.
 * Technologies: React (Next.js client component), TailwindCSS, lucide‑react icons.
 *
 * 👉 Put <BannedItemsNotice /> wherever you want the banner to appear.
 *    All icons are monochrome so it sits nicely in black/gray/white designs.
 */

import {
  Wine,
  SprayCan,
  Cigarette,
  Syringe,
  PillBottle,
  Dog,
  Bone,
  Croissant,
  CupSoda,
  Banknote,
  Gem,
  Copy,
  Sword,
  Bomb,
  Tent,
  Brush,
  SmilePlus,
  Beaker,
} from "lucide-react";

// Minimal banned‑items table using only icons guaranteed to exist in lucide-react.
// Replace or re‑order entries freely; each Icon component renders an inline SVG.
export const items = [
  { label: "주류", Icon: Wine, link: "alcohol" },
  { label: "향수", Icon: SprayCan, link: "perfume" },
  { label: "담배", Icon: Cigarette, link: "tobacco" },
  { label: "주사기", Icon: Syringe, link: "syringe" },
  { label: "주사제", Icon: PillBottle, link: "injectable" },
  { label: "반려동물", Icon: Dog, link: "pet-food" }, // 같은 섹션으로 이동
  { label: "사료", Icon: Bone, link: "pet-food" }, // 같은 섹션으로 이동
  { label: "음식류", Icon: Croissant, link: "food" },
  { label: "음료류", Icon: CupSoda, link: "beverage" },
  { label: "현금", Icon: Banknote, link: "cash" },
  { label: "귀금속", Icon: Gem, link: "precious-metals" },
  { label: "모조품", Icon: Copy, link: "counterfeit" },
  { label: "무기류", Icon: Sword, link: "weapons" },
  { label: "화약류", Icon: Bomb, link: "explosives" },
  { label: "방향제", Icon: Tent, link: "freshener" },
  { label: "매니큐어", Icon: Brush, link: "manicure" },
];
export const itemsPartially = [
  { label: "화장품", Icon: SmilePlus, link: "cosmetic" },
  { label: "영양제", Icon: Beaker, link: "supplement" },
];

export default function BannedItemsNotice() {
  const router = useRouter();
  return (
    <section className="w-full border  shadow max-w-4xl mx-auto p-2 bg-gray-100 rounded-2xl ">
      <div className="bg-gray-50 p-8 rounded-xl">
        {" "}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 place-items-center">
          {items.map(({ label, Icon, link }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 cursor-pointer text-gray-900 hover:text-blue-600"
              onClick={() => router.push(`/compliance?item=${link}`)}
            >
              <Icon size={36} strokeWidth={1.4} />
              <span className="text-sm sm:text-base leading-snug text-center ">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs sm:text-sm text-center text-gray-600">
          배송 불가한 품목들의 경우{" "}
          <span className="text-blue-700">
            일반적인 상황에서 배송이 불가능합니다
          </span>
          . 그러나 특수한 경우, 배송 불가한 품목이 배송 가능 한 경우가 있습니다.
          해당 품목의 아이콘을 클릭하여 더욱 자세한 정보를 확인해주시기
          바랍니다. 만약 추가적인 문의가 필요한 경우, 카카오톡 플러스 친구를
          사용하여 문의 주시면 친절하게 답변드리겠습니다.
          {/* (주류 ‧ 향수 ‧ 방향제 ‧ 매니큐어 ‧ 담배 ‧ 주사기 ‧ 바늘제품 ‧ 주사제 ‧ 반려동물
          사료 ‧ 음식류 ‧ 음료류 ‧ 현금 ‧ 귀금속 ‧ 모조품 ‧ 무기류 ‧ 화약류) */}
        </p>
      </div>
    </section>
  );
}

export function PartiallyBannedItemsNotice() {
  const router = useRouter();
  return (
    <section className="w-full border  shadow max-w-4xl mx-auto p-2 bg-gray-100 rounded-2xl ">
      <div className="bg-gray-50 p-8 rounded-xl">
        {" "}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-8 gap-x-4 place-items-center">
          {itemsPartially.map(({ label, Icon, link }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 cursor-pointer text-gray-900 hover:text-blue-600"
              onClick={() => router.push(`/compliance?item=${link}`)}
            >
              <Icon size={36} strokeWidth={1.5} />
              <span className="text-sm sm:text-base leading-snug text-center ">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs sm:text-sm text-center text-gray-600">
          배송 제약 품목들은{" "}
          <span className="text-blue-700">
            일반적으로 배송이 가능한 품목들입니다
          </span>
          . 하지만 특정 상황에 배송이 제한될 수 있습니다. 예를들어 영양제의
          경우, 지나치게 많은 수량을 주문하거나 유해성분이 포함된 경우 배송이
          제한될 수 있습니다. 더욱 자세한 사항은 아이콘을 클릭하거나, 카카오톡
          플러스친구를 이용하여 문의해 주시면 친절하게 답변 드리겠습니다.
          {/* (화장품 ‧ 영양제) */}
        </p>
      </div>
    </section>
  );
}
