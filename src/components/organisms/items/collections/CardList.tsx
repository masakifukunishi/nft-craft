import { v4 as uuidv4 } from "uuid";
import { type EvmNftCollection } from "@moralisweb3/common-evm-utils";

import Card from "@/components/organisms/items/collections/Card";

type Props = {
  collections: EvmNftCollection[];
};

const CardList = ({ collections }: Props) => {
  return (
    <div>
      {collections.map((collection: EvmNftCollection) => {
        return <Card key={uuidv4()} name={collection.name} />;
      })}
    </div>
  );
};

export default CardList;
