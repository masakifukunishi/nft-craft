type Props = {
  address: `0x${string}` | undefined;
};

const Profile = ({ address }: Props) => {
  return (
    <>
      <div className="bg-green-300 w-10 h-10 rounded-full" />
      <div className="text-lg">Address: {address}</div>
    </>
  );
};

export default Profile;
