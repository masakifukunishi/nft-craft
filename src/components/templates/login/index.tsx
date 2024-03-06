import { useDispatch } from "react-redux";
import { setModalState } from "@/store/slicers/authModal";

const Login = () => {
  const dispatch = useDispatch();
  const openModal = () => dispatch(setModalState({ isOpen: true }));
  openModal();
  return (
    <div className="flex justify-center items-center flex-col min-h-[calc(100vh-4.5rem)] ">
      <h1 className="font-bold text-3xl text-lime-300">Please Login</h1>
      <div className="mt-2 text-gray-400">Access your account by logging in.</div>
    </div>
  );
};

export default Login;
