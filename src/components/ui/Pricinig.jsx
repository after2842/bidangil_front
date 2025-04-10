"use client";
import { animate, motion } from "motion/react";
import { useEffect } from "react";
import { cn_2 } from "@/lib/utils";
import {
  DollarSign,
  JapaneseYenIcon as Yen,
  Euro,
  PoundSterling,
  Bitcoin,
  CreditCard,
  Tag,
  Package,
  Receipt,
  Calendar,
  Truck,
  Clock,
  MapPin,
  Wallet,
  ShoppingBag,
} from "lucide-react";

export function CardDemo({
  title = "Damn good card",
  description = "A card that showcases a set of tools that you use to create your product.",
  cardType = "currency",
  primaryCurrency = "USD",
  primaryIcon = "tag",
  primaryDeliveryIcon = "truck",
}) {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton
          cardType={cardType}
          primaryCurrency={primaryCurrency}
          primaryIcon={primaryIcon}
          primaryDeliveryIcon={primaryDeliveryIcon}
        />
      </CardSkeletonContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}

const Skeleton = ({
  cardType = "currency",
  primaryCurrency,
  primaryIcon,
  primaryDeliveryIcon,
}) => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];

  // Reorder icons based on primary currency or icon
  const getIconOrder = () => {
    if (cardType === "currency") {
      const defaultOrder = ["USD", "EUR", "BTC", "GBP", "JPY"];
      if (!primaryCurrency || !defaultOrder.includes(primaryCurrency))
        return defaultOrder;

      // Move primary currency to center position
      const newOrder = [...defaultOrder];
      const primaryIndex = newOrder.indexOf(primaryCurrency);
      newOrder.splice(primaryIndex, 1);
      newOrder.splice(2, 0, primaryCurrency);
      return newOrder;
    } else if (cardType === "pricing") {
      const defaultOrder = [
        "creditCard",
        "tag",
        "package",
        "receipt",
        "calendar",
      ];
      if (!primaryIcon || !defaultOrder.includes(primaryIcon))
        return defaultOrder;

      // Move primary icon to center position
      const newOrder = [...defaultOrder];
      const primaryIndex = newOrder.indexOf(primaryIcon);
      newOrder.splice(primaryIndex, 1);
      newOrder.splice(2, 0, primaryIcon);
      return newOrder;
    } else if (cardType === "delivery") {
      const defaultOrder = ["truck", "clock", "mapPin", "package", "wallet"];
      if (!primaryDeliveryIcon || !defaultOrder.includes(primaryDeliveryIcon))
        return defaultOrder;

      // Move primary icon to center position
      const newOrder = [...defaultOrder];
      const primaryIndex = newOrder.indexOf(primaryDeliveryIcon);
      newOrder.splice(primaryIndex, 1);
      newOrder.splice(2, 0, primaryDeliveryIcon);
      return newOrder;
    }

    return ["USD", "EUR", "BTC", "GBP", "JPY"]; // Default fallback
  };

  const iconOrder = getIconOrder();

  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 1,
    });
  }, []);

  const renderCurrencyIcon = (currency, className, circleClass) => {
    const iconProps = {
      className: className,
    };

    switch (currency) {
      case "USD":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <DollarSign
              {...iconProps}
              className={`${className} text-green-400`}
            />
          </Container>
        );
      case "EUR":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <Euro {...iconProps} className={`${className} text-blue-400`} />
          </Container>
        );
      case "BTC":
        return (
          <Container className={`${circleClass}`}>
            <Bitcoin
              {...iconProps}
              className={`${className} text-yellow-400`}
            />
          </Container>
        );
      case "GBP":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <PoundSterling
              {...iconProps}
              className={`${className} text-purple-400`}
            />
          </Container>
        );
      case "JPY":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Yen {...iconProps} className={`${className} text-red-400`} />
          </Container>
        );
      default:
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <DollarSign
              {...iconProps}
              className={`${className} text-green-400`}
            />
          </Container>
        );
    }
  };

  const renderPricingIcon = (icon, className, circleClass) => {
    const iconProps = {
      className: className,
    };

    switch (icon) {
      case "creditCard":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <CreditCard
              {...iconProps}
              className={`${className} text-teal-400`}
            />
          </Container>
        );
      case "tag":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <Tag {...iconProps} className={`${className} text-pink-400`} />
          </Container>
        );
      case "package":
        return (
          <Container className={`${circleClass}`}>
            <Package {...iconProps} className={`${className} text-amber-400`} />
          </Container>
        );
      case "receipt":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <Receipt
              {...iconProps}
              className={`${className} text-indigo-400`}
            />
          </Container>
        );
      case "calendar":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Calendar {...iconProps} className={`${className} text-cyan-400`} />
          </Container>
        );
      default:
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Tag {...iconProps} className={`${className} text-pink-400`} />
          </Container>
        );
    }
  };

  const renderDeliveryIcon = (icon, className, circleClass) => {
    const iconProps = {
      className: className,
    };

    switch (icon) {
      case "truck":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Truck {...iconProps} className={`${className} text-orange-400`} />
          </Container>
        );
      case "clock":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <Clock {...iconProps} className={`${className} text-sky-400`} />
          </Container>
        );
      case "mapPin":
        return (
          <Container className={`${circleClass}`}>
            <MapPin {...iconProps} className={`${className} text-rose-400`} />
          </Container>
        );
      case "package":
        return (
          <Container className={`h-12 w-12 ${circleClass}`}>
            <ShoppingBag
              {...iconProps}
              className={`${className} text-emerald-400`}
            />
          </Container>
        );
      case "wallet":
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Wallet {...iconProps} className={`${className} text-violet-400`} />
          </Container>
        );
      default:
        return (
          <Container className={`h-8 w-8 ${circleClass}`}>
            <Truck {...iconProps} className={`${className} text-orange-400`} />
          </Container>
        );
    }
  };

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-2">
        {cardType === "currency" ? (
          <>
            {renderCurrencyIcon(iconOrder[0], "h-4 w-4", "circle-1")}
            {renderCurrencyIcon(iconOrder[1], "h-6 w-6", "circle-2")}
            {renderCurrencyIcon(iconOrder[2], "h-8 w-8", "circle-3")}
            {renderCurrencyIcon(iconOrder[3], "h-6 w-6", "circle-4")}
            {renderCurrencyIcon(iconOrder[4], "h-4 w-4", "circle-5")}
          </>
        ) : cardType === "pricing" ? (
          <>
            {renderPricingIcon(iconOrder[0], "h-4 w-4", "circle-1")}
            {renderPricingIcon(iconOrder[1], "h-6 w-6", "circle-2")}
            {renderPricingIcon(iconOrder[2], "h-8 w-8", "circle-3")}
            {renderPricingIcon(iconOrder[3], "h-6 w-6", "circle-4")}
            {renderPricingIcon(iconOrder[4], "h-4 w-4", "circle-5")}
          </>
        ) : (
          <>
            {renderDeliveryIcon(iconOrder[0], "h-4 w-4", "circle-1")}
            {renderDeliveryIcon(iconOrder[1], "h-6 w-6", "circle-2")}
            {renderDeliveryIcon(iconOrder[2], "h-8 w-8", "circle-3")}
            {renderDeliveryIcon(iconOrder[3], "h-6 w-6", "circle-4")}
            {renderDeliveryIcon(iconOrder[4], "h-4 w-4", "circle-5")}
          </>
        )}
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn_2(
        "w-full h-full mx-auto p-8 rounded-xl border border-gray-800 bg-gray-900 shadow-[2px_4px_16px_0px_rgba(0,0,0,0.2)_inset] group text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
  return (
    <h3 className={cn_2("text-3xl font-semibold text-white py-2", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className }) => {
  return (
    <p
      className={cn_2("text-lg font-normal text-gray-200 max-w-sm", className)}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}) => {
  return (
    <div
      className={cn_2(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-gray-800 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({ className, children }) => {
  return (
    <div
      className={cn_2(
        `h-16 w-16 rounded-full flex items-center justify-center bg-gray-800
    shadow-[0px_0px_8px_0px_rgba(0,0,0,0.5)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default function Pricing() {
  return (
    <div className="min-h-screen p- flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-5xl text-black mb-12 font-myfont text-left">
          가격
        </h1>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardDemo
          title="대행 수수료"
          description="구매 대금의 4%가 부가돼요."
          cardType="pricing"
          primaryIcon="tag"
        />

        <CardDemo
          title="환율"
          description="처음 신청서를 작성할 때의 환율이 적용돼요."
          cardType="currency"
          primaryCurrency="BTC"
        />

        <CardDemo
          title="배송비"
          description="배송비는 무게와 부피에 따라 다르게 측정 돼요. 예상 배송비를 이용해 가늠 할 수 있어요."
          cardType="delivery"
          primaryDeliveryIcon="truck"
        />
      </div>
    </div>
  );
}
