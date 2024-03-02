import React, { useState } from "react";
import { IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
  text: string;
  iconSize: number;
};

const CopyToClipboard = ({ text, iconSize }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <span onClick={handleCopy} className="cursor-pointer">
      {isCopied ? (
        <IoCheckmarkCircleOutline size={iconSize} className="text-green-500" />
      ) : (
        <IoCopyOutline size={iconSize} className="text-blue-500" />
      )}
    </span>
  );
};

export default CopyToClipboard;
