import {  useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "@/components/common/SelectField";
import { useState } from "react";
import { showSuccessToast } from "@/utils/toast";
import { showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { editUserProfile } from "@/api/user-apicalls";
import { userProfileEditSchema } from "@/schemas/user-profile-edit-schema";
import { IUserEditProfile } from "@/interfaces/user-interfaces";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/reduxStore/slices/user-slice";
import {  removeProfileCompletionStatus } from "@/api/localStorage";
import { useEffect } from "react";
import { getProfile } from "@/api/user-apicalls";
export default function UserProfileComplete() {
  const [userData, setUserData] = useState<IUserEditProfile | null>(null);
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserEditProfile>({ resolver: yupResolver(userProfileEditSchema) });
  const onSubmit = async (data: IUserEditProfile) => {
    console.log(errors)
    try {
      setUserData(data);
      console.log('clic')
      const response = await editUserProfile(data)
      if(response.success){
        console.log(response)
        showSuccessToast(response.message)
        const {name} = response.returnUserData
       if(name){
        dispatch(
          updateUserProfile({
            name:name 
          })
        )
       }
       removeProfileCompletionStatus()
        navigate('/user/home')
      }
      
    } catch (error: any) {
      showErrorToast(error)
     
    }
  };
 useEffect(() => {
     const fetchUserProfile = async () => {
       try {
         const userProfileDetails = await getProfile();
         if (userProfileDetails) {
           reset({email:userProfileDetails.email})
         }
       } catch (error) {
         showErrorToast(error);
       }
     };
     fetchUserProfile();
   }, []);
  

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
          <h2 className="text-2xl font-bold text-center text-black">Profile Data</h2>
          
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
              value={userData?.email}
              disabled ={true}
              // placeholder="Enter Your Email"
              register={register('email')}
              error={errors.email?.message}
            />
           
            {/* gender */}
            <InputField
              label="Phone"
              type="string"
              placeholder="Enter Your Phone number"
              register={register('phone')}
              error={errors.age?.message}
            />
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
            <InputField
              label="Height"
              type="number"
              placeholder="Enter Your height"
              register={register('height',{valueAsNumber:true})}
              error={errors.age?.message}
            />
            <InputField
              label="Weight"
              type="number"
              placeholder="Enter Your weight"
              register={register('weight',{valueAsNumber:true})}
              error={errors.age?.message}
            />
          </div>
          

          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
            >
             Update profile
            </button>
          </div>

         
        </div>
      </div>
      
      <ToastContainer/>
    </motion.div>
  );
}
