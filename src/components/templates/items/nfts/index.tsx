import Link from "next/link";
import { useAccount } from "wagmi";

const itemsNFTs = () => {
  const { address } = useAccount();
  return (
    <>
      <div className="bg-green-300 w-10 h-10 rounded-full" />
      <div className="text-lg">Address: {address}</div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li>
            <Link
              href="/items/nfts"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
            >
              NFTs
            </Link>
          </li>
          <li>
            <Link
              href="/items/collections"
              className="inline-block p-4 border-b-2 rounded-t-lg active text-blue-500 border-blue-500"
              aria-current="page"
            >
              Collections
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default itemsNFTs;
