import shortenString from "@/utills/shortenString";
import CopyToClipboard from "@/components/atoms/CopyToClipboard";

type Props = {
  closeModal: () => void;
  hash: `0x${string}` | undefined;
};

const Completed = ({ closeModal, hash }: Props) => {
  const effctiveHash = hash ? shortenString(hash, 11, "middle") : "";

  return (
    <div className="flex flex-col items-center my-6 mx-2">
      <div className="text-xl font-bold">Transaction sent</div>
      <div className="text-center mt-4">Your collection is deployed! You can check the transaction</div>
      {hash && (
        <div className="mt-4 flex items-center">
          <div className="mr-1">Transaction Hash: {effctiveHash}</div>
          <CopyToClipboard text={hash} iconSize={18} />
        </div>
      )}
      <button className="text-sm font-semibold border border-0.5 rounded-xl w-32 py-2 mt-6" onClick={closeModal}>
        Continue
      </button>
    </div>
  );
};

export default Completed;
