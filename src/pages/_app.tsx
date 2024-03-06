import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Provider as ReactReduxProvider } from "react-redux";

import NextAuthProvider from "@/providers/NextAuthProvider";
import { config } from "../../config";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactReduxProvider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NextAuthProvider>{<Component {...pageProps} />}</NextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReactReduxProvider>
  );
}
