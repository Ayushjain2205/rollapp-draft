import React, { useState } from "react";
import Page from "../components/Layout/Page";
import PassportPage from "../components/UI/PassportPage";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";

const Passport = () => {
  const [selected, setSelected] = useState(0);
  const totalPages = 3;

  const goToPreviousPage = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };

  const goToNextPage = () => {
    if (selected < totalPages - 1) {
      setSelected(selected + 1);
    }
  };

  return (
    <Page back="/passport-cover" pageColor="#FFC022" showMenu>
      <div className="absolute top-[65px] left-[21px] w-[348px] h-[458px]">
        <FlippingPages
          direction="right-to-left"
          onSwipeEnd={setSelected}
          selected={selected}
        >
          <PassportPage
            huntName="Mickey's hunt"
            expiryDate="2024-12-31"
            stampImage="/images/mickey.png"
            stampColor="#FF0205"
            utilityOne="Free Entry to Disneyland"
            utilityTwo="20% Off at Disney Store"
          />
          <PassportPage
            huntName="Mickey's hunt"
            expiryDate="2024-12-31"
            stampImage="/images/mickey.png"
            stampColor="#FFFF05"
            utilityOne="Free Entry to Disneyland"
            utilityTwo="20% Off at Disney Store"
          />
          <PassportPage
            huntName="Mickey's hunt"
            expiryDate="2024-12-31"
            stampImage="/images/mickey.png"
            stampColor="#FF00FF"
            utilityOne="Free Entry to Disneyland"
            utilityTwo="20% Off at Disney Store"
          />
        </FlippingPages>

        <div className="flex justify-between mt-4">
          <button
            className="flex flex-col items-center justify-center h-[36px] w-[36px] rounded-full bg-[#363436]"
            onClick={goToPreviousPage}
            disabled={selected === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M0.964256 8.84808L14.0245 8.84807L6.20756 15.6338C6.08256 15.7432 6.15845 15.9463 6.32363 15.9463L8.29908 15.9463C8.38613 15.9463 8.46872 15.915 8.53345 15.8592L16.9687 8.54004C17.046 8.47307 17.1079 8.39028 17.1504 8.29727C17.1929 8.20427 17.2148 8.10322 17.2148 8.00098C17.2148 7.89873 17.1929 7.79769 17.1504 7.70468C17.1079 7.61167 17.046 7.52888 16.9687 7.46191L8.48434 0.0980738C8.45086 0.069056 8.41068 0.053431 8.36827 0.053431L6.32586 0.0534312C6.16068 0.0534312 6.08479 0.258788 6.20979 0.365931L14.0245 7.15165L0.964255 7.15165C0.866041 7.15165 0.785684 7.232 0.785684 7.33022L0.785684 8.6695C0.785684 8.76772 0.866041 8.84808 0.964256 8.84808Z"
                fill="white"
                fill-opacity="0.85"
                transform="scale(-1, 1) translate(-18, 0)"
              />
            </svg>
          </button>
          <button
            className="flex flex-col items-center justify-center h-[36px] w-[36px] rounded-full bg-[#363436]"
            onClick={goToNextPage}
            disabled={selected === totalPages - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M0.964256 8.84808L14.0245 8.84807L6.20756 15.6338C6.08256 15.7432 6.15845 15.9463 6.32363 15.9463L8.29908 15.9463C8.38613 15.9463 8.46872 15.915 8.53345 15.8592L16.9687 8.54004C17.046 8.47307 17.1079 8.39028 17.1504 8.29727C17.1929 8.20427 17.2148 8.10322 17.2148 8.00098C17.2148 7.89873 17.1929 7.79769 17.1504 7.70468C17.1079 7.61167 17.046 7.52888 16.9687 7.46191L8.48434 0.0980738C8.45086 0.069056 8.41068 0.053431 8.36827 0.053431L6.32586 0.0534312C6.16068 0.0534312 6.08479 0.258788 6.20979 0.365931L14.0245 7.15165L0.964255 7.15165C0.866041 7.15165 0.785684 7.232 0.785684 7.33022L0.785684 8.6695C0.785684 8.76772 0.866041 8.84808 0.964256 8.84808Z"
                fill="white"
                fill-opacity="0.85"
              />
            </svg>
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Passport;
