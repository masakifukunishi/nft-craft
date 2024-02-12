interface Props {
  htmlFor: string;
  label: string;
}

const Label = ({ htmlFor, label }: Props) => <label htmlFor={htmlFor}>{label}</label>;

export default Label;
