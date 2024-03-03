import Spinner from "@/components/atoms/Spinner";

type Props = {
  closeModal: () => void;
};

const Creating = ({ closeModal }: Props) => {
  return (
    <div className="flex flex-col items-center my-6">
      <Spinner size={42} borderWidth={5} />

      <div className="text-xl font-bold mt-6">Loading...</div>
      <div className="text-center mt-4">To continue send transaction with your wallet</div>
      <button className="text-sm font-semibold border border-0.5 rounded-xl w-32 py-2 mt-6" onClick={closeModal}>
        Cancel
      </button>
    </div>
  );
};

export default Creating;
