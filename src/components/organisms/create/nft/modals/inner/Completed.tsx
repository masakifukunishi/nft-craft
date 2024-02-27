import shortenString from "@/utills/shortenString";

type Props = {
  closeModal: () => void;
  hash: `0x${string}` | undefined;
};

const Completed = ({ closeModal, hash }: Props) => {
  const hashShortened = hash ? shortenString(hash, 11, "middle") : "";
  return (
    <div className="flex flex-col items-center my-6">
      <div className="text-xl font-bold">Transaction sent</div>
      <div className="text-center mt-4">Your nft is deployed! You can check the transaction</div>
      {hash && <div className="mt-4">Transaction Hash: {hashShortened}</div>}
      <button className="text-sm font-semibold border border-0.5 rounded-xl w-40 py-2 mt-4" onClick={closeModal}>
        Continue
      </button>
    </div>
  );
};

export default Completed;
