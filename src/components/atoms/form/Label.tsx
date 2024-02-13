interface Props {
  htmlFor: string;
  label: string;
}

const Label = ({ htmlFor, label }: Props) => (
  <label htmlFor={htmlFor} className="text-xl font-semibold">
    {label}
  </label>
);

export default Label;
