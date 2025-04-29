"use client";
import React, { useContext, useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Sparkles } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function UserProfile() {
  // Replace with your actual user info from getServerSideProps or an API request //bg-[#030819]

  const { profileData, user, fetchProfileData } = useUser();
  const [inprogressData, setinprogressData] = useState([]);
  const [pastData, setpastData] = useState([]);
  const [showPayment, setshowPayment] = useState([]);

  useEffect(() => {
    fetchProfileData();
    console.log("fetch profile data!");
  }, []);

  useEffect(() => {
    const past = profileData?.filter((data) => data?.Steps?.[4]?.isDone);
    const inprogress = profileData?.filter((data) => !data?.Steps?.[4]?.isDone);
    setpastData(past);
    setinprogressData(inprogress);

    inprogressData?.forEach((data) => {
      if (data["Payment"]) {
        console.log("why???");
        if (!data["Payment"]["item_is_paid"]) {
          setshowPayment((prev) => [...prev, true]);
        } else if (
          data["Payment"]["item_is_paid"] &&
          !data["Payment"]["delivery_price"]
        ) {
          setshowPayment((prev) => [...prev, false]);
        } else if (
          data["Payment"]["item_is_paid"] &&
          data["Payment"]["delivery_price"] &&
          !data["Payment"]["delivery_is_paid"]
        ) {
          setshowPayment((prev) => [...prev, true]);
        } else if (
          data["Payment"]["item_is_paid"] &&
          data["Payment"]["delivery_price"] &&
          data["Payment"]["delivery_is_paid"]
        ) {
          setshowPayment((prev) => [...prev, false]);
        }
      } else {
        console.log("normal");
        setshowPayment((prev) => [...prev, false]);
      }
    });
  }, [profileData]);
  useEffect(() => {
    console.log("showpay", showPayment);
  }, [showPayment]);

  return (
    <div className="min-h-screen  text-white bg-gray-950 px-4 py-6">
      {/* Welcome Banner */}
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl font-semibold font-myfont text-center">
          {user && user.nickname + " 님 안녕하세요"}
        </h2>
      </div>

      {/* In-Progress Orders */}
      <div className="max-w-4xl mx-auto mb-12 mt-10">
        <h3 className="text-3xl font-bold mb-0 font-myfont">진행 중인 주문</h3>
        <div className="space-y-4 mt-4">
          {inprogressData && inprogressData.length > 0 ? (
            inprogressData.map((order, index) => (
              <GlowingInprogress
                key={index}
                profileData={order}
                showPayment={showPayment[index]}
              />
            ))
          ) : (
            <p>진행 중인 주문이 없습니다.</p>
          )}
        </div>
      </div>

      {/* Past Orders */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-4 font-myfont">지난 주문 내역</h3>
        {pastData && pastData.length === 0 ? (
          <p className="text-gray-300">과거 주문이 없습니다.</p>
        ) : (
          pastData &&
          pastData.map((order) => (
            <div
              key={order.id}
              className="mb-4 p-4 bg-[#2a2a2a] rounded-md flex items-center justify-between"
            >
              <div>
                <div>
                  <p className="font-medium mb-4">name</p>
                </div>
                <p className="text-sm text-gray-400">
                  주문일: {LocalTime(order["order_created_at"])}
                </p>{" "}
                <p className="text-sm text-gray-400">
                  배송완료일: {LocalTime(order.Delivery["delivered_at"])}
                </p>
              </div>
              <div className="text-sm font-semibold text-blue-500">
                {order.Payment["total_price"].toLocaleString()}원
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const GlowingInprogress = ({ profileData, showPayment }) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4 ">
      {" "}
      <div className="relative w-full max-w h-64 rounded-2xl border p-2 bg-gray-100">
        <GlowingEffect
          spread={80}
          borderWidth={3}
          blur={0}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className=" rounded-2xl h-60">
          <div
            className="
            grid grid-cols-2 md:gap-6
            md:grid-cols-2 md:grid-rows-1
            md:grid-flow-row-dense
          "
          >
            <div className="relative flex h-full flex-col justify-between md:gap-4 overflow-hidden rounded-xl">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 md:p-4">
                  {profileData && profileData.length === 0 ? (
                    <p className="text-gray-950">진행 중인 주문이 없습니다.</p>
                  ) : (
                    <div
                      key={profileData.id}
                      className="mb-6 p-4 rounded-md bg-transparent"
                    >
                      <h3 className="md:text-2xl font-semibold text-black dark:text-white md:mb-6">
                        {profileData.items.description}
                      </h3>
                      <div className="space-y-1">
                        {console.log("profileDATAAAAAAA:", profileData)}
                        {profileData &&
                          profileData.Steps &&
                          profileData.Steps.map((step, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 md:text-md "
                            >
                              <div
                                className={`
                        w-3 h-3 rounded-full 
                        ${step.isDone ? "bg-blue-500" : "bg-gray-500"}
                      `}
                              />
                              <span
                                className={` ${step.isDone ? "text-black" : "text-gray-500"}`}
                              >
                                {step.label}
                              </span>

                              {/* <div></div> */}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="pl-[280px] flex flex-col absolute bottom-3">
                {showPayment ? (
                  <div>
                    <div className="md:text-sm text-black">
                      주문일: {LocalTime(profileData.order_created_at)} <br />
                    </div>
                    <button
                      className="bg-blue-500 tex-black rounded-xl px-8 mb-2"
                      onClick={() => {
                        window.open(
                          String(profileData.Payment["stripe_item_url"]),
                          "_blank"
                        );
                      }}
                    >
                      결제하기
                    </button>
                  </div>
                ) : (
                  <div className="md:text-sm text-black">
                    주문일: {LocalTime(profileData.order_created_at)} <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const LocalTime = (isoDate) => {
  const dateObj = new Date(isoDate);
  const localDate = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return localDate;
};
const InProgressGrid = () => {
  <div
    className="
    grid grid-cols-2 gap-0
    md:grid-cols-2 md:grid-rows-0
    md:grid-flow-row-dense
  "
  >
    <InProgressGrid
      sampleInProgressOrders={sampleInProgressOrders}
    ></InProgressGrid>
  </div>;
};
