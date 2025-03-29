import React from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import Form from "@/components/common/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
const UserDashboard: React.FC = () => {
  const user= useSelector((state:RootState)=>state.user?.user)||{}
  if(user){
    const {name,email,gender,age,fitnessGoal,weight,fitnessLevel} = user
  }
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="h-screen flex flex-col  bg-[url('/userdashboard.jpg')] bg-cover bg- bg-center bg-no-repeat min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1 h-screen   text-white">
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
        <div className="flex-1 p-6 pt-16 overflow-hidden relative">
          <h2 className="text-3xl font-bold mb-4">Profile Overview</h2>
          {isEditing ? (
            <div className="flex justify-center items-center min-h-[50vh]">
            <Form />
          </div>
          
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p>
                <strong>Name:</strong> somehtinfp
              </p>
              <p>
                <strong>Email:</strong> asdf
              </p>
              <p>
                <strong>Phone:</strong> asdf
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
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
