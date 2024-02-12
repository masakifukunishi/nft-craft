import BlockchainCard from "@/components/molecules/cards/Blockchain";

type Blockchain = {
  id: number;
  name: string;
  imagePath: string;
};

type Props = {
  blockchains: Blockchain[];
  selectedBlockhain: number;
  setSelectedBlockhain: (selectedBlockhain: number) => void;
};

const BlockchainCardList = ({ blockchains, selectedBlockhain, setSelectedBlockhain }: Props) => {
  return (
    <div className="flex">
      {blockchains.map((blockchain) => (
        <div className="mr-3" key={blockchain.id}>
          <BlockchainCard
            id={blockchain.id}
            imagePath={blockchain.imagePath}
            name={blockchain.name}
            selectedBlockhain={selectedBlockhain}
            setSelectedBlockhain={setSelectedBlockhain}
          />
        </div>
      ))}
    </div>
  );
};

export default BlockchainCardList;
