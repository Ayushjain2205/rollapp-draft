import Link from "next/link";
import React, { useState } from "react";

const Page = ({
  children,
  pageColor = "#FFFFFF",
  showMenu = false,
  back = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div
      className="relative flex flex-col items-center h-[665px] w-[390px] p-[20px]"
      style={{ backgroundColor: pageColor }}
    >
      <div className="flex flex-row justify-between w-full">
        {back ? (
          <Link href={back}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ cursor: "pointer" }}
            >
              <path
                d="M18.0357 9.15193H4.97548L12.7924 2.36621C12.9174 2.25684 12.8415 2.05371 12.6764 2.05371H10.7009C10.6139 2.05371 10.5313 2.08496 10.4665 2.14076L2.03128 9.45996C1.95402 9.52693 1.89206 9.60972 1.8496 9.70273C1.80713 9.79573 1.78516 9.89678 1.78516 9.99902C1.78516 10.1013 1.80713 10.2023 1.8496 10.2953C1.89206 10.3883 1.95402 10.4711 2.03128 10.5381L10.5157 17.9019C10.5491 17.9309 10.5893 17.9466 10.6317 17.9466H12.6741C12.8393 17.9466 12.9152 17.7412 12.7902 17.6341L4.97548 10.8484H18.0357C18.134 10.8484 18.2143 10.768 18.2143 10.6698V9.3305C18.2143 9.23228 18.134 9.15193 18.0357 9.15193Z"
                fill="black"
                fill-opacity="0.85"
              />
            </svg>
          </Link>
        ) : (
          <div style={{ width: "20px", height: "20px" }}></div>
        )}

        {showMenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={toggleDropdown}
            className="cursor-pointer"
          >
            <path
              d="M0 7.33333H20M0 2H20M0 12.6667H20M0 18H20"
              stroke="#262626"
            />
          </svg>
        )}
        {showDropdown && (
          <div className="flex flex-col gap-[10px] w-[150px] absolute top-[50px] right-[20px] bg-white shadow-md rounded-lg p-4 z-50">
            <Link href="/hunts">Hunt</Link>
            <Link href="/profile">My Profile</Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default Page;
