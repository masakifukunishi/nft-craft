import Image from "next/image";

import shortenString from "@/utills/shortenString";

type Props = {
  collectionName: string | undefined;
  name: string | undefined;
  image: string | null;
};

const Card = ({ collectionName, name, image }: Props) => {
  const a = "afghawuifghawhifgawiufgawiufgawifgaiuwfhaiuwf";
  const b = "afghawuifghawhifgawiufgawiufgawifgaiuwfhaiuwf";
  const effectiveCollectionName = collectionName ? shortenString(collectionName, 18) : "Unnamed...";
  const effectiveName = name ? shortenString(name, 18) : "Unnamed...";
  return (
    <div className="bg-base-black-light rounded-lg relative overflow-hidden aspect-three-fourths">
      {image && (
        <div className="w-full h-70% relative">
          <Image src={image} alt="NFT Image" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="px-4 absolute bottom-4">
        <h4 className="text-gray-400 text-base">{effectiveCollectionName}</h4>
        <h5 className="font-semibold tracking-tight text-white">{effectiveName}</h5>
      </div>
    </div>
  );
};

export default Card;
