import { FieldError } from "react-hook-form";

interface Props {
  error: string | undefined;
}

const ErrorMessage = ({ error }: Props) => <>{error && <div className="text-sm text-red-500 mt-2">{error}</div>}</>;

export default ErrorMessage;
