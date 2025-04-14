import React from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { logoutAdmin } from "@/api/auth";
const AdminDashboard: React.FC = () => {
 


  return (
     <div className="flex flex-col bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
        <Navbar logout={logoutAdmin} role="trainer"/>
        <div className="flex flex-1 text-white">
          <SideBar role="admin"  items={[
            ['User management','usermanagement'],
            ['Trainer management','trainermanagement'],
            ['Subscription management','subscriptionmanagement']
          ]}/>

        </div>
     </div>
  );
};

export default AdminDashboard;
