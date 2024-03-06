import { useRouter } from "next/router";

import { useAuth } from "@/hooks/useAuth";
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
  const { isAuthenticated } = useAuth();
  const shouldDisplayContent = !isRequireWalletConnection || isAuthenticated;
  const isModalOpen = isRequireWalletConnection && !isAuthenticated;

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
