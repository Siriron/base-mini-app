"use client";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { baseMainnet } from "../lib/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Configure chains
const { chains, publicClient } = configureChains([baseMainnet], [publicProvider()]);

// Add your WalletConnect Project ID here (required)
const { connectors } = getDefaultWallets({
  appName: "Base Mini App",
  chains,
  projectId: "YOUR_PROJECT_ID" // <-- replace with your WalletConnect projectId
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
