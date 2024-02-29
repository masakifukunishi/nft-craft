import Link from "next/link";
import { useAccount } from "wagmi";

import Create from "@/components/organisms/header/Create";
import Profile from "@/components/organisms/header/Profile";
import ConnectWallet from "@/components/organisms/header/ConnectWallet";

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center h-18 px-6 sticky bg-base-black bg-opacity-95">
        <h1 className="text-2xl font-bold">
          <Link href="/">NFT Minting</Link>
        </h1>
        <div className="w-px h-7 bg-base-white mx-5"></div>
        <Create />
        <div className="ml-auto">{isConnected ? <Profile /> : <ConnectWallet />}</div>
      </header>
    </>
  );
};

export default Header;
