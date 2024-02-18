import { RxCross2 } from "react-icons/rx";
import ErrorMessage from "@/components/atoms/form/ErrorMessage";

type Props = {
  imagePreview: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: () => void;
  errorMessage?: string;
};

const UploadImageFile = ({ imagePreview, handleImageChange, handleImageRemove, errorMessage }: Props) => {
  return (
    <>
      <div className="text-lg font-semibold">Upload file</div>
      <div className="mt-2">
        <div
          className={`border border-dashed flex flex-col justify-center items-center rounded relative ${imagePreview ? "h-80" : "h-48"}`}
        >
          {imagePreview && (
            <>
              <img src={imagePreview} alt="Preview" className="max-h-64" />
              <RxCross2
                size={40}
                className="absolute top-0 right-0 text-white bg-gray-700 p-2 m-1 rounded-md cursor-pointer"
                onClick={handleImageRemove}
              />
            </>
          )}
          {!imagePreview && (
            <label htmlFor="file-upload" className="bg-gray-700 text-white rounded p-2 cursor-pointer">
              Choose file
            </label>
          )}
          <input id="file-upload" type="file" className="hidden" onChange={handleImageChange} />
        </div>
      </div>
      <ErrorMessage error={errorMessage} />
    </>
  );
};

export default UploadImageFile;
