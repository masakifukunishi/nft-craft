import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";
import { getCsrfToken, useSession, signIn } from "next-auth/react";

export default function Auth() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const response = await signIn("siwe", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* {!isConnected && <w3m-button />} */}
      {isConnected && (
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Message to Login
        </button>
      )}
      {isConnected && session && <p>お前はログインしている</p>}
    </main>
  );
}
