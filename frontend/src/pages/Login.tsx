import { Link } from "react-router-dom";
import InputField from "@/components/userComponents/InputField";
import { GoogleLogin } from "@react-oauth/google";
export default function Login() {
  const something = async(response:any)=>{
    console.log('this is google')
    const id = response.credential
    console.log('this is id',id)
  }
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60" >
         <img src="/titan-fit.png" alt="asdf" className="absolute top-6 left-6 w-24 h-auto z-10"/>
        <div className="absolute inset-0 bg-black/60"></div> 
       
        <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign in</h2>
  
          {/* Email Input */}
          
          <InputField  label="Email" type="email" placeholder="Enter Your Email"/>
  
          {/* Password Input */}
          <InputField label="Password" type="password" placeholder="Enter Your Password" />
  
          {/* Forgot Password */}
          <div className="flex justify-center items-center mt-4 text-sm">
            
            <a href="#" className="text-black hover:underline">Forgot password?</a>
          </div>
          {/* for trainer part */}
          <div className="flex justify-center items-center mt-4 text-sm">
            
            <Link to="/trainer/login" className="text-black hover:underline">I am a trainer</Link>
          </div>
          {/* Sign In Button */}
          <button className="w-full bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition">
            Sign In
          </button>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
  
          {/* Google Login */}
          
          <GoogleLogin  onSuccess={something} onError={something}/>
  
          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-black hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
  