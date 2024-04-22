import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import { ShardeumSphinx1X } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={ShardeumSphinx1X}
      clientId="a847530a1045ffa564dad14048937e5c"
      supportedWallets={[embeddedWallet()]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
