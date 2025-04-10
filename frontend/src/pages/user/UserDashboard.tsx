import React, { useEffect } from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { useState } from "react";
import { editUserProfile, getProfile, uploadUserProfileImage } from "@/api/user-apicalls";
import { IUserEditProfile, IUserProfile } from "@/interfaces/user-interfaces";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { userErrors } from "@/messages/userside-error";
import { userProfileEditSchema } from "@/schemas/user-profile-edit-schema";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import SelectField from "@/components/common/SelectField";
import { useDispatch } from "react-redux";
import { logout } from "@/reduxStore/slices/user-slice";
const UserDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserEditProfile>({
    resolver: yupResolver(userProfileEditSchema),
    mode:"onChange"
  });
  
  const userLogout = ()=>{
    dispatch(logout())
  }
  const onSubmit = async (data: IUserEditProfile) => {
    try {
      console.log("li");
      if (userProfile) {
        const { profilePicture, ...rest } = userProfile;
        const existingData = JSON.stringify(rest);
        const newData = JSON.stringify(data);
        if (existingData === newData) {
          showErrorToast(userErrors.PROFILE_CHANGE_NEED);
          return;
        }
        const responseData = await editUserProfile(data);
        console.log(responseData);
        if (responseData.success) {
          showSuccessToast(responseData.message);
          setUserProfile(responseData.returnUserData)
        }
      }
    } catch (error) {
      console.log(error);
      showErrorToast(userErrors.PROFILE_EDIT_ERROR);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileDetails = await getProfile();
        if (userProfileDetails) {
          setUserProfile(userProfileDetails);
        }
      } catch (error) {
        showErrorToast(userErrors.PROFILE_ERROR);
      }
    };
    fetchUserProfile();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      if (userProfile && isEditing) {
        const { profilePicture, ...rest } = userProfile;
        console.log('this is rest',rest)
        reset(rest) 
      }
  }, [isEditing, reset]);


  
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar logout={userLogout}  role="user"/>
      <div className="flex flex-1   text-white">
        {/* Sidebar */}

        <SideBar
        profilePicture={userProfile?.profilePicture}
        uploadProfilePicApi={uploadUserProfileImage}
        role="user"
          items={[
            "my bookings",
            "my meal plan",
            "my wallet",
            "my subscription",
          ]}
        />

        {/* Main Content */}
        <div className="flex-1  p-6 pt-16 md:ml-64">
          <h2
            className="text-3xl font-bold mb-4 o hover:cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            Profile Overview
          </h2>
          {isEditing && userProfile ? (
            <>
              <div className="flex justify-center">
                <div className="bg-white z-10 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
                  <h2 className="text-2xl font-bold text-center text-black">
                    Your Profile
                  </h2>
                  <p className="text-center text-sm text-black mt-4"></p>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Name"
                      register={register("name")}
                      error={errors.name?.message}
                      type="text"
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
                    />
                    <InputField
                      label="Age"
                      register={register("age")}
                      error={errors.age?.message}
                      type="number"
                    />

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
                      type="text"
                    />

                    <InputField
                      label="Weight"
                      register={register("weight")}
                      error={errors.weight?.message}
                      type="number"
                    />
                    <InputField
                      label="Height"
                      register={register("height")}
                      error={errors.height?.message}
                      type="number"
                    />
                  </div>

                  {/* Sign In Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="w-1/3  bg-black text-white py-2 mt-6 rounded-lg hover:bg-gray-700 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <strong>Name:</strong>{" "}
                  <span className="text-white">{userProfile?.name}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Email:</strong>{" "}
                  <span className="text-white">{userProfile?.email}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Phone:</strong>{" "}
                  <span className="text-white">
                    {userProfile?.phone || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Age:</strong>{" "}
                  <span className="text-white">{userProfile?.age}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Gender:</strong>{" "}
                  <span className="text-white">
                    {userProfile?.gender || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Height:</strong>{" "}
                  <span className="text-white">
                    {userProfile?.height || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Weight:</strong>{" "}
                  <span className="text-white">
                    {userProfile?.weight || "not added"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <strong>Fitness Goal:</strong>{" "}
                  <span className="text-white">{userProfile?.fitnessGoal}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Fitness Level:</strong>{" "}
                  <span className="text-white">
                    {userProfile?.fitnessLevel}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] w-full"
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* Table Wrapper - Scrollable */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
