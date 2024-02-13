import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
};

const FileUpload = ({ id, register, required = false }: Props) => {
  return (
    <div
      className={`border border-dashed flex flex-col justify-center items-center rounded relative ${register[id].value ? "h-80" : "h-48"}`}
    >
      {register[id].value && (
        <>
          <img src={register[id].value} alt="Preview" className="max-h-64" />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            onClick={() => register[id].onChange("")}
          >
            削除
          </button>
        </>
      )}
      {!register[id].value && (
        <label htmlFor="file-upload" className="bg-gray-700 text-white rounded p-2 cursor-pointer">
          Choose file
        </label>
      )}
      <input
        {...register(id, { required })}
        type="file"
        id="file-upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            register[id].onChange(URL.createObjectURL(file));
          }
        }}
      />
    </div>
  );
};

export default FileUpload;
