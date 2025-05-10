import React from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import {   logoutUser } from "@/api/auth";
import ConfirmPasswordModal from "@/modal/ConfirmPasswordModal";
import { checkPasswordMatching } from "@/api/user-apicalls";
import { resetPassword } from "@/api/user-apicalls";
import ResetPasswordModal from "@/modal/ResetPasswordModal";
import { Outlet } from "react-router-dom";
import { showErrorToast,showSuccessToast } from "@/utils/toast";
import { IUserProfile } from "@/interfaces/user-interfaces";
import { uploadUserProfileImage } from "@/api/user-apicalls";
const UserDashboard: React.FC = () => {
      const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
 
  const [isModalOpen,setConfirmPasswordModal] = useState(false)
  const [isResetModalOpen,setResetPasswordModal] = useState(false)

  
  const confirmPassword = async(password:string)=>{
    try {
      const response = await checkPasswordMatching(password)
      if(response?.data.success){
               setConfirmPasswordModal(false)
               setResetPasswordModal(true)
      }
    } catch (error:any) {
      console.log(error)
      showErrorToast(error)
    }
  }
  const resetUserPassword = async (password:string)=>{
    try {
      const response = await resetPassword(password)
      if(response?.data.success){
        showSuccessToast(response.data.message)
        setResetPasswordModal(false)
      }
    } catch (error) {
      showErrorToast(error)
    }
  }
 
  


  
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar logout={logoutUser}  role='user'/>
      <div className="flex flex-1   text-white">
        {/* Sidebar */}

        <SideBar
        profilePicture={userProfile?.profilePicture}
        uploadProfilePicApi={uploadUserProfileImage}
        role="user"
          items={[
            ["my bookings",'bookings'],
            ["my meal plan",'mealplan'],
            ["my subscription",'subscription'],
          ]}
        />

        {/* Main Content */}
        <div className="flex-1 ml-0  p-4">
  <Outlet context={{userProfile,setUserProfile,setConfirmPasswordModal}} />
</div>
        
      </div>
      {isModalOpen&&
        <ConfirmPasswordModal onClose={()=>setConfirmPasswordModal(false)} onSubmit={confirmPassword}/>
      }
      {
        isResetModalOpen&&
        <ResetPasswordModal onClose={()=>setResetPasswordModal(false)} onSubmit={resetUserPassword}/>
      }
   <ToastContainer />
    </div>
  );
};

export default UserDashboard;
