import React, { useState } from "react";
import { IinputFieldProps } from "@/interfaces/IinputFieldProps";
const InputField: React.FC<IinputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  className,
  register,
  error,
  value,
  
}) => {
 
  const [val,setValue] = useState(value)
  return (
    <div className="mt-6">
      <label className="block text-black text-sm font-medium">{label}</label>
      {type === 'textarea'?(
        <textarea className={`${className} w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `} rows={4}
        placeholder={placeholder}
        {...register(name as string)}
        
        />
       ):(
        <input
        type={type}
        {...register(name as string)}
        className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `}
        placeholder={placeholder}
        value={val}
        onChange={(e)=>setValue(e.target.value)}
      />
       )}
     
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
