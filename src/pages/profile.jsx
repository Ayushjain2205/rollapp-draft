import React from "react";
import Page from "../components/Layout/Page";
import { useAddress, useWalletConfig } from "@thirdweb-dev/react";

const profile = () => {
  const address = useAddress();
  const walletConfig = useWalletConfig();

  return (
    <Page>
      profile
      <div>{address}</div>
    </Page>
  );
};

export default profile;
