import React from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { logoutAdmin } from "@/api/auth";
import { Outlet } from "react-router-dom";
const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
      <Navbar logout={logoutAdmin} role="trainer" />
      <div className="flex flex-1 text-white">
        <SideBar
          role="admin"
          items={[
            ["User management", "usermanagement"],
            ["Trainer management", "trainermanagement"],
            ["Subscription management", "subscriptionmanagement"],
            ['Subscribed Users','subscribedusers'],
            ['Payments','payments']
          ]}

          
        />
        <div className="flex-1 ml-0 p-4 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
