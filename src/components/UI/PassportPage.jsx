import React from "react";
import Stamp from "./Stamp";

const PassportPage = () => {
  return (
    <div>
      <div className="flex flex-col h-[458px] w-[348px] rounded-[8px] border-[3px] border-black bg-white">
        <Stamp image="/images/mickey.png" />
      </div>
    </div>
  );
};

export default PassportPage;
