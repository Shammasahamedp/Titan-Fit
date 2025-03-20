import { Link } from "react-router-dom";
import InputField from "@/components/userComponents/InputField";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { loginSchema } from "@/validations/login-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "@/api/auth";
import { ToastContainer } from "react-toastify";
import { showSuccessToast,showErrorToast } from "@/utils/toast";
export default function Login() {
 
  const [userData,setUserData] = useState<LoginFormInput|null>(null)
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<LoginFormInput>({resolver:yupResolver(loginSchema)})
  const onSubmit = async(data:LoginFormInput)=>{
    try {
        console.log('clicked')
        setUserData(data)
        const response=await login(data)
        console.log(response)
        if(response?.data.success){
          showSuccessToast(response.data.message)
        }
    } catch (error:any) {
        showErrorToast(error?.response.data.message)
    }
  }
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60" >
         <img src="/titan-fit.png" alt="asdf" className="absolute top-6 left-6 w-24 h-auto z-10"/>
        <div className="absolute inset-0 bg-black/60"></div> 
       
        <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign in</h2>
  
          {/* Email Input */}
          
          <InputField  label="Email" type="email" placeholder="Enter Your Email" register={register("email")} error={errors.email?.message}/>
  
          {/* Password Input */}
          <InputField label="Password" type="password" placeholder="Enter Your Password" register={register("password")} error={errors.password?.message} />
  
          {/* Forgot Password */}
          <div className="flex justify-center items-center mt-4 text-sm">
            
            
            <Link to="/forgotpassword" className="text-black hover:underline">Forgot password?</Link>
          </div>
          {/* for trainer part */}
          <div className="flex justify-center items-center mt-4 text-sm">
            
            <Link to="/trainer/login" className="text-black hover:underline">I am a trainer</Link>
          </div>
          {/* Sign In Button */}
          <button onClick={handleSubmit(onSubmit)} className="w-full bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition">
            Sign In
          </button>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
  
          {/* Google Login */}
          
          <GoogleLogin  onSuccess={()=>console.log('') }/>
  
          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-black hover:underline">Sign up</Link>
          </p>
        </div>
        <ToastContainer/>
      </div>
    );
  }
  