type Props = {
  closeModal: () => void;
};

const Error = ({ closeModal }: Props) => {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="text-xl font-bold mb-5 text-red-400">Error report</div>
      <button className="text-sm font-semibold border border-0.5 rounded-xl w-44 py-2 mt-4" onClick={closeModal}>
        Close and continue
      </button>
    </div>
  );
};

export default Error;
