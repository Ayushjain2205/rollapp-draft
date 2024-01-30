import React, { useState, useEffect } from "react";
import Cameraview from "../components/CameraView";
import Link from "next/link";
import Stamp from "../components/UI/Stamp";

const Claim = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div>
      <div style={{ zIndex: 10000000, position: "absolute" }}>
        <Link href="/celebration">
          {showImage && (
            <div className="fixed top-[150px] left-[55px] h-[303px] w-[310.5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="310.5"
                height="303"
                viewBox="0 0 310.5 303"
                fill="none"
                className="animate-spin"
              >
                <circle
                  cx="157.25"
                  cy="151.5"
                  r="147"
                  stroke="#F24E1E"
                  strokeWidth="4"
                />
                <circle
                  cx="151.5"
                  cy="157"
                  r="147"
                  stroke="#F24E1E"
                  strokeWidth="4"
                />
              </svg>
              <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Stamp />
              </div>
            </div>
          )}
        </Link>
      </div>
      <div style={{ zIndex: 0 }}>
        <Cameraview />
      </div>
    </div>
  );
};

export default Claim;
