import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { ToastContainer } from "react-toastify";
import {
  ITrainerProfile,
} from "@/interfaces/trainer-interfaces";
import { logoutTrainer } from "@/api/auth";
import {  useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {

  uploadTrainerProfileImage,
} from "@/api/trainer-apicalls";
import { checkPasswordMatching } from "@/api/trainer-apicalls";
import ResetPasswordModal from "@/modal/ResetPasswordModal";
import { resetPassword } from "@/api/trainer-apicalls";
import ConfirmPasswordModal from "@/modal/ConfirmPasswordModal";
import { Outlet } from "react-router-dom";
const TrainerDashboard = () => {
  const [trainerProfile, setTrainerProfile] = useState<ITrainerProfile | null>(
    null
  );
  
  const [isModalOpen,setPasswordModal] = useState(false)
  const [isResetModalOpen,setResetPasswordModal] = useState(false)

  
 
  const confirmPassword = async(password:string)=>{
    try {
      const response = await checkPasswordMatching(password)
      if(response?.data.success){
               setPasswordModal(false)
               setResetPasswordModal(true)
      }
    } catch (error) {
      console.log(error)
      showErrorToast(error)
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
      showErrorToast(error)
    }
  }
  
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar logout={logoutTrainer} role="trainer" />
      <div className="flex flex-1   text-white">
        {/* Sidebar */}

        <SideBar
          profilePicture={trainerProfile?.profilePicture}
          uploadProfilePicApi={uploadTrainerProfileImage}
          role="trainer"
          items={[
            ["my bookings",'availability'],
           [ "my wallet",'wallet'],
          ]}
        />

        {/* Main Content */}
        {/* <Outlet context={{trainerProfile,setTrainerProfile,setPasswordModal}}/>
         */}
         <div className="flex-1 ml-0 p-4">
  <Outlet context={{trainerProfile,setTrainerProfile,setPasswordModal}} />
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
