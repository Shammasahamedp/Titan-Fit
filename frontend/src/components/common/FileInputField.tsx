import React from "react";
import { IFileinputFieldProps } from "@/interfaces/IfileInputFieldProps";
const FileInputField: React.FC<IFileinputFieldProps> = ({
  label,
  type = "type",
  accept = "application/pdf",
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mt-6">
      <label className=" block text-black text-sm font-medium">{label}</label>
       
       
        <input
        type={type}
        accept={accept}
        {...register}
        className={`text-black w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `}
        placeholder={placeholder}
      />
       
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileInputField;
