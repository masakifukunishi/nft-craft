import { MdOutlineWallet } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setModalState } from "@/store/slicers/authModal";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const openModal = () => dispatch(setModalState({ isOpen: true }));

  return (
    <>
      <button onClick={openModal} className="md:hidden font-bold bg-gray-700 rounded-md cursor-pointer p-2">
        <MdOutlineWallet size={23} />
      </button>
      <button
        onClick={openModal}
        className="hidden md:flex bg-base-white text-base-black font-semibold text-sm py-2 px-3 rounded-md cursor-pointer"
      >
        Connect Wallet
      </button>
    </>
  );
};

export default ConnectWallet;
