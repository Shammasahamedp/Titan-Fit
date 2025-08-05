import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {   logoutUser } from "@/api/auth";
import ConfirmPasswordModal from "@/modal/ConfirmPasswordModal";
import { checkPasswordMatching, getTrainers } from "@/api/user-apicalls";
import { resetPassword } from "@/api/user-apicalls";
import ResetPasswordModal from "@/modal/ResetPasswordModal";
import { Outlet } from "react-router-dom";
import { showErrorToast,showSuccessToast } from "@/utils/toast";
import NewNavbar from "@/components/userComponents/NewNavbar";
import ChatSidebar from "@/components/common/ChatSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import { getBookedUsersForChat } from "@/api/trainer-apicalls";

const ChatDashboard: React.FC = () => {

  const role = useSelector((state:RootState)=>{
    if(state.user.user){
      return state.user.user.role
    }
    if(state.trainer.trainer?.role){
      return state.trainer.trainer?.role
    }

    return null
  })
  const [isModalOpen,setConfirmPasswordModal] = useState(false)
  const [isResetModalOpen,setResetPasswordModal] = useState(false)
  const [users,setUsers] = useState<{id:string;name:string;profilePicture?:string}[]>([ ])
  
  const confirmPassword = async(password:string)=>{
    try {
      const response = await checkPasswordMatching(password)
      if(response?.data.success){
               setConfirmPasswordModal(false)
               setResetPasswordModal(true)
      }
    } catch (error:any) {
      

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

  const getUsersForChat = async ()=>{
    try {
      if(role === 'user'){
         const response = await getTrainers()
        if(response?.data){
             setUsers(response.data.trainers)
        }
      }else if(role === 'trainer'){
        const response = await getBookedUsersForChat()
        if(response?.data){

          setUsers(response.data.users)
        }
      }
      
        
    } catch (error) {
        showErrorToast(error)
    }  
  }
 
  useEffect(()=>{
      getUsersForChat()    
  },[])
  

   
  
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <NewNavbar role="user" logout={logoutUser}/>
      <div className="flex flex-1   text-white">

      {/* <NewSidebar profilePicture={userProfile?.profilePicture}
        uploadProfilePicApi={uploadUserProfileImage}
        role="user"
          items={[
            ["my profile",'profile'],
            ["my bookings",'my-bookings'],
            ["my subscription",'subscription'],

          ]}/> */}
          <ChatSidebar  users={users}/>
        <div className="flex-1 ml-0  pt-10 p-4">
  <Outlet context={{setConfirmPasswordModal}} />
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

export default ChatDashboard;
