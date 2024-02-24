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
        className="opacity-95 rounded absolute right-0 py-3 pl-4 pr-6 border w-48"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="cursor-pointer">
          <Link href="/items/nfts">My NFTs</Link>
        </li>
        <li className="cursor-pointer mt-3">
          <Link href="/items/collections">My Collection</Link>
        </li>
        <li className="cursor-pointer mt-3">
          <div onClick={() => disconnect()}>Logout</div>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
