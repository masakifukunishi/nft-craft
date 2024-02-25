type Props = {
  selectedChainId: number;
  chainId: number;
  chainName: string;
  handleChainChange: (chainId: number) => void;
};

const TabItem = ({ selectedChainId, chainId, chainName, handleChainChange }: Props) => {
  const isActive = selectedChainId === chainId;
  const className = isActive
    ? "inline-block p-4 border-b-2 rounded-t-lg text-blue-500 border-blue-500"
    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-600";

  return (
    <div className={className} aria-current={isActive ? "page" : undefined} onClick={() => handleChainChange(chainId)}>
      {chainName}
    </div>
  );
};

export default TabItem;
