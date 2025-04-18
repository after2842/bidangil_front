"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { LinkPreview } from "./link-preview";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import TextField from "./Textfield";
import { Link } from "lucide-react";
import { AddressScreen } from "./AddressScreen";
import AddressModal from "./AddressModal";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
// A single plain-white card that hosts a form.
function Card({ formData, index, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.2 * index,
          ease: "easeOut",
        },
      }}
      // Fill available space above the bottom button.
      className="h-[calc(90vh-180px)] w-full md:w-96 bg-gray-100 rounded-xl md:rounded-2xl shadow-md flex flex-col p-4
                 snap-center flex-shrink-0 "
    >
      <h3 className="text-lg font-bold mb-2 text-center text-black">
        상품 {index + 1}
      </h3>

      <LabelInputContainer>
        <Label htmlFor={`storeUrl-${index}`} className="text-lg">
          스토어 링크
        </Label>
        <Input
          id={`storeUrl-${index}`}
          placeholder="https://bidan-store.com/shirts"
          type="url"
          value={formData.storeUrl}
          onChange={(e) => handleChange(index, "storeUrl", e.target.value)}
        />
      </LabelInputContainer>

      <LabelInputContainer>
        <Label htmlFor={`productOptions-${index}`} className="text-lg">
          옵션
        </Label>
        <TextField
          id={`productOptions-${index}`}
          placeholder="네이비 m사이즈 1개, 더스트라일락 s사이즈 2개"
          value={formData.productOptions}
          onChange={(e) =>
            handleChange(index, "productOptions", e.target.value)
          }
        />
      </LabelInputContainer>

      {/* If there's a URL, show a clickable link. */}
      {formData.storeUrl && (
        <p className="mb-4">
          <LinkPreview url={formData.storeUrl} className="font-myfont">
            <span className="text-black flex justify-center mt-4">
              미리보기
            </span>
          </LinkPreview>
        </p>
      )}
    </motion.div>
  );
}

// A horizontally scrollable carousel without arrow buttons.
function Carousel({ items }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      // Additional logic if needed...
    }
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-auto overscroll-x-auto py-4md:py-8 scroll-smooth snap-x snap-mandatory
                   [scrollbar-width:none]"
        ref={carouselRef}
      >
        <div className="flex flex-row md:gap-4 md:px-4 w-full mx-auto">
          {items.map((card, i) => (
            <React.Fragment key={i}>{card}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// The main component that aggregates multiple Card forms into a carousel
export default function DynamicFormCarousel() {
  const router = useRouter();
  const [forms, setForms] = useState([{ storeUrl: "", productOptions: "" }]);
  // Address data
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleAddCard = () => {
    setForms((prevForms) => [
      ...prevForms,
      { storeUrl: "", productOptions: "" },
    ]);
  };
  // Whether to show the address modal
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleChange = (index, field, value) => {
    setForms((prevForms) =>
      prevForms.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  const { fetchCsrfToken } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("All Forms Data:", forms);
    console.log("Address Data:", address);
    //alert("All forms + address submitted! Check console for details.");
    const payload = {
      orders: forms, // All product cards
      address: address, // Address form
    };
    const csrf_token = await fetchCsrfToken();
    {
      console.log("csrf:::", csrf_token);
    }
    try {
      const response = await fetch("http://localhost:8000/api/submit_order/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-csrftoken": csrf_token,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(`result status: ${result["order_id"]}`);
      if (response.status === 200) {
        console.log(`RESULTTT:${result["order_id"]}`);
        alert(
          "성공적으로 전송되었습니다! \n메인화면 -> '내 정보'에서 확인해주세요"
        );
        router.push("/");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const carouselItems = forms.map((form, index) => (
    <Card
      key={`card-${index}`}
      formData={form}
      index={index}
      handleChange={handleChange}
    />
  ));

  return (
    <div className="w-screen min-h-screen text-white flex flex-col px-10 md:px-20 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center font-myfont">
        구매 신청서
      </h1>
      {/* Add Card Button */}
      <div>
        <button
          onClick={handleAddCard}
          className="w-24 py-2 text-white hover:bg-blue-700 rounded-md
                  
                   bg-blue-600 text-lg transition duration-200 mb-0 md:mb-5 mr-5"
        >
          추가하기
        </button>

        <button
          onClick={() => setShowAddressModal(true)}
          className="w-24 py-2 text-black hover:bg-white rounded-md
                  
                   bg-white text-lg transition duration-200 mb-0 md:mb-5"
        >
          배송 주소
        </button>
      </div>
      {/* Centered Scrollable Carousel without arrows */}

      <Carousel items={carouselItems} />

      {/* Fixed bottom area for submitting */}
      <div className="fixed bottom-6 w-full left-0 px-4">
        <div className="mx-auto w-full max-w-[300px]">
          <button
            onClick={handleSubmit}
            className="block w-full py-1 bg-blue-600 hover:bg-blue-700 rounded
                       font-semibold text-white transition-colors"
          >
            신청완료
          </button>
        </div>
      </div>
      {/* Conditionally render the modal */}
      {showAddressModal && (
        <AddressScreen
          address={address}
          setAddress={setAddress}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2 mt-1", className)}>
      {children}
    </div>
  );
};
