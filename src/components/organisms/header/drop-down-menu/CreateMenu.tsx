import Link from "next/link";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateMenu = ({ setIsOpen }: Props) => {
  return (
    <>
      <ul
        className="opacity-95 rounded absolute left-0 py-3 pl-4 pr-6 border"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="cursor-pointer">
          <Link href="/create/collection">Collection</Link>
        </li>
        <li className="cursor-pointer mt-3">
          <Link href="/create/nft">NFT</Link>
        </li>
      </ul>
    </>
  );
};

export default CreateMenu;
