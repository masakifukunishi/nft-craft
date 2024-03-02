import shortenString from "@/utills/shortenString";
import CopyToClipboard from "@/components/atoms/CopyToClipboard";

type Props = {
  address: `0x${string}` | undefined;
};

const Profile = ({ address }: Props) => {
  const effctiveAddress = address ? shortenString(address, 11, "middle") : "";
  return (
    <div className="mt-2 mx-1">
      <div className="bg-green-300 w-16 h-16 rounded-full" />
      {address && (
        <div className="mt-3 flex items-center">
          <div className="text-xl font-semibold mr-2">{effctiveAddress}</div>
          <CopyToClipboard text={address} iconSize={20} />
        </div>
      )}
    </div>
  );
};

export default Profile;
