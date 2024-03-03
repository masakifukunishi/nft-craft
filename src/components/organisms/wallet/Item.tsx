import Image from "next/image";
import { Connector } from "wagmi";
import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  connector: Connector;
  connectWallet: (connector: Connector) => void;
};

const Item = ({ connector, connectWallet }: Props) => {
  return (
    <div className="my-3" key={connector.uid}>
      <div
        className="bg-base-black-light flex items-center py-4 pl-4 rounded-lg cursor-pointer hover:bg-gray-700 hover:bg-opacity-85"
        onClick={() => connectWallet(connector)}
      >
        {connector.icon ? <Image src={connector.icon} width={24} height={24} alt="Wallet icon" /> : <FaRegUserCircle size={32} />}
        <div className="ml-2.5 font-bold"> {connector.name}</div>
      </div>
    </div>
  );
};

export default Item;
