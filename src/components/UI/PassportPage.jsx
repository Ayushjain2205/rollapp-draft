import React, { useState } from "react";
import Stamp from "./Stamp";
import { QRCode } from "react-qrcode-logo";

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
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };
  return (
    <div>
      <div className="flex flex-col items-center h-[498px] w-[348px] rounded-[8px] border-[3px] border-black bg-white pt-[12px] px-[23px]">
        <Stamp color={stampColor} image={stampImage} />
        <p className="w-full text-[32px] font-[700]">{huntName}</p>
        <p className="w-full text-[#F24E1E] font-[700]">
          Expires: {expiryDate}
        </p>
        <span className="w-full h-[22px] mt-[8px] text-[12px] text-[#00000058] font-[500]">
          UTILITY:
        </span>
        <div className="flex flex-row gap-[50px] h-[133px] w-[302px] px-[36px] py-[22px] border-[2px] border-black rounded-[6px]">
          <div className="flex flex-col items-center gap-[12px] w-[81px]">
            <img
              className="h-[32px] w-[32px]"
              src="/svgs/utility1.svg"
              alt=""
            />
            <span className="text-[12px] text-[#00000054] leading-[14px] tracking-[0.2px]">
              {utilityOne}
            </span>
          </div>
          <div className="flex flex-col items-center gap-[12px] w-[81px]">
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
        <div
          className="absolute flex bottom-0 w-full h-[48px] items-center bg-[#262626] rounded-[8px]"
          onClick={toggleOverlay}
        >
          <p className="text-center text-white w-full">Claim utility</p>
        </div>
      </div>
      {showOverlay && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#FFC022] bg-opacity-40 flex justify-center items-center rounded-[8px]"
          onClick={toggleOverlay}
        >
          <div className="flex flex-col items-center justify-center bg-white  h-[221px] w-[243px] border-black border-2 rounded-[10px]">
            <QRCode
              value="https://example.com"
              qrStyle="dots"
              bgColor="#FFFFFF"
              fgColor="#000"
              size={140}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportPage;
