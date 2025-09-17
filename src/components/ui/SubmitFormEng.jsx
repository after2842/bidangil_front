"use client";
import React, { useState, useRef, useEffect, use } from "react";
import { BoxIcon, GlobeIcon, Tag, TagIcon } from "lucide-react";
import { AddressScreenEng } from "./AddressScreenEng";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import RequestFormEng from "./RequestFormEng";
import Image from "next/image";
import AddressAutocomplete from "./AddressAutoComp";
import { apiFetch, wsUrl } from "@/lib/api";

export default function Submit_2_Eng() {
  const router = useRouter();
  const { fetchCsrfToken } = useUser();
  const [currentPage, setcurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

  const [forms, setforms] = useState([{ url: "", desc: "" }]);
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

  const title = [
    "Shipping Address & Personal Info",
    "Purchase Request",
    "Confirmation",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("All Forms Data:", forms);
    console.log("Address Data:", address);
    const payload = {
      orders: forms,
      address: address,
    };
    const csrf_token = await fetchCsrfToken();

    try {
      setIsLoading(true);
      const response = await apiFetch("/api/submit_order/", {
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
          "Successfully submitted! \nPlease check 'My Profile' on the main page"
        );
        router.push("/en");
      } else {
        alert("Please log in to use this feature");
        sessionStorage.setItem("savedAddress", JSON.stringify(address));
        sessionStorage.setItem("savedForms", JSON.stringify(forms));
        router.push("/en/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedAddress = sessionStorage.getItem("savedAddress");
    const savedForms = sessionStorage.getItem("savedForms");

    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
      sessionStorage.removeItem("savedAddress");
    }

    if (savedForms) {
      setforms(JSON.parse(savedForms));
      sessionStorage.removeItem("savedForms");
    }
  }, []);

  return (
    <div className="h-screen w-full bg-gray-950 bg-center flex items-center justify-center ">
      <div className="h-screen w-full md:w-[65%] md:h-[85vh] bg-white rounded-2xl text-center p-2 shadow-xl border">
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
          <div className="md:col-span-7 md:row-span-4 md:overflow-y-auto scrollbar-hide h-full">
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
            <div className="flex items-center justify-center gap-[150px] md:gap-[400px]">
              {/* This button only appears if currentPage !== 1 */}
              {currentPage !== 1 && (
                <button
                  className="bg-gray-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => prevPage({ index: currentPage })}
                >
                  Previous
                </button>
              )}
              {currentPage === 1 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => nextPage({ index: currentPage })}
                >
                  Next
                </button>
              )}
              {currentPage === 2 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm"
                  onClick={() => nextPage({ index: currentPage })}
                >
                  Next
                </button>
              )}
              {currentPage == 3 && (
                <button
                  className="bg-blue-500 rounded-3xl py-2 px-8 text-white text-sm "
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <p>Submit</p>
                  )}
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
    <div className=" md:w-full md:h-full rounded-lg bg-gray-100 flex flex-col px-2 pb-12 relative">
      <div className="mx-auto w-full">
        <div className=" text-sm">
          <div className=" w-full flex flex-col">
            {currentPage === 1 && (
              <div>
                <div className="hidden md:flex mt-2 justify-start">
                  <button
                    onClick={() => {
                      router.push("/en");
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
                <div className="md:mt-[100px]">
                  <div className="hidden md:flex ml-2 mb-4">
                    <Image
                      src="/images/alert.png"
                      alt="alert"
                      width={20}
                      height={20}
                      className="object-contain flex-shrink-0"
                    />
                    <h className="ml-1 text-[17px]"> Exchange Rate</h>
                  </div>
                  <div className="hidden md:flex ml-2 mb-4">
                    <Image
                      src="/images/alert.png"
                      alt="alert"
                      width={20}
                      height={20}
                      className="object-contain flex-shrink-0"
                    />
                    <h className="ml-1 text-[17px]">Address & Personal Info</h>
                  </div>
                  <AddressAutocomplete
                    address={address}
                    setAddress={setAddress}
                  />
                  {showMissingModal && (
                    <div className="mt-24 flex absolute bottom-2 md:bottom-12 left-0 w-full justify-center">
                      <h className="text-blue-500">
                        Please fill in all information
                      </h>
                    </div>
                  )}

                  <div></div>
                </div>
              </div>
            )}

            <div className=" hidden md:block mt-12">
              {currentPage === 2 &&
                forms.map(
                  (form, index) =>
                    form.desc !== "" && (
                      <div className="mt-2 w-full" key={index}>
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
                        </button>
                      </div>
                    )
                )}
            </div>

            {currentPage === 3 && (
              <div className="flex flex-col items-center  justify-center mt-[180px]">
                <div>Shipping Address</div>
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
        <AddressScreenEng address={address} setAddress={setAddress} />
      ) : currentPage === 2 ? (
        <RequestFormEng forms={forms} setforms={setforms}></RequestFormEng>
      ) : currentPage === 3 ? (
        <FinalSummary forms={forms} address={address}></FinalSummary>
      ) : null}
    </div>
  );
};

const FinalSummary = ({ forms, address }) => {
  return (
    <div className="w-full h-full ">
      <div className="max-w-2xl p-4 md:p-8  mx-auto">
        <div className="text-left font-myfont mb-4">
          <h className="text-xl">Application Details</h>
        </div>

        {forms &&
          forms.map(
            (form, index) =>
              form.url &&
              form.desc && (
                <div className="flex flex-col " key={index}>
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
                <h className="text-xl">Shipping Information</h>
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
                <h className="text-xl">Recipient Information</h>
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
