type Props = {
  name: string | undefined;
};

const Card = ({ name }: Props) => {
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg">
      <div className="p-5">
        <h4 className="mb-1 font-normal text-gray-400">{name}</h4>
      </div>
    </div>
  );
};

export default Card;
