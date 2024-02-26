import Image from "next/image";

type Props = {
  collectionName: string;
  name: string;
  image: string | undefined;
};

const Card = ({ collectionName, name, image }: Props) => {
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg">
      {image && <Image src={image} alt="NFT Image" width={0} height={0} layout="responsive" />}
      <div className="p-5">
        <h4 className="mb-1 font-normal text-gray-400">{collectionName}</h4>
        <h5 className="mb-1 text-xl font-bold tracking-tight text-white">{name}</h5>
      </div>
    </div>
  );
};

export default Card;
