import Link from "next/link";
import { useAccount } from "wagmi";

import Create from "@/components/organisms/header/Create";
import Profile from "@/components/organisms/header/Profile";
import ConnectWallet from "@/components/organisms/header/ConnectWallet";

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <header className="flex items-center h-18">
        <h1 className="text-2xl font-bold">
          <Link href="/">NFT MINTING</Link>
        </h1>
        <div className="w-px h-7 bg-base-white mx-5"></div>
        <Create />
        <div className="ml-auto">{isConnected ? <Profile /> : <ConnectWallet />}</div>
      </header>
    </>
  );
};

export default Header;
