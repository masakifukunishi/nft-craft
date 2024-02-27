import Image from "next/image";

import shortenString from "@/utills/shortenString";

type Props = {
  collectionName: string | undefined;
  name: string | undefined;
  image: string | null;
};

const Card = ({ collectionName, name, image }: Props) => {
  const effectiveCollectionName = collectionName ? shortenString(collectionName, 22) : "Unnamed...";
  const effectiveName = name ? shortenString(name, 22) : "Unnamed...";
  return (
    <div className="md:w-64 md:h-80 lg:w-72 lg:h-96 w-48 h-64 bg-base-black-light rounded-lg relative overflow-hidden">
      {image && (
        <div className="w-full md:h-2/3 h-3/5 relative">
          <Image src={image} alt="NFT Image" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-5 absolute md:bottom-1 lg:bottom-2 bottom-0">
        <h4 className="mb-1 text-gray-400 md:text-base text-sm">{effectiveCollectionName}</h4>
        <h5 className="mb-1 md:text-lg text-base font-semibold tracking-tight text-white">{effectiveName}</h5>
      </div>
    </div>
  );
};

export default Card;
