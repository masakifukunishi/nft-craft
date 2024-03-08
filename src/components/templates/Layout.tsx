import Header from "@/components/organisms/header";
import WalletModal from "@/components/organisms/wallet/Modal";
import Seo from "@/components/templates/Seo";

type Props = {
  children: React.ReactNode;
  title: string;
  isUseDefaultTitle?: boolean;
  isRequireWalletConnection?: boolean;
};

const Layout = ({ children, title, isUseDefaultTitle = true }: Props) => {
  return (
    <>
      <Seo title={title} isUseDefaultTitle={isUseDefaultTitle} />
      <div>
        <Header />
        <div className="px-6">{children}</div>
        <WalletModal />
      </div>
    </>
  );
};
export default Layout;
