import {  useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "@/components/common/SelectField";
import { useEffect, useState } from "react";
import { showSuccessToast } from "@/utils/toast";
import { showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { ITrainerEditProfile } from "@/interfaces/trainer-interfaces";
import { editTrainerProfile, getTrainerProfile } from "@/api/trainer-apicalls";
import { trainerProfileEditSchema } from "@/schemas/trainer-profile-edit";
import { useDispatch } from "react-redux";
import { trainerLoginSuccess } from "@/reduxStore/slices/trainer-slice";
import { getAccessToken, removeProfileCompletionStatus } from "@/api/localStorage";

export default function UserProfileComplete() {
  const [trainerData, setTrainerData] = useState<ITrainerEditProfile | null>(
    null
  );
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITrainerEditProfile>({
    resolver: yupResolver(trainerProfileEditSchema),
  });
  const onSubmit = async (data: ITrainerEditProfile) => {
    console.log('d'
      
    )
    console.log(errors)
    try {
      
      console.log('onsubmit')
      setTrainerData(data);
      const response = await editTrainerProfile(data);
      if (response.success) {
        showSuccessToast(response.message);
        console.log(response.returnedTrainerProfile)
        const {_id,name,email} = response.returnedTrainerProfile
        dispatch(
          trainerLoginSuccess({
            trainer:{_id,name,email,role:'trainer'},
             
            token:getAccessToken() as string
          })
        )
        removeProfileCompletionStatus()
        navigate("/trainer/profile");
      }
    } catch (error: any) {
      showErrorToast(error)
     
    }
  };
  useEffect(() => {
  console.log("Errors changed:", errors);
}, [errors]);


  useEffect(()=>{
    const fetchTrainerDetails = async()=>{
      try {
         const response = await getTrainerProfile()
         if(response){
          reset({email:response.trainerProfile.email})
         }
      } catch (error) {
        showErrorToast(error)
      }
    }
    fetchTrainerDetails()
  },[])    
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
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
<form  onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center text-black">Complete Profile </h2>
          
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
              //  value={trainerData?.email}
              disabled = {true}
             
              register={register("email")}   
              error={errors.email?.message}
            />

            {/* gender */}

            <SelectField
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              register={register("gender")}
              error={errors.gender?.message}
            />

            {/* age */}
            <InputField
              label="Age"
              type="number"  
              placeholder="Enter Your Age"
              register={register("age", { valueAsNumber: true })}
              error={errors.age?.message}
            />
           <InputField
              label="Phone"
              type="string"
              placeholder="Enter Your Phone number"
              register={register('phone')}
              error={errors.phone?.message}
            />

            {/*  Years of experience */}
            <InputField
              label="Years Of Experience"
              type="number"
              placeholder="Enter Your Years of Experience"
              register={register("yearsOfExperience", { valueAsNumber: true })}
              error={errors.yearsOfExperience?.message}
            />

            <InputField
              label="Short Bio"
              type="textarea"
              placeholder="Enter Your short bio"
              register={register("bio")}
              error={errors.bio?.message}
            />
          </div>

          <div className="flex justify-center">
            <button
type="submit"             
              className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
            >
              Update profile
            </button>
          </div>
        {/* </div> */}
        </form>
</div>
        
      </div>

      <ToastContainer />
    </motion.div>
  );
}
