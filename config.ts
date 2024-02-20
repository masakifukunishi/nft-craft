import { http, createConfig } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, polygon, sepolia],
  connectors: [],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
});
