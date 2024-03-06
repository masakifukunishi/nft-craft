import Link from "next/link";
import { useDispatch } from "react-redux";
import { setModalState } from "@/store/slicers/authModal";
import { useAuth } from "@/hooks/useAuth";

type AuthLinkProps = {
  href: string;
  children: React.ReactNode;
};

const AuthLink = ({ href, children }: AuthLinkProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const openModal = () => dispatch(setModalState({ isOpen: true }));

  return isAuthenticated ? (
    <Link className="block" href={href}>
      {children}
    </Link>
  ) : (
    <div onClick={openModal}>{children}</div>
  );
};

export default AuthLink;
