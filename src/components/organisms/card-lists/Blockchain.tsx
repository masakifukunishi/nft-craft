import BlockchainCard from "@/components/molecules/cards/Blockchain";

type Blockchain = {
  id: number;
  name: string;
  imagePath: string;
};

type Props = {
  blockchains: Blockchain[];
  selectedBlockhainId: number;
  setSelectedBlockhainId: (selectedBlockhain: number) => void;
};

const BlockchainCardList = ({ blockchains, selectedBlockhainId, setSelectedBlockhainId }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {blockchains.map((blockchain) => (
        <div className="mr-3" key={blockchain.id}>
          <BlockchainCard
            id={blockchain.id}
            imagePath={blockchain.imagePath}
            name={blockchain.name}
            selectedBlockhainId={selectedBlockhainId}
            setSelectedBlockhainId={setSelectedBlockhainId}
          />
        </div>
      ))}
    </div>
  );
};

export default BlockchainCardList;
