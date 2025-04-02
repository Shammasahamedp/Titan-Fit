import { useForm } from "react-hook-form"
import InputField from "./InputField"
import React, { useState } from "react"
import { IFormProps } from "@/interfaces/IFormProps"

const Form:React.FC<IFormProps> = ({fieldConfig,initialData}) => {
  if(!initialData){
    return <h1>No data available</h1>
  }
  const [data,setData] = useState(initialData)
  console.log('data',data)
  const {
   register,
   handleSubmit,
   formState:{errors}
  } = useForm()
  return (
    <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-black">Your Profile</h2>
          <p className="text-center text-sm text-black mt-4">
           
          </p>
          <div className="grid grid-cols-2 gap-4">
           
              {
                fieldConfig.map((field,index)=>{
                  console.log('this is field.value',field.value)
                  return (
                  <InputField key={index} type={field.type} label={field.label} value={field.value} register={register} name={field.name} />
                )})
              }
          </div>
          

          {/* Sign In Button */}
          <div className="flex justify-center">
            <button
              
              className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
            >
              Edit
            </button>
          </div>

          
        </div>
  )
}

export default Form
