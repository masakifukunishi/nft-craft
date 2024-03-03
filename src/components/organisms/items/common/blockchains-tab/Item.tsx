type Props = {
  selectedChainId: number;
  chainId: number;
  chainName: string;
  handleChainChange: (chainId: number) => void;
};

const TabItem = ({ selectedChainId, chainId, chainName, handleChainChange }: Props) => {
  const isActive = selectedChainId === chainId;
  const tabItemClassName = isActive
    ? "text-blue-500 border-blue-500"
    : "border-transparent hover:border-gray-300 hover:text-gray-600 cursor-pointer";

  return (
    <div
      className={`inline-block p-4 border-b-2 rounded-t-lg  ${tabItemClassName}`}
      aria-current={isActive ? "page" : undefined}
      onClick={() => handleChainChange(chainId)}
    >
      {chainName}
    </div>
  );
};

export default TabItem;
