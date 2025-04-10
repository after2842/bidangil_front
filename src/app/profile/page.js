"use client";
import React, { useContext } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Sparkles } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
// Example statuses for an in-progress order:
const sampleInProgressOrders = [
  {
    id: 1,
    productName: "Awesome Shoes",
    productName: "Warm T-shirt 외 4개",
    orderDate: "2023-07-10",
    deliveryfee: 12800,
    price: 23100,
    steps: [
      { label: "주문 접수 완료", isDone: true },
      { label: "물건 구매 완료", isDone: true },
      { label: "물건 도착", isDone: true },
      { label: "구매/배송비 결제 완료", isDone: false },
      { label: "배송 시작", isDone: false },
    ],
  },
];

// Example of completed orders
const samplePastOrders = [
  {
    id: 101,
    productName: "Cool T-shirt",
    orderDate: "2023-07-10",
    deliveredDate: "2023-07-14",
    price: 30000,
  },
  {
    id: 102,
    productName: "Fancy Hat",
    orderDate: "2023-06-25",
    deliveredDate: "2023-06-30",
    price: 25000,
  },
  {
    id: 101,
    productName: "Cool T-shirt",
    orderDate: "2023-07-10",
    deliveredDate: "2023-07-14",
    price: 30000,
  },
  {
    id: 102,
    productName: "Fancy Hat",
    orderDate: "2023-06-25",
    deliveredDate: "2023-06-30",
    price: 25000,
  },
  {
    id: 101,
    productName: "Cool T-shirt",
    orderDate: "2023-07-10",
    deliveredDate: "2023-07-14",
    price: 30000,
  },
  {
    id: 102,
    productName: "Fancy Hat",
    orderDate: "2023-06-25",
    deliveredDate: "2023-06-30",
    price: 25000,
  },
];

export default function UserProfile() {
  // Replace with your actual user info from getServerSideProps or an API request //bg-[#030819]
  const userName = "홍길동";
  const { profileData, user, fetchProfileData } = useUser();
  useEffect(() => {
    fetchProfileData();
  }, []);

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
          {profileData && profileData.length > 0 ? (
            profileData.map((order, index) => (
              <GlowingInprogress
                key={index}
                profileData={order}
                sampleInProgressOrders={sampleInProgressOrders}
                // If you have additional props you want to pass for each order,
                // you can add them here.
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
        {samplePastOrders.length === 0 ? (
          <p className="text-gray-300">과거 주문이 없습니다.</p>
        ) : (
          samplePastOrders.map((order) => (
            <div
              key={order.id}
              className="mb-4 p-4 bg-[#2a2a2a] rounded-md flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{order.productName}</p>
                <p className="text-sm text-gray-400">
                  주문일: {order.orderDate} / 배송완료일: {order.deliveredDate}
                </p>
              </div>
              <div className="text-sm font-semibold text-blue-500">
                ${order.price.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const GlowingInprogress = ({ profileData, sampleInProgressOrders }) => {
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
                  {profileData.length === 0 ? (
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
                        {profileData.Steps.map((step, index) => (
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
                {profileData.Steps[2].isDone ? (
                  <div>
                    <div className="md:text-sm text-black">
                      주문일: {LocalTime(profileData.order_created_at)} <br />
                    </div>
                    <button className="bg-blue-500 tex-black rounded-xl px-8">
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
