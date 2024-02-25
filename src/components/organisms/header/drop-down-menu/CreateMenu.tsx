import Link from "next/link";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateMenu = ({ setIsOpen }: Props) => {
  return (
    <>
      <ul
        className="absolute bg-base-black-light text-lg font-semibold rounded left-0 border border-1 border-gray-600 w-48 py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/create/collection">
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">Collection</li>
        </Link>
        <Link href="/create/nft">
          <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-25">NFT</li>
        </Link>
      </ul>
    </>
  );
};

export default CreateMenu;
