"use client";
import React, { useState, useRef, useEffect, use } from "react";
import { motion } from "motion/react";
import { LinkPreview } from "./link-preview";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input_2";
import { InputHalf } from "@/components/ui/input_3";
import { cn } from "@/lib/utils";
import TextField from "./Textfield";
import { BoxIcon, GlobeIcon, Tag, TagIcon } from "lucide-react";
import { AddressScreen } from "./AddressScreen_2";
import AddressModal from "./AddressModal";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { BottomGradient } from "@/components/ui/Login";
import globeIcon from "../../assets/icons/globe.svg";
import { AuroraBackground } from "./AuraBackground";
import { Carousel } from "@/app/ai/page";
import RequestForm from "./RequestForm";
import Image from "next/image";
import AddressAutocomplete from "./AddressAutoComp";
export default function Submit_2() {
  const { fetchCsrfToken } = useUser();
  const [currentPage, setcurrentPage] = useState(1);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    name: "",
  });

  const [forms, setforms] = useState([{ url: "", desc: "", price: "" }]);
  const [showMissingModal, setMissingModal] = useState(false);
  const [showValidAddress, setValidAddress] = useState(false);
  const [precise_data, setPreciseData] = useState("");
  const formatAddressString = (address) => {
    // e.g. "11818 South St STE 102, Cerritos, CA 990703"
    const { addressLine1, city, state, zip } = address;
    let parts = [];

    // push fields if they exist
    if (addressLine1) parts.push(addressLine1);

    if (city) parts.push(city);

    // If your address is always US-based, you might do
    // something like "Cerritos, CA 990703"
    let stateZip = [];
    if (state) stateZip.push(state);
    if (zip) stateZip.push(zip);

    if (stateZip.length) {
      parts.push(stateZip.join(" "));
    }

    // join the main parts with commas
    return parts.join(", ");
  };
  const validateAddress = async ({ address }) => {
    const csrf_token = await fetchCsrfToken();
    try {
      const response = await fetch(
        "http://localhost:8000/api/validate_address/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-csrftoken": csrf_token,
          },
          body: JSON.stringify(address),
        }
      );
      const result = await response.json();
      console.log(`result status: ${result["result"]}`);
      if (response.status === 200) {
        console.log(`RESULTTT:${result["result"]}`);
        return result["result"];
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };
  const nextPage = async ({ index }) => {
    if (index === 1) {
      if (
        !address.addressLine1 ||
        !address.city ||
        !address.state ||
        !address.zip ||
        !address.name ||
        !address.phone
      ) {
        setMissingModal(true);
        console.log("every fill should be filled");
      } else {
        console.log(showValidAddress);
        setMissingModal(false);
        setcurrentPage(index + 1);
      }
    } else {
      console.log("clicked!");
      setcurrentPage(index + 1);
    }
  };
  const prevPage = ({ index }) => {
    console.log("prev clicked!");
    setcurrentPage(index - 1);
  };

  const title = ["배송주소 & 개인정보", "구매 신청", "확인"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("All Forms Data:", forms);
    console.log("Address Data:", address);
    //alert("All forms + address submitted! Check console for details.");
    const payload = {
      orders: forms,
      address: address,
    };
    const csrf_token = await fetchCsrfToken();

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

  return (
    <div className="h-screen w-full bg-gray-950 bg-center flex items-center justify-center ">
      <div className="w-[65%] h-[85vh] bg-white rounded-2xl text-center p-2 shadow-xl border">
        <div
          className="
    grid grid-rows-[auto_auto_1fr_auto_auto] 
    grid-cols-1 gap-4
    md:grid-cols-10
    h-full
"
        >
          {" "}
          <div className="md:col-span-3 md:row-span-10 overflow-y-auto scrollbar-hide h-full">
            <ControlPanel
              address={address}
              setAddress={setAddress}
              forms={forms}
              currentPage={currentPage}
              showMissingModal={showMissingModal}
              showValidAddress={showValidAddress}
              precise_data={precise_data}
              AddressAutocomplete={AddressAutocomplete}
              formatAddressString={formatAddressString}
            ></ControlPanel>
          </div>
          <div className="md:col-span-7 md:row-span-1 bg-white text-3xl font-bold text-black font-myfont mt-4">
            {title.length > 0 && title[currentPage - 1]}
          </div>
          <div className="md:col-span-7 md:row-span-4 overflow-y-auto scrollbar-hide h-full">
            <WriteForm
              currentPage={currentPage}
              address={address}
              setAddress={setAddress}
              forms={forms}
              setforms={setforms}
            ></WriteForm>
          </div>
          <div className="md:col-span-7 md:row-span-1">
            {" "}
            <div className="flex items-center justify-center md:gap-[400px]">
              {/* This button only appears if currentPage !== 1 */}
              {currentPage !== 1 && (
                <button
                  className="bg-gray-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => prevPage({ index: currentPage })}
                >
                  이전
                </button>
              )}
              {currentPage === 1 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => nextPage({ index: currentPage })}
                >
                  다음
                </button>
              )}
              {currentPage === 2 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => nextPage({ index: currentPage })}
                >
                  다음
                </button>
              )}
              {currentPage == 3 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm "
                  onClick={handleSubmit}
                  type="submit"
                >
                  제출완료
                </button>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

const ControlPanel = ({
  address,
  setAddress,
  forms,
  currentPage,
  showMissingModal,
  showValidAddress,
  precise_data,
  AddressAutocomplete,
  formatAddressString,
}) => {
  const router = useRouter();
  const googleAddress = formatAddressString(address);

  return (
    <div className="w-full h-full rounded-lg bg-gray-100 flex flex-col px-2 relative">
      <div className="mx-auto w-full">
        <div className=" text-sm">
          {/* <div className="justify center font-myfont mt-4">주문 내역</div> */}
          <div className=" w-full flex flex-col">
            {currentPage === 1 && (
              <div>
                <div className="mt-2 flex justify-start">
                  <button
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <Image
                      src="/images/arrow_left.png"
                      alt="back_arrow"
                      width={18} // Set your actual icon size
                      height={15}
                    />
                  </button>
                </div>
                <div className="mt-[100px]">
                  <div className="flex ml-2 mb-4">
                    <Image
                      src="/images/alert.png"
                      alt="alert"
                      width={20}
                      height={20}
                      className="object-contain flex-shrink-0"
                    />
                    <h className="ml-1 text-[17px]"> 환율</h>
                  </div>
                  <div className="flex ml-2 mb-4">
                    <Image
                      src="/images/alert.png"
                      alt="alert"
                      width={20}
                      height={20}
                      className="object-contain flex-shrink-0"
                    />
                    <h className="ml-1 text-[17px]">주소&개인정보</h>
                  </div>
                  <AddressAutocomplete
                    address={address}
                    setAddress={setAddress}
                  />
                  {showMissingModal && (
                    <div className="mt-24 flex absolute bottom-12 left-0 w-full justify-center">
                      <h className="text-blue-500">모든 정보를 입력해주세요</h>
                    </div>
                  )}

                  <div></div>
                </div>
              </div>
            )}
            <div className="mt-12">
              {currentPage === 2 &&
                forms.map(
                  (form, index) =>
                    form.desc !== "" && (
                      <div className="mt-2 w-full">
                        <button
                          onClick={() => window.open(form.url, "_blank")}
                          className="w-full border rounded-lg bg-white p-2 shadow-md mb-4  "
                        >
                          <div className="flex">
                            <GlobeIcon className="w-4 mr-2 flex-shrink-0" />
                            <p>
                              {form.url.length > 39
                                ? form.url.slice(0, 36) + "..."
                                : form.url}
                            </p>
                          </div>
                          <div className=" flex">
                            <BoxIcon className="w-4 mr-2 flex-shrink-0" />
                            <p>
                              {" "}
                              {form.desc.length > 39
                                ? form.desc.slice(0, 36) + "..."
                                : form.desc}
                            </p>
                          </div>{" "}
                          <div className=" flex">
                            {!form.price ? (
                              <></>
                            ) : (
                              <>
                                <TagIcon className="w-4 mr-2 flex-shrink-0" />{" "}
                                <p>{form.price}원</p>
                              </>
                            )}
                          </div>{" "}
                        </button>
                      </div>
                    )
                )}
            </div>

            {currentPage === 3 && (
              <div className="flex flex-col items-center  justify-center mt-[180px]">
                <div>배송 주소</div>
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                    googleAddress
                  )}&zoom=15&size=600x300&markers=color:red%7C${encodeURIComponent(
                    googleAddress
                  )}&key=AIzaSyBDIYy1cEoJIzN4VacqPuC8pV66I1wjVzg`}
                  alt="Google Map"
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WriteForm = ({ currentPage, address, setAddress, forms, setforms }) => {
  return (
    <div className="w-full h-full">
      {currentPage && currentPage === 1 ? (
        <AddressScreen address={address} setAddress={setAddress} />
      ) : currentPage === 2 ? (
        <RequestForm forms={forms} setforms={setforms}></RequestForm>
      ) : currentPage === 3 ? (
        <FinalSummary forms={forms} address={address}></FinalSummary>
      ) : null}
    </div>
  );
};

function LabelInputContainer({ children, className }) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

const BottomGradientBlue = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const FinalSummary = ({ forms, address }) => {
  return (
    <div className="w-full h-full ">
      <div className="max-w-2xl p-4 md:p-8  mx-auto">
        <div className="text-left font-myfont mb-4">
          <h className="text-xl">신청내용</h>
        </div>

        {forms &&
          forms.map(
            (form, iindex) =>
              form.url &&
              form.desc && (
                <div className="flex flex-col ">
                  <div className="ml-2 text-left mb-4">
                    <div className="flex items-left">
                      <p
                        className="hover:underline"
                        onClick={() => window.open(form.url)}
                      >
                        {" "}
                        {form.url.length > 79
                          ? form.url.slice(0, 79) + "..."
                          : form.url}
                      </p>
                    </div>

                    <div className="text-blue-500">{form.desc}</div>
                  </div>
                </div>
              )
          )}

        {address && (
          <div className="   ">
            <div className="text-left rounded-lg w-full mb-8">
              {" "}
              <div className="text-left font-myfont mt-8 mb-4">
                <h className="text-xl">배송 정보</h>
              </div>
              <div className="flex flex-row ml-2">
                {address.addressLine2 ? (
                  <>
                    {" "}
                    <div>{address.addressLine1 + ","}&nbsp;</div>
                    <div className="">{address.addressLine2}</div>
                  </>
                ) : (
                  <div>{address.addressLine1}&nbsp;</div>
                )}
              </div>
              <div className="ml-2">{address.city}</div>
              <div className="flex flex-row ml-2">
                {address.zip && (
                  <>
                    <div>{address.state + ","}&nbsp;</div>
                    <div className=""> {address.zip}</div>
                  </>
                )}{" "}
              </div>
              {address.zip && <div className="ml-2">{address.country}</div>}
            </div>
            <div className="text-left rounded-lg w-full mt-4 mb-8">
              {" "}
              <div className="text-left font-myfont mt-8 mb-4">
                <h className="text-xl">배송받는 분</h>
              </div>{" "}
              <div className="ml-2">{address.name}</div>
              <div className="ml-2">{address.phone}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
