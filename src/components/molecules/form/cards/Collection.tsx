type Props = {
  collectionAddress: `0x${string}` | null;
  name: string;
  symbol: string;
  selectedCollectionAddress: `0x${string}` | null;
  handleCollectionChange: (selectedCollectionAddress: `0x${string}` | null) => void;
};

const CollectionCard = ({ collectionAddress, name, symbol, selectedCollectionAddress, handleCollectionChange }: Props) => {
  const isSelected = selectedCollectionAddress === collectionAddress;
  return (
    <div
      className={`flex flex-col justify-center items-center border w-28 h-28 rounded-md ${
        isSelected ? "border-2 border-blue-500" : "border-gray-50 cursor-pointer"
      }`}
      onClick={() => handleCollectionChange(collectionAddress)}
    >
      <div className="bg-green-300 w-7 h-7 rounded-full"></div>
      <div className="mt-3">{symbol}</div>
      <div>{name}</div>
    </div>
  );
};

export default CollectionCard;
