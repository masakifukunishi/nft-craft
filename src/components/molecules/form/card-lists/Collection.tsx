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
  errorMessage?: string | undefined;
};

const CollectionCardList = ({ collections, selectedCollectionAddress, handleCollectionChange, errorMessage }: Props) => {
  return (
    <>
      <div className="flex flex-wrap -m-2">
        {collections &&
          collections.length > 0 &&
          collections.map((collection) => (
            <div className="p-2" key={collection.collectionAddress}>
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
