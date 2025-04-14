import {  Link, useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField";
import { ClipLoader } from "react-spinners";
import OtpModal from "@/modal/otpModal";
import FileInputField from "@/components/common/FileInputField";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { TrainerSignupSchemaInput } from "@/interfaces/trainer/ItrainerSignupInputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainerSignupSchema } from "@/schemas/trainer-signup.schema";
import { sendOtp, verifyOtp } from "@/api/otp";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { findByEmail, trainerSignup } from "@/api/auth";
import { uploadFile } from "@/api/file-upload";
import SelectField from "@/components/common/SelectField";
export default function TrainerSignup() {
  const [trainerData, setTrainerData] = useState<TrainerSignupSchemaInput | null>(
    null
  );

  const [isLoading,setIsLoading] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerSignupSchemaInput>({
    resolver: yupResolver(trainerSignupSchema),
  });

  const onSubmit = async (data: TrainerSignupSchemaInput) => {
    try {
      setTrainerData(data);
     
      const isEmailExistResponse = await findByEmail(data.email)
      if(isEmailExistResponse.data.success){
        showErrorToast(isEmailExistResponse.data.message)
        return 
      }
      const otpResponse = await sendOtp(data.email);
      if (otpResponse?.data.success) {
        showSuccessToast(otpResponse.data.message);
      }
      setShowOtpModal(true);
    } catch (error: any) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      }
    }
  };

  const resendOtp = async () => {
    if(trainerData){
      try {
        const otpResponse = await sendOtp(trainerData.email)
      if(otpResponse?.data.success){
        showSuccessToast('otp has send successfully')
      }
      } catch (error) {
        console.log("error in resend otp",error)
      }
    }
  }

  const handleOtpSubmit = async (otp:string) =>{
    try {
      setIsLoading(true)
      const response = await verifyOtp(trainerData?.email as string,otp)
      if(response?.data.success){
        showSuccessToast(response.data.message)
       const axiosResponse= await uploadFile(trainerData?.trainerCertificate as FileList,'trainerCertificate')
      
        if(trainerData){
        const finalTrainerData = {
          ...trainerData,
          trainerCertificate:[axiosResponse.data.url as string]
        }
            const res = await trainerSignup(finalTrainerData)
          if(res?.data.success){
            showSuccessToast(res.data.message)
            setShowOtpModal(false)
            setTimeout(() => {
              navigate('/login')
            }, 1500);
          }
        }
      }
    } catch (error:any) {
      if(error.response.data.message === 'Your otp is invalid , check again or resend after 30 seconds'){
        showErrorToast(error.response.data.message)
        return 
      }
      showErrorToast(error.response.data.message)
      setShowOtpModal(false)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-fixed bg-center bg-black/60 ">
        <img
          src="/titan-fit.png"
          alt="asdf"
          loading="lazy"
          className="absolute top-6 left-6 w-24 h-auto z-10"
        />
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        <div className="fixed top-0 left-0 w-full h-full bg-black/60"></div>

        <div className="relative z-10">
          <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center text-black">
              Sign Up
            </h2>
            <p className="text-center text-sm text-black mt-4">
              <Link to="/signup" className="text-black hover:underline">
                I am a user
              </Link>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Name Input */}

              <InputField
                label="Name"
                type="text"
                placeholder="Enter Your Name"
                register={register("name")}
                error={errors.name?.message}
              />

              {/* Email Input */}
              <InputField
                label="Email"
                type="email"
                placeholder="Enter Your Email"
                register={register("email")}
                error={errors.email?.message}
              />
              {/* Password Input */}
              <InputField
                label="Password"
                type="password"
                placeholder="Enter Your Password"
                register={register("password")}
                error={errors.password?.message}
              />
              {/* confirm Password Input */}
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm Your Password"
                register={register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
              {/* gender */}
             
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
                register={register("age")}
                error={errors.age?.message}
              />
              {/* Years of experience */}
              <InputField
                label="Years Of Experience"
                type="number"
                placeholder="Enter Your Years of Experience"
                register={register("yearsOfExperience")}
                error={errors.yearsOfExperience?.message}
              />
              {/* Upload certificate */}
              <FileInputField
                label="Trainer Certificate"
                type="file"
                accept="application/pdf"
                placeholder="Upload Trainer Certificate"
                register={register("trainerCertificate")}
                error={errors.trainerCertificate?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Give us a short bio"
                type="textarea"
                placeholder="Enter Your Bio"
                // className="h-32"
                register={register("bio")}
                error={errors.bio?.message}
              />
            </div>
            {/* Sign In Button */}
            <div className="flex justify-center">
              <button onClick={handleSubmit(onSubmit)} className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition">
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
      </div>
      {showOtpModal && (
        <OtpModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSubmit={handleOtpSubmit}
          onResend={resendOtp}
        />

      )}
      {isLoading&&(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ClipLoader color="#ffffff" size={50} />
      </div>
      )}

      <ToastContainer />
    </motion.div>
  );
}
