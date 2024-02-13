import { UseFormRegister, FieldErrors } from "react-hook-form";
import Label from "@/components/atoms/form/Label";
import Textarea from "@/components/atoms/form/Textarea";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

interface Props {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
  errors: FieldErrors;
}

const LabeledTextareaField = ({ label, id, register, required = false, errors }: Props) => {
  return (
    <>
      <Label htmlFor={id} label={label} />
      <div className="mt-2">
        <Textarea id={id} register={register} required={required} />
      </div>
      <div className="mt-1">
        <ErrorMessage error={errors[id]?.message as string} />
      </div>
    </>
  );
};

export default LabeledTextareaField;
