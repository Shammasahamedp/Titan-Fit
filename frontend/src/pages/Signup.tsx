import { Link } from "react-router-dom";
import InputField from "@/components/userComponents/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupFormatInputs } from "@/interfaces/IsignUpFomatInput";
import SelectField from "@/components/userComponents/SelectField";
import { signUp } from "@/api/auth";
import OtpModal from "@/modal/otpModal";
import { useState } from "react";
import { sendOtp, verifyOtp } from "@/api/otp";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .required("Age is required"),
  fitnessGoal: yup.string().required("Please select your fitness goal"),
  fitnessLevel: yup.string().required("Please select your finess level"),
});

export default function Signup() {

  const [userData,setUserData] = useState<SignupFormatInputs|null>(null)
  // const [otp,setOtp] = useState('')
  const [showOtpModal,setShowOtpModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormatInputs>({ resolver: yupResolver(schema) });
  const onSubmit = async (data: SignupFormatInputs) => {
    try {
      setUserData(data)
      // const otpResponse = await sendOtp(data.email)
      // if(otpResponse?.data.success){
       
      // }
      setShowOtpModal(true)
      // const response = await signUp(data);
      // if (response?.data.success) {
      //   alert(response?.data.message);
      // }
    } catch (error:any) {
      if(error.response){
        alert(error.response.data.message)
        }
    }
  };
   const  handleOtpSubmit = async (otp:string)=>{

   const response=await verifyOtp(userData?.email as string,otp)
   if(response?.data.success){

    alert('success')
   }
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-[url('/black-bg.jpg')] bg-cover bg-center bg-black/60">
      <img
        src="/titan-fit.png"
        alt="asdf"
        className="absolute top-6 left-6 w-24 h-auto z-10"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>

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
          <InputField
            label="Gender"
            type="text"
            placeholder="Enter Your Gender"
            register={register("gender")}
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
          {/* fitness level */}

          <SelectField
            label="Fitness Level"
            options={[
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
            register={register("fitnessLevel")}
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
            register={register("fitnessGoal")}
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
    {showOtpModal&&<OtpModal isOpen={showOtpModal} onClose={()=>setShowOtpModal(false)} onSubmit={handleOtpSubmit}/>}
    </>
  );
}
