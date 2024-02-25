import { useState } from "react";

import UserMenu from "@/components/organisms/header/drop-down-menu/UserMenu";

const User = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="bg-gray-700 rounded-md cursor-pointer p-2.5"
        onMouseEnter={() => setIsUserMenuOpen(true)}
        onMouseLeave={() => setIsUserMenuOpen(false)}
      >
        <div className="bg-green-300 w-7 h-7 rounded-full" />
      </div>
      {isUserMenuOpen && <UserMenu setIsOpen={setIsUserMenuOpen} />}
    </div>
  );
};

export default User;
