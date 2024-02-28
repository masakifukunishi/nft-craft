import TabItem from "@/components/organisms/items/common/blockchains-tab/Item";
import { loadChainList } from "@/utills/load";

type Props = {
  handleChainChange: (chainId: number) => void;
  selectedChainId: number;
};

const BlockchainsTab = ({ handleChainChange, selectedChainId }: Props) => {
  const chains = loadChainList();
  return (
    <div className="text-sm font-medium text-center border-b text-gray-400 border-gray-700">
      <ul className="flex flex-wrap -mb-px">
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
