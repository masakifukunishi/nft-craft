import shortenString from "@/utills/shortenString";

type Props = {
  collectionAddress: `0x${string}` | null;
  name: string;
  symbol: string;
  selectedCollectionAddress: `0x${string}` | null;
  handleCollectionChange: (selectedCollectionAddress: `0x${string}` | null) => void;
};

const CollectionCard = ({ collectionAddress, name, symbol, selectedCollectionAddress, handleCollectionChange }: Props) => {
  const isSelected = selectedCollectionAddress === collectionAddress;
  const effectiveName = name ? shortenString(name, 34, "end") : "";
  return (
    <div
      className={`flex flex-col justify-center items-center border w-28 h-28 break-words rounded-md ${
        isSelected ? "border-2 border-blue-500" : "border-gray-50 cursor-pointer"
      }`}
      onClick={() => handleCollectionChange(collectionAddress)}
    >
      <div className="bg-green-300 w-3 h-3 rounded-full"></div>
      <div className="mt-2 text-sm">{symbol}</div>
      <div className="text-sm break-words w-24">{effectiveName}</div>
    </div>
  );
};

export default CollectionCard;
