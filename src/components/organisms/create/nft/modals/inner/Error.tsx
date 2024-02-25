type Props = {
  closeModal: () => void;
};

const Error = ({ closeModal }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mt-4">Error report</div>
      <button className="border border-0.5 rounded w-48 py-2 mt-4" onClick={closeModal}>
        Close and continue
      </button>
    </div>
  );
};

export default Error;
