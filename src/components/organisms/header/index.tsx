import { useState } from "react";
import Link from "next/link";

import User from "@/components/organisms/header/UserIconMenu";
import CreateMenu from "@/components/organisms/header/drop-down-menu/CreateMenu";

const Header = () => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  return (
    <header className="flex items-center px-4 py-2">
      <h1 className="text-2xl font-bold">
        <Link href="/">NFT MINTING</Link>
      </h1>
      <div className="ml-3 relative">
        <div
          className="font-semibold cursor-pointer hover:bg-gray-800 p-2 rounded"
          onMouseEnter={() => setIsCreateMenuOpen(true)}
          onMouseLeave={() => setIsCreateMenuOpen(false)}
        >
          Create
        </div>
        {isCreateMenuOpen && <CreateMenu setIsOpen={setIsCreateMenuOpen} />}
      </div>
      <div className="ml-auto">
        <User />
      </div>
    </header>
  );
};

export default Header;
