import React, {  } from "react";
import { IinputFieldProps } from "@/interfaces/IinputFieldProps";
const InputField: React.FC<IinputFieldProps> = ({
  label,
  type ,
  placeholder,
  className,
  register,
  error,
  disabled=false,
  
}) => {
 console.log('this is error',error)
  // const [val,setValue] = useState(value)
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
        {...register}
        name={register.name}
        disabled={disabled}
        />
       ):(
        <input
        type={type}
         disabled = {disabled}
        {...register}
        name={register.name}
        className={`text-black w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-500"
        } `}
        placeholder={placeholder}
       
      />
       )}
     
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
