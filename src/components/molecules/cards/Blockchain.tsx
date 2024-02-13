import Image from "next/image";

type Props = {
  id: number;
  name: string;
  imagePath: string;
  selectedBlockhainId: number;
  setSelectedBlockhainId: (selectedBlockhain: number) => void;
};

const BlockchainCard = ({ id, name, imagePath, selectedBlockhainId, setSelectedBlockhainId }: Props) => {
  const isSelected = selectedBlockhainId === id;
  return (
    <div
      className={`flex flex-col justify-center items-center border w-28 h-28 rounded-md cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : "border-gray-50"
      }`}
      onClick={() => setSelectedBlockhainId(id)}
    >
      <Image src={imagePath} width={32} height={32} alt={`${name} icon`} />
      <div className="mt-2">{name}</div>
    </div>
  );
};

export default BlockchainCard;
