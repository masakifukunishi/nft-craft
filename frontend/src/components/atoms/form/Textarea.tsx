import { UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
}

const Textarea = ({ id, register, required = false }: Props) => (
  <textarea {...register(id, { required })} id={id} className="bg-gray-700 rounded p-1 w-full" />
);

export default Textarea;
