import React, { useState, useEffect } from "react";
import Page from "../components/Layout/Page";
import Stamp from "../components/UI/Stamp";
import Link from "next/link";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import { huntData } from "../utils/huntData";

const Celebration = () => {
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
    return (
      <Page>
        <div>Loading...</div>
      </Page>
    );
  }

  return (
    <Page>
      <Confetti width={400} height={665} />
      <p className="text-[24px] mb-[32px]">YAAYY! YOU WON!</p>
      <Stamp color={currentHunt.color} image={currentHunt.image} large />
      <p className="text-[32px] tracking-[0.2px] font-[700] mb-[64px]">
        {currentHunt.huntName}
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

export default Celebration;
