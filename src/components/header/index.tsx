import User from "./User";

const Header = () => {
  return (
    <header className="flex items-center p-2">
      <h1 className="text-2xl font-bold">NFT MINTING</h1>
      <div className="ml-3">
        <div className="font-semibold cursor-pointer">Create</div>
      </div>
      <div className="ml-auto">
        <User />
      </div>
    </header>
  );
};

export default Header;
