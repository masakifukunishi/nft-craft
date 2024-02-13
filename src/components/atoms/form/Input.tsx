import { UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
}

const Input = ({ id, register, required = false }: Props) => (
  <input type="text" {...register(id, { required })} id={id} className="bg-gray-700 rounded p-1 w-full m-0" />
);

export default Input;
