import TabItem from "@/components/organisms/items/common/blockchains-tab/Item";
import { loadChainList } from "@/utills/load";

type Props = {
  handleChainChange: (chainId: number) => void;
  selectedChainId: number;
};

const BlockchainsTab = ({ handleChainChange, selectedChainId }: Props) => {
  const chains = loadChainList();
  return (
    <div className="inline-block text-sm bg-gray-700 rounded-md p-1">
      <ul className="flex flex-wrap">
        {chains.map((chain) => (
          <TabItem
            key={chain.id}
            chainName={chain.name}
            chainId={chain.id}
            selectedChainId={selectedChainId}
            handleChainChange={handleChainChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default BlockchainsTab;
