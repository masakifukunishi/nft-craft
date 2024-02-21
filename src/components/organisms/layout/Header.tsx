import { useState } from "react";
import Link from "next/link";

import User from "@/components/organisms/user/UserIconMenu";
import CreateMenu from "@/components/organisms/drop-down-menu/CreateMenu";

const Header = () => {
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState(false);
  return (
    <header className="flex items-center p-2">
      <h1 className="text-2xl font-bold">
        <Link href="/">NFT MINTING</Link>
      </h1>
      <div className="ml-3 relative">
        <div
          className="font-semibold cursor-pointer hover:bg-gray-800 p-2 rounded"
          onMouseEnter={() => setIsOpenCreateMenu(true)}
          onMouseLeave={() => setIsOpenCreateMenu(false)}
        >
          Create
        </div>
        {isOpenCreateMenu && <CreateMenu setIsOpen={setIsOpenCreateMenu} />}
      </div>
      <div className="ml-auto">
        <User />
      </div>
    </header>
  );
};

export default Header;
