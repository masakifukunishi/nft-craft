import Link from "next/link";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateMenu = ({ setIsOpen }: Props) => {
  return (
    <>
      <ul
        className="absolute bg-base-black text-lg font-semibold rounded left-0 border border-1 border-gray-600 w-56 py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">
          <Link href="/create/collection">Collection</Link>
        </li>
        <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">
          <Link href="/create/nft">NFT</Link>
        </li>
      </ul>
    </>
  );
};

export default CreateMenu;
