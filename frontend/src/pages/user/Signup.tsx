import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/schemas/signup-schema";
import { SignupFormatInputs } from "@/interfaces/user/IsignUpFomatInput";
import SelectField from "@/components/common/SelectField";
import { findByEmail, signUp } from "@/api/auth";
import OtpModal from "@/modal/otpModal";
import { useState } from "react";
import { sendOtp, verifyOtp } from "@/api/otp";
import { showSuccessToast } from "@/utils/toast";
import { showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

export default function Signup() {
  const [userData, setUserData] = useState<SignupFormatInputs | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate =  useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormatInputs>({ resolver: yupResolver(signupSchema) });
  const onSubmit = async (data: SignupFormatInputs) => {
    try {
      setUserData(data);
      console.log(data)
      const isEmailExistResponse=await findByEmail(data.email)
      if(isEmailExistResponse.data.success){
        showErrorToast(isEmailExistResponse.data.message)
        return 
      }
      const otpResponse = await sendOtp(data.email);
      if (otpResponse?.data.success) {
        console.log("otp has sent successfully");
        showSuccessToast(otpResponse.data.message)
      }
      setShowOtpModal(true);
    } catch (error: any) {
      if (error.response) {
        showErrorToast(error.response.data.message)
      }
    }
  };
  const resendOtp = async () => {
    if (userData) {
      try {
        const otpResponse = await sendOtp(userData.email);
        if (otpResponse?.data.success) {
          console.log("otp has sent successfully");
          showSuccessToast('otp has send successfully')
        }
      } catch (error) {
        console.log("error in resend otp", error);
      }
    }
  };
  const handleOtpSubmit = async (otp: string) => {
   
     try {
      
      const response = await verifyOtp(userData?.email as string, otp);
      if (response?.data.success) {
        console.log("this is response", response.data);
        showSuccessToast(response.data.message)
        if (userData) {
  
          const res = await signUp(userData);
          if (res?.data.success) {
            showSuccessToast(res.data.message)
            setShowOtpModal(false)
            setTimeout(() => {
              navigate('/login')
            }, 1500);
          }
        }
      }
     } catch (error:any) {
      console.log('error in ',error.response.data)
        if(error.response.data.message === 'Your otp is invalid , check again or resend after 30 seconds'){
          showErrorToast(error.response.data.message)
          return 
        }
        showErrorToast(error.response.data.errors)
        setShowOtpModal(false)
     }
  };

  return (
    <motion.div
    initial={{opacity:1,scale:1}}
    animate={{opacity:1,scale:1}}
    transition={{duration:.7}}
    >
      <div className="flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60 ">
        <img
          src="/titan-fit.png"
          alt="asdf"
          loading="lazy"
          className="absolute top-6 left-6 w-24 h-auto z-10"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
          <p className="text-center text-sm text-black mt-4">
            <Link to="/trainer/signup" className="text-black hover:underline">
              I am a trainer
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Name Input */}

            <InputField
              label="Name"
              type="text"
              placeholder="Enter Your Name"
              register={register('name')}
              error={errors.name?.message}
            />

            {/* Email Input */}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              register={register('email')}
              error={errors.email?.message}
            />
            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              register={register('password')}
              error={errors.password?.message}
            />
            {/* confirm Password Input */}
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm Your Password"
              register={register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            {/* gender */}
            {/* <InputField
              label="Gender"
              type="text"
              placeholder="Enter Your Gender"
              register={register('gender')}
              error={errors.gender?.message}
            /> */}
            <SelectField
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              register={register('gender')}
              error={errors.gender?.message}
            />

            {/* age */}
            <InputField
              label="Age"
              type="number"
              placeholder="Enter Your Age"
              register={register('age',{valueAsNumber:true})}
              error={errors.age?.message}
            />
            {/* fitness level */}

            <SelectField
              label="Fitness Level"
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
              register={register('fitnessLevel')}
              error={errors.fitnessLevel?.message}
            />
            {/*  fitness goal */}
            <SelectField
              label="Fitness Goal"
              options={[
                { value: "fatloss", label: "Fatloss" },
                { value: "buildmuscle", label: "Build Muscle" },
                { value: "maintenance", label: "Maintenance" },
              ]}
              register={register('fitnessGoal')}
              error={errors.fitnessGoal?.message}
            />
          </div>
          

          {/* Sign In Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
            >
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
      {showOtpModal && (
        <OtpModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSubmit={handleOtpSubmit}
          onResend={resendOtp}
        />
      )}
      <ToastContainer/>
    </motion.div>
  );
}
