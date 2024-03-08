import AuthLink from "@/components/molecules/AuthLink";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateMenu = ({ setIsOpen }: Props) => {
  return (
    <>
      <ul
        className="absolute bg-base-black font-semibold rounded-xl left-0 border border-1 border-gray-600 w-48 py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-35">
          <AuthLink href="/create/collection">Collection</AuthLink>
        </li>
        <li className="cursor-pointer py-2 pl-3 mx-2 rounded hover:bg-gray-700 hover:bg-opacity-35">
          <AuthLink href="/create/nft">NFT</AuthLink>
        </li>
      </ul>
    </>
  );
};

export default CreateMenu;
