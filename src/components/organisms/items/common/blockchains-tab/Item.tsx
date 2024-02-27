type Props = {
  selectedChainId: number;
  chainId: number;
  chainName: string;
  handleChainChange: (chainId: number) => void;
};

const TabItem = ({ selectedChainId, chainId, chainName, handleChainChange }: Props) => {
  const isActive = selectedChainId === chainId;
  const tabItemClassName = isActive ? "bg-gray-500" : "";

  return (
    <div
      className={`rounded-md mx-1 py-1.5 px-3 cursor-pointer ${tabItemClassName}`}
      aria-current={isActive ? "page" : undefined}
      onClick={() => handleChainChange(chainId)}
    >
      {chainName}
    </div>
  );
};

export default TabItem;
