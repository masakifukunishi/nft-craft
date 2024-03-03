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
  const { isConnected } = useAccount();
  const shouldDisplayContent = !isRequireWalletConnection || isConnected;
  const effectiveTitle = isUseDefaultTitle ? `${title} | NFT Craft` : title;

  return (
    <>
      <Head>
        <title>{effectiveTitle}</title>
      </Head>
      <div>
        <Header />
        {shouldDisplayContent && <div className="px-6">{children}</div>}
        <WalletModal
          isModalOpen={!isConnected && isRequireWalletConnection}
          closeModal={() => router.push("/")}
          isShouldCloseOnOverlayClick={false}
        />
      </div>
    </>
  );
};
export default Layout;
