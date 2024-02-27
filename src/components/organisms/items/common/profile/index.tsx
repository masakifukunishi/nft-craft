import shortenString from "@/utills/shortenString";
type Props = {
  address: `0x${string}` | undefined;
};

const Profile = ({ address }: Props) => {
  return (
    <div className="mt-2 mx-1">
      <div className="bg-green-300 w-16 h-16 rounded-full" />
      <div className="text-xl font-semibold mt-3">{shortenString(address || "", 11, "middle")}</div>
    </div>
  );
};

export default Profile;
