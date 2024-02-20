import CollectionCard from "@/components/organisms/form/cards/Collection";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

type Collection = {
  collectionAddress: string;
  symbol: string;
  name: string;
};

type Props = {
  collections: Collection[];
  selectedCollectionAddress: string;
  handleCollectionChange: (selectedBlockhain: string) => void;
  errorMessage?: string;
};

const CollectionCardList = ({ collections, selectedCollectionAddress, handleCollectionChange, errorMessage }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {collections.map((collection) => (
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
