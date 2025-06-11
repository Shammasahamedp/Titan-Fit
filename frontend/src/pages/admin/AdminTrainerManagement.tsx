
import NewTable from "@/components/common/NewTable"
import { useEffect, useState } from "react"
import { ITrainers } from "@/interfaces/trainer-interfaces"
import { fetchTrainers  } from "@/api/admin-apicalls"
import { useNavigate } from "react-router-dom"
import { showErrorToast } from "@/utils/toast"
const AdminTrainerManagement = () => {
    const [trainers,setTrainers] = useState<ITrainers[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
          const getTrainers = async()=>{
            try {
                const response = await fetchTrainers()
             if(response?.data.trainers){
                setTrainers(response.data.trainers)
             }
            } catch (error) {
               showErrorToast(error)
            }
          }
          getTrainers()
    },[])
   
  return (
   
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
             <h2 className="text-3xl font-bold mb-4 o hover:cursor-pointer">
                Trainer Management
             </h2>
             <NewTable columns={['profilePicture','name','email','phone','gender','yearsOfExperience']} tableDatas={trainers} filterKeys={['name','email','phone']} rederActions={(trainer)=>(
                <button
                onClick={() => navigate(`/admin/trainermanagement/${trainer._id}`)}
                 className=" space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-2 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
              >
                {/* {trainer?.approved ? "Reject" : "Approve"} */}
                View 
              </button>
             )} />
            
          </div>
      
  )
}

export default AdminTrainerManagement
