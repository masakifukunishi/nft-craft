import Link from "next/link";
import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const UserMenu = ({ setIsOpen }: Props) => {
  const { disconnect } = useDisconnect();
  const handleLogout = async () => {
    disconnect();
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <ul
        className="absolute bg-base-black font-semibold rounded-xl right-0 border border-1 border-gray-600 w-56 py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-35">
          <Link href="/items/nfts">My NFTs </Link>
        </li>
        <div onClick={() => handleLogout()}>
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-35">Logout</li>
        </div>
      </ul>
    </>
  );
};

export default UserMenu;
