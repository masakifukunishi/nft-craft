import { useState } from "react";

import UserMenu from "@/components/organisms/header/drop-down-menu/UserMenu";

const User = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-700 p-2 rounded-md cursor-pointer">
        <div className="relative">
          <div onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
            <div className="bg-green-300 w-7 h-7 rounded-full" />
          </div>
          {isUserMenuOpen && <UserMenu setIsOpen={setIsUserMenuOpen} />}
        </div>
      </div>
    </>
  );
};

export default User;
