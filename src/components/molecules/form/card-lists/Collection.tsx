import CollectionCard from "@/components/molecules/form/cards/Collection";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

type Collection = {
  collectionAddress: `0x${string}` | null;
  symbol: string;
  name: string;
};

type Props = {
  collections: Collection[] | undefined;
  selectedCollectionAddress: `0x${string}` | null;
  handleCollectionChange: (selectedBlockhain: `0x${string}` | null) => void;
  errorMessage?: string;
};

const CollectionCardList = ({ collections, selectedCollectionAddress, handleCollectionChange, errorMessage }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {collections &&
          collections.map((collection) => (
            <div className="mr-3" key={collection.collectionAddress}>
              <CollectionCard
                collectionAddress={collection.collectionAddress}
                symbol={collection.symbol}
                name={collection.name}
                selectedCollectionAddress={selectedCollectionAddress}
                handleCollectionChange={handleCollectionChange}
              />
            </div>
          ))}
      </div>
      <ErrorMessage error={errorMessage} />
    </>
  );
};

export default CollectionCardList;
