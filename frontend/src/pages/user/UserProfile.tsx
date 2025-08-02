

import  { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserProfile, getProfile } from "@/api/user-apicalls";
import { IUserEditProfile, IUserProfile, IUserProfileContextType } from "@/interfaces/user-interfaces";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { userErrors } from "@/messages/userside-error";
import { userProfileEditSchema } from "@/schemas/user-profile-edit-schema";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { isDeepEqual } from '../../utils/is-equal';

const UserProfile = () => {
  const {  setConfirmPasswordModal } = useOutletContext<IUserProfileContextType>();
  const [disable, setButtonDisable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile,setUserProfile] = useState<IUserProfile>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserEditProfile>({
    resolver: yupResolver(userProfileEditSchema),
    mode: "onChange"
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileDetails = await getProfile();
        if (userProfileDetails) {
          setUserProfile(userProfileDetails);
        }
      } catch (error) {
        showErrorToast(error);
      }
    };
    fetchUserProfile();
  }, []);

  
  useEffect(() => {
    if (userProfile && isEditing) {
      const { profilePicture, ...rest } = userProfile;
      reset(rest);
    }
  }, [isEditing, reset, userProfile]);

  const onSubmit = async (data: IUserEditProfile) => {
    try {
      if (userProfile) {
        const { profilePicture, ...rest } = userProfile;
      
        if (isDeepEqual(rest,data)) {
          showErrorToast(userErrors.PROFILE_CHANGE_NEED);
          return; 
        }           
        const responseData = await editUserProfile(data);
        if (responseData.success) {
          showSuccessToast(responseData.message);
          setUserProfile(responseData.returnUserData);
          setIsEditing(false);
        }
      }
    } catch (error) {
      showErrorToast(error);
    } 
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-warm-yellow">
          Profile Overview
        </h2>
        {!isEditing && (
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
            >
              Edit Profile
            </button>
            <button
              disabled={disable}
              onClick={() => setConfirmPasswordModal(true)}
              className="mt-2 bg-[#FFC436]  text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#FFC436]"
            >
              {disable ? 'Loading...' : 'Reset Password'}
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="bg-black/30 border border-white/10 rounded-xl p-6 shadow-lg  text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                register={register("name")}
                error={errors.name?.message}
                className='text-white'
              />
              <InputField
                label="Email"
                register={register("email")}
                error={errors.email?.message}
                disabled={true}
              />
              <SelectField
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                register={register("gender")}
                error={errors.gender?.message}
              />
              <InputField
                label="Age"
                type="number"
                register={register("age")}
                error={errors.age?.message}
              />
              <SelectField
                label="Fitness Goal"
                options={[
                  { value: "fatloss", label: "Fat Loss" },
                  { value: "buildmuscle", label: "Build Muscle" },
                  { value: "maintenance", label: "Maintenance" },
                ]}
                register={register("fitnessGoal")}
                error={errors.fitnessGoal?.message}
              />
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
              <InputField
                label="Phone"
                register={register("phone")}
                error={errors.phone?.message}
              />
              <InputField
                label="Weight (kg)"
                type="number"
                register={register("weight")}
                error={errors.weight?.message}
              />
              <InputField
                label="Height (cm)"
                type="number"
                register={register("height")}
                error={errors.height?.message}
              />
            </div> 

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mt-4 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-4 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] "
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-black/30 border border-white/10 rounded-xl p-6 shadow-lg ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {[
              { label: "Name", value: userProfile?.name },
              { label: "Email", value: userProfile?.email },
              { label: "Phone", value: userProfile?.phone || "Not added" },
              { label: "Age", value: userProfile?.age },
              { label: "Gender", value: userProfile?.gender || "Not added" },
              { label: "Height", value: userProfile?.height ? `${userProfile.height} cm` : "Not added" },
              { label: "Weight", value: userProfile?.weight ? `${userProfile.weight} kg` : "Not added" },
              { label: "Fitness Goal", value: userProfile?.fitnessGoal },
              { label: "Fitness Level", value: userProfile?.fitnessLevel }
            ].map((field, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="text-warm-yellow text-sm font-medium mb-1">
                  {field.label}
                </div>
                <div className="text-white">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default UserProfile;
