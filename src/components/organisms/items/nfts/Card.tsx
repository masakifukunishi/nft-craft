import Image from "next/image";

import shortenString from "@/utills/shortenString";

type Props = {
  collectionName: string | undefined;
  name: string | undefined;
  image: string | null;
};

const Card = ({ collectionName, name, image }: Props) => {
  const effectiveCollectionName = collectionName ? shortenString(collectionName, 22) : "Unnamed...";
  const effectiveName = name ? shortenString(name, 20) : "Unnamed...";
  return (
    <div className="md:w-60 md:h-80 w-40 h-56 bg-base-black-light rounded-lg relative overflow-hidden">
      {image && (
        <div className="w-full h-2/3 relative">
          <Image src={image} alt="NFT Image" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="px-4 absolute bottom-3 md:bottom-6">
        <h4 className="mb-1 text-gray-400 md:text-base text-sm">{effectiveCollectionName}</h4>
        <h5 className="mb-1 md:text-lg text-sm font-semibold tracking-tight text-white">{effectiveName}</h5>
      </div>
    </div>
  );
};

export default Card;
