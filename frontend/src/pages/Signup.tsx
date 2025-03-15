import { Link } from "react-router-dom";
import InputField from "@/components/userComponents/InputField";
export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60">
         <img src="/titan-fit.png" alt="asdf" className="absolute top-6 left-6 w-24 h-auto z-10"/>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-black">
          Sign Up
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Name Input */}
         
          <InputField label="Name" type="text" placeholder="Enter Your Name" />

          {/* Email Input */}
          <InputField label="Email" type="email" placeholder="Enter Your Email"/>
          {/* Password Input */}
          <InputField label="Password" type="password" placeholder="Enter Your Password"/>
          {/* confirm Password Input */}
          <InputField label="Confirm Password" type="password" placeholder="Confirm Your Password"/>
          {/* gender */}
          <InputField label="Gender" type="text" placeholder="Enter Your Gender"/>
          {/* age */}
          <InputField label="Age" type="number" placeholder="Enter Your Age"/>
          {/* fitness goal */}
          <div className="mt-6">
            <label className="block text-black text-sm font-medium">
              Fitness Goal
            </label>
            <select className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none">
                <option value="" disabled selected>Choose your finess goal</option>
                <option value="fatloss">Fatloss</option>
                <option value="buildmuscle">Build Muscle</option>
                <option value="maintenance">Maintenance</option>
            </select>
          </div>
          {/* current fitness level */}
          <div className="mt-6">
            <label className="block text-black text-sm font-medium">
              Current Fitness Level
            </label>
            <select className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none">
              <option value="" disabled selected>
                Choose your fitness level
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center">
          <button className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition">
            Sign Up
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-black mt-4">
          already have an account?{" "}
          <Link to="/login" className="text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
