import React, { useEffect, useState } from "react";
import Page from "../components/Layout/Page";
import Stamp from "../components/UI/Stamp";
import { useRouter } from "next/router";
import Link from "next/link";
import { huntData } from "../utils/huntData";

const Preview = () => {
  const router = useRouter();
  const { huntId } = router.query;

  const [currentHunt, setCurrentHunt] = useState(null);

  useEffect(() => {
    if (huntId) {
      const hunt = huntData.find(
        (h) => h.huntId.toString() === huntId.toString()
      );
      setCurrentHunt(hunt);
    }
  }, [huntId]);

  if (!currentHunt) {
    return <div>Loading...</div>;
  }

  return (
    <Page back="/hunts" pageColor={currentHunt.color}>
      <div className="relative flex flex-col items-center h-[547px] w-[348px] rounded-[8px] border-[3px] border-black bg-white pt-[12px] px-[23px]">
        <Stamp color={currentHunt.color} image={currentHunt.image} />
        <p className="w-full text-[32px] font-[700]">{currentHunt.huntName}</p>
        <p className="w-full text-[16px] font-[400]">
          {currentHunt.huntDescription}
        </p>
        <span className="w-full h-[22px] mt-[8px] mb-[16px] text-[12px] text-[#00000058] font-[500]">
          Location: {currentHunt.location}
        </span>
        <div className="flex flex-row gap-[50px] h-[133px] w-[302px] px-[36px] py-[22px] border-[2px] border-black rounded-[6px]">
          <div className="flex flex-col items-center gap-[12px] w-[81px]">
            <img
              className="h-[32px] w-[32px]"
              src="/svgs/utility1.svg"
              alt=""
            />
            <span className="text-[12px] text-[#00000054] leading-[14px] tracking-[0.2px]">
              {currentHunt.utilityOne}
            </span>
          </div>
          <div className="flex flex-col items-center gap-[12px] w-[81px]">
            <img
              className="h-[32px] w-[32px]"
              src="/svgs/utility2.svg"
              alt=""
            />
            <span className="text-[12px] text-[#00000054] leading-[14px] tracking-[0.2px]">
              {currentHunt.utilityTwo}
            </span>
          </div>
        </div>
        <Link
          href={{
            pathname: "/puzzle",
            query: { huntId },
          }}
        >
          <div className="flex flex-col items-center justify-center absolute bottom-0 left-0 w-full h-[48px] bg-[#262626]">
            <p className="text-center text-white w-full">Let's play</p>
          </div>
        </Link>
      </div>
    </Page>
  );
};

export default Preview;
