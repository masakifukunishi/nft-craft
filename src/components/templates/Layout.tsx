import Head from "next/head";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import Header from "@/components/organisms/header";
import WalletModal from "@/components/organisms/wallet/Modal";

type Props = {
  children: React.ReactNode;
  title: string;
  requireWalletConnection?: boolean;
};

const Layout = ({ children, title, requireWalletConnection = false }: Props) => {
  const router = useRouter();
  let isConnected = false;
  if (requireWalletConnection) {
    const { isConnected: connected } = useAccount();
    isConnected = connected;
  }
  return (
    <>
      <>
        <Head>
          <title>{`${title} | NFT MINTINNG`}</title>
        </Head>
        <div>
          <Header />
          {(isConnected || !requireWalletConnection) && <div>{children}</div>}
        </div>
      </>
      <WalletModal isModalOpen={isConnected === false && requireWalletConnection} closeModal={() => router.push("/")} />
    </>
  );
};
export default Layout;
