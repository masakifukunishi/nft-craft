import BlockchainCard from "@/components/molecules/form/cards/Blockchain";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

type Blockchain = {
  id: number;
  name: string;
  imagePath: string;
};

type Props = {
  blockchains: Blockchain[];
  selectedChainId: number | undefined;
  handleBlockchainChange: (selectedBlockhain: number) => void;
  errorMessage?: string;
};

const BlockchainCardList = ({ blockchains, selectedChainId, handleBlockchainChange, errorMessage }: Props) => {
  return (
    <>
      <div className="flex flex-wrap -m-2">
        {blockchains.map((blockchain) => (
          <div className="p-2" key={blockchain.id}>
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
