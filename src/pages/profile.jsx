import React from "react";
import Page from "../components/Layout/Page";
import {
  useAddress,
  useWalletConfig,
  ConnectWallet,
} from "@thirdweb-dev/react";

const profile = () => {
  const address = useAddress();
  const walletConfig = useWalletConfig();

  return (
    <Page>
      <ConnectWallet />
    </Page>
  );
};

export default profile;
