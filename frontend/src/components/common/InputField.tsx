import React, { useState } from "react";
import { IinputFieldProps } from "@/interfaces/IinputFieldProps";
import {FaEye,FaEyeSlash} from 'react-icons/fa'

const InputField: React.FC<IinputFieldProps> = ({
  label,
  type ,
  placeholder,
  className,
  register,
  error,
  disabled=false,
  value
}) => {

  const [showPassword,setShowPassword] = useState(false)
  return (
    <div className="mt-6">
      <label className="  block  text-sm font-medium">{label}</label>
      {type === 'textarea'?(
        <textarea className={`${className}  w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `} rows={4}
        placeholder={placeholder}
        {...register}
        name={register.name}
        disabled={disabled}
        />
       ):(
       <div className="relative">
           <input
            type={type === "password" && !showPassword ? "password" : "text"}
         disabled = {disabled}
        {...register}
        value={value}
        name={register.name}
        className={` w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `}
        placeholder={placeholder}
       
      />
       {type === "password" && (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
       </div>
      
       )}
     
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
