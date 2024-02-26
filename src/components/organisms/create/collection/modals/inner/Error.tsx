type Props = {
  closeModal: () => void;
  retry: () => void;
};

const Error = ({ closeModal, retry }: Props) => {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="text-xl font-bold mb-5">Error report</div>
      <button className="text-sm font-semibold border border-0.5 rounded w-40 py-1.5 mt-5" onClick={retry}>
        Try again
      </button>
      <button className="text-sm font-semibold border border-0.5 rounded w-40 py-1.5 mt-5" onClick={closeModal}>
        Close and continue
      </button>
    </div>
  );
};

export default Error;
