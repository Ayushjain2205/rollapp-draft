import React from "react";
import Page from "../components/Layout/Page";
import Link from "next/link";

const test = () => {
  return (
    <Page showMenu>
      <p className="text-[32px] mb-[24px]">YOUR STAMPS</p>
      <Link href="/passport">
        <img src="/svgs/passport.svg" alt="" />
      </Link>
    </Page>
  );
};

export default test;
