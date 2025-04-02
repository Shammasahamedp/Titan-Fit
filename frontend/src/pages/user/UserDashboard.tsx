import React, { useEffect } from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import Form from "@/components/common/Form";
import { useState } from "react";
import { getProfile } from "@/api/user-apicalls";
import { IUserProfile } from "@/interfaces/user-interfaces";
import { showErrorToast } from "@/utils/toast";
import { userErrors } from "@/messages/userside-error";
const UserDashboard: React.FC = () => {
  const [userProfile,setUserProfile] = useState<IUserProfile|null>(null)
  useEffect( ()=>{
    const fetchUserProfile = async ()=>{
      console.log('hello')
      try {
       const   userProfileDetails = await getProfile()
       if(userProfileDetails){
        console.log(userProfileDetails)
        setUserProfile(userProfileDetails)
       }
       
      } catch (error) {
        showErrorToast(userErrors.PROFILE_ERROR)
      }
    }
    fetchUserProfile()
  },[])
   console.log('sdfffffffffffffffff',userProfile?.name)
   
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className=" flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1   text-white">
        {/* Sidebar */}

        <SideBar
          items={[
            "my bookings",
            "my meal plan",
            "my wallet",
            "my subscription",
          ]}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 pt-16 md:ml-64">
          <h2 className="text-3xl font-bold mb-4 o">Profile Overview</h2>
          {isEditing && userProfile? (
            <div className="flex justify-center items-center min-h-screen">
            <Form fieldConfig={[
              {label:'Name',value:userProfile?.name,placeholder:'ehll',name:'name'}
            ]} initialData={userProfile}/>
          </div>
          
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-2">
              <div className="flex justify-between">
                <strong>Name:</strong> <span className="text-white">{userProfile?.name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Email:</strong> <span className="text-white">{userProfile?.email}</span>
              </div>
              <div className="flex justify-between">
                <strong>Phone:</strong> <span className="text-white">{userProfile?.phone||'not added'}</span>
              </div>
              <div className="flex justify-between">
                <strong>Age:</strong> <span className="text-white">{userProfile?.age}</span>
              </div>
              <div className="flex justify-between">
                <strong>Gender:</strong> <span className="text-white">{userProfile?.gender||'not added'}</span>
              </div>
              <div className="flex justify-between">
                <strong>Height:</strong> <span className="text-white">{userProfile?.height||'not added'}</span>
              </div>
              <div className="flex justify-between">
                <strong>Weight:</strong> <span className="text-white">{userProfile?.weight||'not added'}</span>
              </div>
              
              <div className="flex justify-between">
                <strong>Fitness Goal:</strong> <span className="text-white">{userProfile?.fitnessGoal}</span>
              </div><div className="flex justify-between">
                <strong>Fitness Level:</strong> <span className="text-white">{userProfile?.fitnessLevel}</span>
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
    </div>
  );
};

export default UserDashboard;
