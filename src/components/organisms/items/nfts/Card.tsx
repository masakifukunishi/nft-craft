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
    <div className="sm:w-40 sm:h-56 md:w-56 md:h-72 w-60 h-80 bg-base-black-light rounded-lg relative overflow-hidden ">
      {image && (
        <div className="w-full h-70% relative">
          <Image src={image} alt="NFT Image" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="px-4 absolute  bottom-5">
        <h4 className="text-gray-400 sm:text-sm md:text-base text-base">{effectiveCollectionName}</h4>
        <h5 className="sm:text-sm md:text-lg text-lg font-semibold tracking-tight text-white">{effectiveName}</h5>
      </div>
    </div>
  );
};

export default Card;
