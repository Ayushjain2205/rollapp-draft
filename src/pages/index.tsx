import React, { useState, useEffect } from "react";
import Page from "../components/Layout/Page";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { useRouter } from "next/router"; // Import useRouter from Next.js

export default function Home() {
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [animateMoveUp, setAnimateMoveUp] = useState(false);
  const router = useRouter(); // Create the router object
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    // Set a timer for 3 seconds
    const timer = setTimeout(() => {
      // Check the connection status after 3 seconds
      if (connectionStatus === "connected") {
        console.log("connected");
        router.push("/hunts"); // Navigate to /test if connected
      } else {
        setAnimateMoveUp(true);
        // Additional timeout to wait for the move-up animation to complete
        const walletTimer = setTimeout(() => {
          setShowConnectWallet(true);
        }, 500); // Adjust the timing as needed for your animation duration

        return () => clearTimeout(walletTimer);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [connectionStatus, router]); // Include connectionStatus and router in the dependency array

  return (
    <Page pageColor="#f0f0f0">
      <div
        className={`transition-all duration-500 ease-in-out ${
          animateMoveUp ? "translate-y-[-130px]" : ""
        }`}
      >
        <img className="animate-pulse" src="/svgs/logo.svg" alt="" />
        <p className="text-[32px] font-[500] w-full text-center">stamps!</p>
      </div>
      {showConnectWallet && (
        <div>
          <ConnectWallet btnTitle="Get started" />
        </div>
      )}
      <p className="absolute bottom-[36px] text-[16px]">by entropy labs</p>
    </Page>
  );
}
