
import NewTable from "@/components/common/NewTable"
import { useEffect, useState } from "react"
import { ITrainers } from "@/interfaces/trainer-interfaces"
import { fetchNewTrainers  } from "@/api/admin-apicalls"
import { useNavigate } from "react-router-dom"
import { showErrorToast } from "@/utils/toast"
const AdminNewTrainers = () => {
    const [newTrainers,setTrainers] = useState<ITrainers[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
          const getTrainers = async()=>{
            try {
                const response = await fetchNewTrainers()
             if(response?.data.newTrainers){
                setTrainers(response.data.newTrainers)
             }
            } catch (error) {
               showErrorToast(error)
            }
          }
          getTrainers()
    },[])
   
  return (
   
          <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
                      <div className="flex justify-between items-center mb-6">

             <h2 className="text-3xl font-bold mb-4 o hover:cursor-pointer">
                Newly Joined Trainers 
             </h2>
             <button
              className="bg-[#FFC436] text-black font-semibold px-4 py-2 mt-3  rounded hover:bg-black hover:text-[#FFC436]"
              onClick={()=>navigate('/admin/trainermanagement')}
            >
               All Trainers 
            </button>
            </div>
             <NewTable columns={['profilePicture','name','email','phone','gender','yearsOfExperience']} tableDatas={newTrainers} filterKeys={['name','email','phone']} rederActions={(trainer)=>(
                <button
                onClick={() => navigate(`/admin/trainermanagement/${trainer._id}`)}
                 className=" space-x-2 bg-[#FFC436] text-black px-4 font-semibold py-2 rounded hover:bg-black hover:text-[#FFC436] transition-colors"
              >
                View 
              </button>
             )} />
            
          </div>
      
  )
}

export default AdminNewTrainers
