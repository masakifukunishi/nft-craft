import Head from "next/head";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import Header from "@/components/organisms/header";
import WalletModal from "@/components/organisms/wallet/Modal";

type Props = {
  children: React.ReactNode;
  title: string;
  isUseDefaultTitle?: boolean;
  isRequireWalletConnection?: boolean;
};

const Layout = ({ children, title, isUseDefaultTitle = true, isRequireWalletConnection = false }: Props) => {
  const router = useRouter();
  let isConnected = false;
  if (isRequireWalletConnection) {
    const { isConnected: connected } = useAccount();
    isConnected = connected;
  }
  const effectiveTitle = isUseDefaultTitle ? `${title} | NFT Craft` : title;
  return (
    <>
      <Head>
        <title>{effectiveTitle}</title>
      </Head>
      <div>
        <Header />
        {(isConnected || !isRequireWalletConnection) && <div className="px-6">{children}</div>}
        <WalletModal
          isModalOpen={isConnected === false && isRequireWalletConnection}
          closeModal={() => router.push("/")}
          isShouldCloseOnOverlayClick={false}
        />
      </div>
    </>
  );
};
export default Layout;
