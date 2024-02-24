import Spinner from "@/components/atoms/Spinner";

type Props = {
  closeModal: () => void;
};

const Creating = ({ closeModal }: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-3">
          <Spinner size={42} borderWidth={5} />
        </div>
        <div className="text-xl font-bold mt-8">Loading...</div>
        <div className="text-center mt-4">To continue send transaction with your wallet</div>
        <button className="border border-0.5 rounded w-32 py-2 mt-4" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Creating;
