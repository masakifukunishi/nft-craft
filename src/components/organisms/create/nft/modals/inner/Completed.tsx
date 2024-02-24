import shortenString from "@/lib/shortenString";

type Props = {
  closeModal: () => void;
  hash: `0x${string}` | undefined;
};

const Completed = ({ closeModal, hash }: Props) => {
  const hashShortened = hash ? shortenString(hash, 10) : "";
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mt-4">Transaction sent</div>
      <div className="text-center mt-4">Your nft is deployed! You can check the transaction</div>
      {hash && <div className="mt-4">Transaction Hash: {hashShortened}</div>}
      <button className="border border-0.5 rounded w-48 py-2 mt-4" onClick={closeModal}>
        Continue
      </button>
    </div>
  );
};

export default Completed;
