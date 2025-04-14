import React, { useEffect,useState } from "react";
import Navbar from "@/components/userComponents/Navbar";
import SideBar from "@/components/common/SideBar";
import { logoutAdmin } from "@/api/auth";
import { fetchUsers } from "@/api/admin-apicalls";
import { IUsers } from "@/interfaces/user-interfaces";
import NewTable from "@/components/common/NewTable";
import { toggleUser } from "@/api/admin-apicalls";
import { showErrorToast } from "@/utils/toast";
const AdminUserManagement: React.FC = () => {
 const [users,setUsers] = useState<IUsers[]>([])
    useEffect(()=>{
       const getUsers = async()=>{
       const response = await fetchUsers()
       console.log(response)
       if(response){
        setUsers(response.data.users)
       }
       }
       getUsers()
    },[])

 const handleToggleUser = async(userId : string,blocked:boolean)=>{
        try {
            const response = await toggleUser(userId,blocked)
            if(response?.data.success){
                setUsers((prev)=>
                  prev.map((user)=>
                       user._id === response.data.user._id
                       ?{...user,blocked:response.data.user.blocked}
                       :user
                  )
                )
            }
        } catch (error) {
            showErrorToast('')
        }
    }

  return (
     <div className="flex flex-col bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat min-h-screen w-full">
        <Navbar logout={logoutAdmin} role="trainer"/>
        <div className="flex flex-1 text-white">
          <SideBar role="admin"  items={[
            ['User management','usermanagement'],
            ['Trainer management','trainermanagement'],
            ['Subscription management','trainermanagement']
          ]}/>
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
             <h2 className="text-3xl font-bold mb-4 o hover:cursor-pointer">
                User Management
             </h2>
             {/* <Table columns={['name','email','phone','gender','fitnessGoal','fitnessLevel','action']} tableDatas={users} /> */}
             <NewTable columns={['name','email','phone','gender','fitnessGoal','fitnessLevel']} tableDatas={users} filterKeys={['name','email','phone']} rederActions={(user)=>(
               <button
               onClick={()=>handleToggleUser(user._id,user.blocked)}
               className={`px-3 py-1 rounded ${
                  user?.blocked?  "bg-green-500" :"bg-red-500"
                } text-white`}
               >
                {user?.blocked? 'Unblock':'block'}
               </button>
             )}/>
          </div>
        </div>
     </div>
  );
};

export default AdminUserManagement;
