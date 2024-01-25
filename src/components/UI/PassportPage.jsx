import React from "react";
import Stamp from "./Stamp";

const PassportPage = ({
  huntName,
  expiryDate,
  stampImage,
  stampColor,
  utilityOne,
  utilityTwo,
  utilityOneType,
  utilityTwoType,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center h-[458px] w-[348px] rounded-[8px] border-[3px] border-black bg-white pt-[12px] px-[23px]">
        <Stamp color={stampColor} image={stampImage} />
        <p className="w-full text-[32px] font-[700]">{huntName}</p>
        <p className="w-full text-[#F24E1E] font-[700]">
          Expires: {expiryDate}
        </p>
        <span className="w-full h-[22px] mt-[8px] text-[12px] text-[#00000058] font-[500]">
          UTILITY:
        </span>
        <div className="flex flex-row gap-[50px] h-[133px] w-[302px] px-[36px] py-[22px] border-[2px] border-black rounded-[6px]">
          <div className="flex flex-col gap-[12px] w-[81px]">
            <img
              className="h-[32px] w-[32px]"
              src="/svgs/utility1.svg"
              alt=""
            />
            <span className="text-[12px] text-[#00000054] leading-[14px] tracking-[0.2px]">
              {utilityOne}
            </span>
          </div>
          <div className="flex flex-col gap-[12px] w-[81px]">
            <img
              className="h-[32px] w-[32px]"
              src="/svgs/utility2.svg"
              alt=""
            />
            <span className="text-[12px] text-[#00000054] leading-[14px] tracking-[0.2px]">
              {utilityTwo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportPage;
