import { FieldError } from "react-hook-form";

interface Props {
  error: string | undefined;
}

const ErrorMessage = ({ error }: Props) => <>{error && <span className="text-sm text-red-500">{error}</span>}</>;

export default ErrorMessage;
