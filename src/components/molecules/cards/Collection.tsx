type Props = {
  address: string;
  name: string;
  symbol: string;
  selectedCollectionAddress: string;
  setSelectedCollectionAddress: (selectedCollectionAddress: string) => void;
};

const CollectionCard = ({ address, name, symbol, selectedCollectionAddress, setSelectedCollectionAddress }: Props) => {
  const isSelected = selectedCollectionAddress === address;
  return (
    <div
      className={`flex flex-col justify-center items-center border w-28 h-28 rounded-md cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : "border-gray-50"
      }`}
      onClick={() => setSelectedCollectionAddress(address)}
    >
      <div className="bg-green-300 w-7 h-7 rounded-full"></div>
      <div className="mt-3">{symbol}</div>
      <div>{name}</div>
    </div>
  );
};

export default CollectionCard;
