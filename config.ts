import { http, createConfig } from "wagmi";
import { polygonMumbai, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [polygonMumbai, sepolia],
  connectors: [],
  ssr: true,
  transports: {
    [polygonMumbai.id]: http(),
    [sepolia.id]: http(),
  },
});
