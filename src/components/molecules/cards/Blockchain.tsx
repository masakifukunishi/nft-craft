import Image from "next/image";

type Props = {
  name: string;
  imagePath: string;
};
const BlockchainCard = ({ name, imagePath }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center border w-28 h-28 rounded-md cursor-pointer">
      <Image src={imagePath} width={32} height={32} alt={`${name} icon`} />
      <div className="mt-2">{name}</div>
    </div>
  );
};

export default BlockchainCard;
