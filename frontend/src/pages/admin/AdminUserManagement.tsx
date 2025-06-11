import React, { useEffect,useState } from "react";
import { fetchUsers } from "@/api/admin-apicalls";
import { IUsers } from "@/interfaces/user-interfaces";
import NewTable from "@/components/common/NewTable";
import { showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminUserManagement: React.FC = () => {
  const navigate = useNavigate()
 const [users,setUsers] = useState<IUsers[]>([])
    useEffect(()=>{
       const getUsers = async()=>{
       try {
         const response = await fetchUsers()
       console.log(response)
       if(response){
        setUsers(response.data.users)
       }
       } catch (error) {
         console.log('erro reached',error)
         showErrorToast(error)
       }
       }
       getUsers()
    },[])



  return (
    
         <>
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2  className="text-3xl font-bold">User Management</h2>
            <button
              className="bg-[#FFC436] text-black font-semibold px-4 py-2 mt-3  rounded hover:bg-black hover:text-[#FFC436]"
              onClick={()=>navigate('/admin/subscribedusers')}
            >
              Show Subscribed Users
            </button>
          </div>
             <NewTable columns={['name','email','phone','gender','fitnessGoal','fitnessLevel']} tableDatas={users} filterKeys={['name','email','phone']} rederActions={(user)=>(
               <button
               onClick={()=>navigate(`/admin/usermanagement/${user._id}`)}
                 className=" space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-1 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
               >
                View
               </button>
             )}/>
          </div>
        <ToastContainer/></>
  );
};

export default AdminUserManagement;
