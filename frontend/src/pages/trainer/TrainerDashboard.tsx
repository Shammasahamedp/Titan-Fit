import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainerProfileEditSchema } from "@/schemas/trainer-profile-edit";
import { Button } from "@/components/ui/button";
import {
  ITrainerEditProfile,
  ITrainerProfile,
} from "@/interfaces/trainer-interfaces";
import { logoutTrainer } from "@/api/auth";
import { useEffect, useRef, useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { trainerErrors } from "@/messages/trainer-errors";
import {
  editTrainerProfile,
  getTrainerProfile,
  uploadTrainerProfileImage,
} from "@/api/trainer-apicalls";
import { uploadFile } from "@/api/file-upload";
import { uploadTrainerCertificate } from "@/api/trainer-apicalls";
import { checkPasswordMatching } from "@/api/trainer-apicalls";
import ResetPasswordModal from "@/modal/ResetPasswordModal";
import { resetPassword } from "@/api/trainer-apicalls";
import ConfirmPasswordModal from "@/modal/ConfirmPasswordModal";
const TrainerDashboard = () => {
  const [trainerProfile, setTrainerProfile] = useState<ITrainerProfile | null>(
    null
  );
  const [certificates,setCertificates] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [disable, setButtonDisable] = useState(false);
  const [isModalOpen,setPasswordModal] = useState(false)
  const [isResetModalOpen,setResetPasswordModal] = useState(false)
  const certificatePdfInput = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITrainerEditProfile>({
    resolver: yupResolver(trainerProfileEditSchema),
  });


  const handleCertificateUpload = async(event:React.ChangeEvent<HTMLInputElement>)=>{
    try {
      console.log('this is the function')
          const fileList = event.target.files
          const uploadFileResponse = await uploadFile(fileList as FileList,'trainer-certificate')
          if(uploadFileResponse.data){
            console.log('this is url',uploadFileResponse.data.url)
           const response = await uploadTrainerCertificate(uploadFileResponse.data.url)
           console.log(response)
           if(!response?.data.success){
            throw new Error()
           }
           showSuccessToast(response?.data.message)
           setCertificates(response.data.trainerCertificate)
          }
        } catch (error) {
            console.log(error)
            showErrorToast(trainerErrors.CERTIFICATE_UPLOAD_ERROR)
        }
  }
 
  const confirmPassword = async(password:string)=>{
    try {
      const response = await checkPasswordMatching(password)
      if(response?.data.success){
               setPasswordModal(false)
               setResetPasswordModal(true)
      }
    } catch (error) {
      console.log(error)
      showErrorToast(trainerErrors.CONFIRM_PASSWORD_ERROR)
    }
  }
  const resetTrainerPassword = async (password:string)=>{
    try {
      const response = await resetPassword(password)
      if(response?.data.success){
        showSuccessToast(response.data.message)
        setResetPasswordModal(false)
      }
    } catch (error) {
      showErrorToast(trainerErrors.RESET_PASSWORD_ERROR)
    }
  }
  const onSubmit = async (data: ITrainerEditProfile) => {
    try {
      console.log((data))
      if (trainerProfile) {
        const { profilePicture, trainerCertificate, ...rest } = trainerProfile;
        const existingData = JSON.stringify(rest);
        const newData = JSON.stringify(data);
        console.log('hello',existingData,newData)
        if (existingData === newData) {
          showErrorToast(trainerErrors.PROFILE_CHANGE_NEED);
          return;
        }
        console.log("this is data", data);
        const responseData = await editTrainerProfile(data);
        if (responseData.success) {
          showSuccessToast(responseData.message);
          console.log(responseData);
          setTrainerProfile(responseData.returnedTrainerProfile);
        }
      }
    } catch (error) {
      console.log(error);
      showErrorToast(trainerErrors.PROFILE_EDIT_ERROR);
    }
  };
  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const trainerProfileDetails = await getTrainerProfile();
        if (trainerProfileDetails) {
          console.log(trainerProfileDetails);
          setTrainerProfile(trainerProfileDetails.trainerProfile);
          setCertificates(trainerProfileDetails.trainerProfile.trainerCertificate)
        }
      } catch (error) {
        showErrorToast(trainerErrors.PROFILE_ERROR);
      }
    };
    fetchTrainerProfile();
  }, []);

  useEffect(() => {
    if (trainerProfile && isEditing) {
      const { profilePicture, trainerCertificate, ...rest } = trainerProfile;
      reset(rest);
    }
  }, [isEditing, reset]);
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar logout={logoutTrainer} role="trainer" />
      <div className="flex flex-1   text-white">
        {/* Sidebar */}

        <SideBar
          profilePicture={trainerProfile?.profilePicture}
          uploadProfilePicApi={uploadTrainerProfileImage}
          role="user"
          items={[
            ["my bookings",'booking'],
            ["my meal plan",'mealplan'],
           [ "my wallet",'wallet'],
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
          {isEditing && trainerProfile ? (
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

                    <InputField
                      label="Phone"
                      register={register("phone")}
                      error={errors.phone?.message}
                      type="text"
                    />
                    <InputField
                      label="Bio"
                      register={register("bio")}
                      error={errors.bio?.message}
                      type="text"
                    />
                    <InputField
                      label="Years Of Experience"
                      register={register("yearsOfExperience")}
                      error={errors.yearsOfExperience?.message}
                      type="text"
                    />
                  </div>

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
                  <span className="text-white">{trainerProfile?.name}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Email:</strong>{" "}
                  <span className="text-white">{trainerProfile?.email}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Phone:</strong>{" "}
                  <span className="text-white">
                    {trainerProfile?.phone || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Age:</strong>{" "}
                  <span className="text-white">{trainerProfile?.age}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Gender:</strong>{" "}
                  <span className="text-white">
                    {trainerProfile?.gender || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Bio:</strong>{" "}
                  <span className="text-white">
                    {trainerProfile?.bio || "not added"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Years Of Experience:</strong>{" "}
                  <span className="text-white">
                    {trainerProfile?.yearsOfExperience || "not added"}
                  </span>
                </div>
              </div>

              <div className="flex justify-around">
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] w-1/4 "
                >
                  Edit Profile
                </button>
                <button
                  disabled={disable}
                  onClick={() =>
                    setPasswordModal(true)
                  }
                  className="mt-4 mx-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] w-1/4 "
                >
                  {disable ? "Loading..." : " Reset Password"}
                </button>
              </div>
            </div>
          )}

          <div className="w-full min-h-screen bg-black p-8">
            <div className="flex justify-end mb-6">
              <Button onClick={()=>{if(certificatePdfInput.current){certificatePdfInput.current.click()}}} className="bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]">
                Add Certificate
              </Button>
              <input type="file" onChange={handleCertificateUpload} className="hidden" ref={certificatePdfInput}  />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates?.map(
                (certificate: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                  >
                    <iframe
                      src={certificate}
                      className="w-full h-[300px] border rounded-lg"
                      title={`Trainer Certificate ${index + 1}`}
                    />
                    <a
                      target="_blank"
                      href={certificate}
                      rel="noopener noreferrer"
                    >
                      <Button className="mt-4 bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]">
                        View
                      </Button>
                    </a>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Table Wrapper - Scrollable */}
        </div>
      </div>
      {
        isModalOpen&&
        <ConfirmPasswordModal onClose={()=>setPasswordModal(false)} onSubmit={confirmPassword}/>
      }
      {
        isResetModalOpen&&
        <ResetPasswordModal onClose={()=>setResetPasswordModal(false)} onSubmit={resetTrainerPassword}/>
      }
      <ToastContainer />
    </div>
  );
};

export default TrainerDashboard;
