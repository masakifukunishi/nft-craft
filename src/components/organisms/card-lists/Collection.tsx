import CollectionCard from "@/components/molecules/cards/Collection";

type Collection = {
  address: string;
  symbol: string;
  name: string;
};

type Props = {
  collections: Collection[];
  selectedCollectionAddress: string;
  setSelectedCollectionAddress: (selectedBlockhain: string) => void;
};

const CollectionCardList = ({ collections, selectedCollectionAddress, setSelectedCollectionAddress }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {collections.map((collection) => (
        <div className="mr-3" key={collection.address}>
          <CollectionCard
            address={collection.address}
            symbol={collection.symbol}
            name={collection.name}
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectedCollectionAddress={setSelectedCollectionAddress}
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionCardList;
