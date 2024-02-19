import BlockchainCard from "@/components/organisms/form/cards/Blockchain";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

type Blockchain = {
  id: number;
  name: string;
  imagePath: string;
};

type Props = {
  blockchains: Blockchain[];
  selectedChainId: number;
  handleBlockchainChange: (selectedBlockhain: number) => void;
  errorMessage?: string;
};

const BlockchainCardList = ({ blockchains, selectedChainId, handleBlockchainChange, errorMessage }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {blockchains.map((blockchain) => (
          <div className="mr-3" key={blockchain.id}>
            <BlockchainCard
              id={blockchain.id}
              imagePath={blockchain.imagePath}
              name={blockchain.name}
              selectedChainId={selectedChainId}
              handleBlockchainChange={handleBlockchainChange}
            />
          </div>
        ))}
      </div>
      <ErrorMessage error={errorMessage} />
    </>
  );
};

export default BlockchainCardList;
