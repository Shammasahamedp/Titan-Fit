import Navbar from "@/components/userComponents/Navbar"
import SideBar from "@/components/common/SideBar"
import { logoutAdmin } from "@/api/auth"
import NewTable from "@/components/common/NewTable"
import { useEffect, useState } from "react"
import { ITrainers } from "@/interfaces/trainer-interfaces"
import { fetchTrainers, toggleTrainer } from "@/api/admin-apicalls"
import { showErrorToast } from "@/utils/toast"
const AdminTrainerManagement = () => {
    const [trainers,setTrainers] = useState<ITrainers[]>([])
    useEffect(()=>{
          const getTrainers = async()=>{
             const response = await fetchTrainers()
             if(response?.data.trainers){
                setTrainers(response.data.trainers)
             }
          }
          getTrainers()
    },[])
    const handleToggleApprove = async(trainerId : string,approved:boolean)=>{
        try {
            const response = await toggleTrainer(trainerId,approved)
            if(response?.data.success){
                setTrainers((prev)=>
                  prev.map((trainer)=>
                       trainer._id === response.data.trainer._id
                       ?{...trainer,approved:response.data.trainer.approved}
                       :trainer
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
            ['Subscription management','subscriptionmanagement']
          ]}/>
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
             <h2 className="text-3xl font-bold mb-4 o hover:cursor-pointer">
                Trainer Management
             </h2>
             <NewTable columns={['profilePicture','name','email','phone','gender','yearsOfExperience']} tableDatas={trainers} filterKeys={['name','email','phone']} rederActions={(trainer)=>(
                <button
                onClick={() => handleToggleApprove(trainer._id,trainer.approved)}
                className={`px-3 py-1 rounded ${
                  trainer?.approved?  "bg-red-500":"bg-green-500" 
                } text-white`}
              >
                {trainer?.approved ? "Reject" : "Approve"}
              </button>
             )} />
          </div>
        </div>
     </div>
  )
}

export default AdminTrainerManagement
