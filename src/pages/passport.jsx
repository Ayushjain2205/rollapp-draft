import React from "react";
import Page from "../components/Layout/Page";
import PassportPage from "../components/UI/PassportPage";

const passport = () => {
  return (
    <Page back="/passport-cover" pageColor="#FFC022" showMenu>
      <PassportPage />
    </Page>
  );
};

export default passport;
