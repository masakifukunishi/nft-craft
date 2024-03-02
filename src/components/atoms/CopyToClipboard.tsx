import React, { useState } from "react";
import { IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
  text: string;
};

const CopyToClipboard = ({ text: text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <span onClick={handleCopy} className="ml-1 cursor-pointer">
      {isCopied ? <IoCheckmarkCircleOutline size={18} className="text-green-500" /> : <IoCopyOutline size={18} className="text-blue-500" />}
    </span>
  );
};

export default CopyToClipboard;
