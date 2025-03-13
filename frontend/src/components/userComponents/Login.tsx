import { Link } from "react-router-dom";

export default function Login() {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60" >
         <img src="/titan-fit.png" alt="asdf" className="absolute top-6 left-6 w-24 h-auto z-10"/>
        <div className="absolute inset-0 bg-black/60"></div> 
       
        <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign in</h2>
  
          {/* Email Input */}
          <div className="mt-6">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" 
              placeholder="Enter your email"
            />
          </div>
  
          {/* Password Input */}
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" 
              placeholder="Enter your password"
            />
          </div>
  
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
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:text-white transition">
            Sign in with Google
          </button>
  
          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-black hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
  