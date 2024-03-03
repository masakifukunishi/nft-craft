import { UseFormRegister, FieldErrors } from "react-hook-form";
import Label from "@/components/atoms/form/Label";
import Input from "@/components/atoms/form/Input";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

interface Props {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
  errors: FieldErrors;
}

const LabeledInputField = ({ label, id, register, required = false, errors }: Props) => {
  return (
    <>
      <Label htmlFor={id} label={label} />
      <div className="mt-4">
        <Input id={id} register={register} required={required} />
      </div>
      <ErrorMessage error={errors[id]?.message as string} />
    </>
  );
};

export default LabeledInputField;
