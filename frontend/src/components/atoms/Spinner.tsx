type Props = {
  size: number;
  borderWidth: number;
};

const Spinner = ({ size, borderWidth }: Props) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderWidth: borderWidth,
  };
  return (
    <div style={spinnerStyle} className={`animate-spin inline-block border-current border-t-transparent text-blue-500 rounded-full`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
