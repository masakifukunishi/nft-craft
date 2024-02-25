import Link from "next/link";
import { useDisconnect } from "wagmi";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const UserMenu = ({ setIsOpen }: Props) => {
  const { disconnect } = useDisconnect();
  return (
    <>
      <ul
        className="absolute bg-base-black-light text-lg font-semibold rounded right-0 border border-1 border-gray-600 w-56 py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/items/nfts">
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">My NFTs</li>
        </Link>{" "}
        <Link href="/items/collections">
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">My Collection</li>
        </Link>
        <div onClick={() => disconnect()}>
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">Logout</li>
        </div>
      </ul>
    </>
  );
};

export default UserMenu;
