import BlockchainCard from "@/components/molecules/cards/Blockchain";

type Blockchain = {
  id: number;
  name: string;
  imagePath: string;
};

type Props = {
  blockchains: Blockchain[];
};

const BlockchainCardList = ({ blockchains }: Props) => {
  return (
    <div className="flex">
      {blockchains.map((blockchain) => (
        <div className="mr-3">
          <BlockchainCard key={blockchain.id} imagePath={blockchain.imagePath} name={blockchain.name} />
        </div>
      ))}
    </div>
  );
};

export default BlockchainCardList;
