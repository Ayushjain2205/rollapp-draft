import React, { useState, useEffect } from "react";
import Cameraview from "../components/CameraView";
import Link from "next/link";
import { useRouter } from "next/router";
import Stamp from "../components/UI/Stamp";
import { huntData } from "../utils/huntData";

const Claim = () => {
  const router = useRouter();
  const { huntId } = router.query;

  const [showImage, setShowImage] = useState(false);
  const [currentHunt, setCurrentHunt] = useState(null);

  useEffect(() => {
    if (huntId) {
      const hunt = huntData.find(
        (h) => h.huntId.toString() === huntId.toString()
      );
      setCurrentHunt(hunt);
    }
  }, [huntId]);

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
        <Link
          href={{
            pathname: "/celebration",
            query: { huntId },
          }}
        >
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
                <Stamp color={currentHunt.color} image={currentHunt.image} />
              </div>
            </div>
          )}
        </Link>
      </div>
      <div className="h-[665px] w-[390px]" style={{ zIndex: 0 }}>
        <Cameraview />
      </div>
    </div>
  );
};

export default Claim;
