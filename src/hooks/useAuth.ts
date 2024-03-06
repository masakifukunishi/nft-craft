import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

export function useAuth() {
  const { isConnected } = useAccount();
  const { data: session } = useSession();

  const isAuthenticated = isConnected && Boolean(session);

  return { isAuthenticated };
}
