"use client";
import { useRouter } from "next/navigation";
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

/* ─────────────  Item tables  ───────────── */

export const items = [
  { label: "Alcohol", Icon: Wine, link: "alcohol" },
  { label: "Perfume", Icon: SprayCan, link: "perfume" },
  { label: "Tobacco", Icon: Cigarette, link: "tobacco" },
  { label: "Syringe", Icon: Syringe, link: "syringe" },
  { label: "Injectables", Icon: PillBottle, link: "injectable" },
  { label: "Pet Food", Icon: Dog, link: "pet-food" },
  { label: "Pet Food", Icon: Bone, link: "pet-food" },
  { label: "Food", Icon: Croissant, link: "food" },
  { label: "Beverages", Icon: CupSoda, link: "beverage" },
  { label: "Cash", Icon: Banknote, link: "cash" },
  { label: "Precious Metals", Icon: Gem, link: "precious-metals" },
  { label: "Counterfeits", Icon: Copy, link: "counterfeit" },
  { label: "Weapons", Icon: Sword, link: "weapons" },
  { label: "Explosives", Icon: Bomb, link: "explosives" },
  { label: "Air Fresheners", Icon: Tent, link: "freshener" },
  { label: "Nail Polish", Icon: Brush, link: "manicure" },
];

export const itemsPartially = [
  { label: "Cosmetics", Icon: SmilePlus, link: "cosmetic" },
  { label: "Supplements", Icon: Beaker, link: "supplement" },
];

/* ─────────────  Banned items banner  ───────────── */

export default function BannedItemsNotice() {
  const router = useRouter();
  return (
    <section className="w-full border shadow max-w-4xl mx-auto p-2 bg-gray-100 rounded-2xl">
      <div className="bg-gray-50 p-8 rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 place-items-center">
          {items.map(({ label, Icon, link }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 cursor-pointer text-gray-900 hover:text-blue-600"
              onClick={() => router.push(`/compliance?item=${link}`)}
            >
              <Icon size={36} strokeWidth={1.4} />
              <span className="text-sm sm:text-base leading-snug text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs sm:text-sm text-center text-gray-600">
          The products above are{" "}
          <span className="text-blue-700">usually prohibited</span> for
          international shipping. Rare exceptions do exist. Tap any icon for
          details. Need help? Message us on KakaoTalk&nbsp;Plus Friend and we’ll
          gladly assist you.
        </p>
      </div>
    </section>
  );
}

/* ─────────────  Partially-restricted banner  ───────────── */

export function PartiallyBannedItemsNotice() {
  const router = useRouter();
  return (
    <section className="w-full border shadow max-w-4xl mx-auto p-2 bg-gray-100 rounded-2xl">
      <div className="bg-gray-50 p-8 rounded-xl">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 place-items-center">
          {itemsPartially.map(({ label, Icon, link }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 cursor-pointer text-gray-900 hover:text-blue-600"
              onClick={() => router.push(`/compliance?item=${link}`)}
            >
              <Icon size={36} strokeWidth={1.5} />
              <span className="text-sm sm:text-base leading-snug text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs sm:text-sm text-center text-gray-600">
          These items are{" "}
          <span className="text-blue-700">generally allowed</span>, but certain
          limits apply. For example, large quantities of supplements or products
          containing restricted ingredients can be blocked. Tap an icon for full
          details, or contact us via KakaoTalk&nbsp;Plus Friend for quick
          support.
        </p>
      </div>
    </section>
  );
}
