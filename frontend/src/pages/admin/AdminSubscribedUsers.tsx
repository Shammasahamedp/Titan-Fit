import { getSubscribedUsers } from "@/api/admin-apicalls"
import { ISubscribersTableData } from "@/interfaces/user-interfaces"
import { showErrorToast } from "@/utils/toast"
import { useEffect, useState } from "react"
import NewTable from "@/components/common/NewTable"
import { ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
const AdminSubscribedUsers = () => {
  const navigate = useNavigate()
  const [subscribers,setSubscribers] = useState<ISubscribersTableData[]|[]>([])
   const fetchSubscribedUsers = async ()=>{
    try {

       const response = await getSubscribedUsers()
       const users = response?.data.subscribers
      setSubscribers(users)

    } catch (error) {
      showErrorToast(error)
    }
   }
   const getSubscriptionsOfSelectedUser = async(userId:string)=>{
    try {
        navigate(`/admin/subscribedusers/${userId}`)
    } catch (error) {
      showErrorToast(error)
    }
   }
  useEffect(()=>{
        fetchSubscribedUsers()
  },[])
  return (
    <>
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2  className="text-3xl font-bold">Subscribers</h2>
            
          </div>
          <div className="w-full overflow-x-auto">
    <NewTable
      columns={['name','planName','status','totalCredits','creditsRemaining']}
      tableDatas={subscribers}
      filterKeys={['name']}
     rederActions={(user)=>(
      <button
      onClick={() => getSubscriptionsOfSelectedUser(user.id)}
      className='px-3 py-1 rounded bg-[#FFC436] text-black hover:text-[#FFC436] hover:bg-black'
    >
      Show full history
    </button>
    )
     }
    />
  </div>
          </div>
          
        <ToastContainer/></>  
  )
}

export default AdminSubscribedUsers
