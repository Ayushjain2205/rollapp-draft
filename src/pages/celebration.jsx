import React from "react";
import Page from "../components/Layout/Page";
import Stamp from "../components/UI/Stamp";
import Link from "next/link";

const celebration = () => {
  return (
    <Page>
      <p className="text-[24px] mb-[32px]">YAAYY! YOU WON!</p>
      <Stamp />
      <p className="text-[32px] tracking-[0.2px] font-[700] mb-[64px]">
        find Mickey!
      </p>
      <Link href="/passport">
        <button className="flex flex-row items-center gap-[8px] text-white bg-[#262626] h-[46px] w-[186px] rounded-[8px] justify-center">
          View my passport
        </button>
      </Link>
      <p className="text-[14px] italic mt-[10px]">
        A new stamp got added to your collection!
      </p>
    </Page>
  );
};

export default celebration;
