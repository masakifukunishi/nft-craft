import Head from "next/head";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Header from "@/components/organisms/header";
import WalletModal from "@/components/organisms/wallet/Modal";
import Seo from "@/components/templates/Seo";

type Props = {
  children: React.ReactNode;
  title: string;
  isUseDefaultTitle?: boolean;
  isRequireWalletConnection?: boolean;
};

const Layout = ({ children, title, isUseDefaultTitle = true, isRequireWalletConnection = false }: Props) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { data: session } = useSession();
  const shouldDisplayContent = !isRequireWalletConnection || (isConnected && session);
  const isModalOpen = isRequireWalletConnection && (!isConnected || !session);

  return (
    <>
      <Seo title={title} isUseDefaultTitle={isUseDefaultTitle} />
      <div>
        <Header />
        {shouldDisplayContent && <div className="px-6">{children}</div>}
        <WalletModal isModalOpen={isModalOpen} closeModal={() => router.push("/")} isShouldCloseOnOverlayClick={false} />
      </div>
    </>
  );
};
export default Layout;
