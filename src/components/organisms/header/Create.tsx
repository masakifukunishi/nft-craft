import { useState } from "react";

import CreateMenu from "@/components/organisms/header/drop-down-menu/CreateMenu";

const Create = () => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="font-semibold cursor-pointer hover:opacity-80 py-4"
        onMouseEnter={() => setIsCreateMenuOpen(true)}
        onMouseLeave={() => setIsCreateMenuOpen(false)}
      >
        Create
      </div>
      {isCreateMenuOpen && <CreateMenu setIsOpen={setIsCreateMenuOpen} />}
    </div>
  );
};

export default Create;
