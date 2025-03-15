import React from 'react'
import { IinputFieldProps } from '@/interfaces/IinputFieldProps'
const InputField:React.FC<IinputFieldProps> = ({label,type = "text",placeholder,value,onchange}) => {
  return (
    <div className="mt-6">
            <label className="block text-black text-sm font-medium">{label}</label>
            <input 
              type={type}
              value={value}
              onChange={onchange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" 
              placeholder={placeholder}
            />
          </div>
  )
}

export default InputField
