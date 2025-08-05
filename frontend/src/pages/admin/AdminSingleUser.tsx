import { getSingleUserDetails } from "@/api/admin-apicalls"
import { IUsers } from "@/interfaces/user-interfaces"
import ConfirmModal from "@/modal/ConfirmationModal"
import { showErrorToast } from "@/utils/toast"
import { ArrowLeft, SortAsc } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toggleUser } from "@/api/admin-apicalls"
import {  getUsersBookesSessionForAdmin } from "@/api/availability-apicalls"
import BackendTable from "@/components/common/BackendTable"


export interface IUserBookedSessionDetails{
  trainer:string;
  email:string;
  date:Date;
  time:string;
  status:'upcoming'|'completed'|'attended'
}

const AdminSingleUser = () => {
    const navigate = useNavigate()
    const {userId} = useParams()
    const [user,setUser] = useState<IUsers|null>(null)
    const [isModalOpen,setModalOpen] = useState(false)
    const [data,setData] = useState<IUserBookedSessionDetails[]>([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [search,setSearch] = useState('')
    const [sortKey,setSortKey] = useState<string|undefined>()
    const [sortAsc,setSortAsc] = useState(true)
    const fetchSingleUser = async ()=>{
        try {
            const response = await getSingleUserDetails(userId as string)
            setUser(response?.data.user)
        } catch (error) {
            showErrorToast(error)
        }
    }

    const fetchUserSessions = async()=>{
      try {
         const response = await getUsersBookesSessionForAdmin(
             user?._id as string,
             page,
             search,
             sortKey || '',
             sortAsc
         )
        setData(response?.data.userBookedSessions || [])
        setTotalPages(response?.data.totalPages || 1)
      } catch (error) {
        showErrorToast(error)
      }
    }

    const handleToggleUser = async(userId : string,blocked:boolean)=>{
            try {
                const response = await toggleUser(userId,blocked)
                if(response?.data.success){
                   setUser(response.data.user)
                   setModalOpen(false)
                }
            } catch (error) {
                showErrorToast(error)
            }
        }

    useEffect(()=>{
         fetchSingleUser()
    },[userId])

    useEffect(()=>{
      if(user){
        fetchUserSessions()
      }
    },[page, search, sortKey, sortAsc,user])
   return (
    <div className="w-full flex justify-center">
        <div className="max-w-4xl md:ml-94 w-full mx-auto  overflow-x-auto pt-16  bg-black/30  rounded-xl p-8 shadow-lg">
             <button onClick={() => navigate("/admin/usermanagement")}>
          <ArrowLeft />
        </button>
        {user && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-[400px] object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-white">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="text-white">{user.fitnessLevel}</p>

              
            </div>
          </div>
        )}
         <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-2xl font-semibold">Trainer sessions</h3>
            <button
              onClick={() =>
                setModalOpen(true)
              }
      className='px-3 py-1 rounded bg-[#FFC436] text-black hover:text-[#FFC436] hover:bg-black'
            >
              {user?.blocked ? "unblock" : "block"}
            </button>
            </div>
           <BackendTable
      columns={[["date",'date'], ["status",'status'], ["time",'time'], ["trainer",'name'],['email','email']]}
      tableDatas={data}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      onSearchChange={(value) => {
        setPage(1);
        setSearch(value);
      }}
      onSortChange={(key, asc) => {
        setSortKey(key as string);
        setSortAsc(asc);
      }}
      search={search}
      sortKey={sortKey as string}
      sortAsc={sortAsc}
      // filterKeys={["clientName", "status"]}
    />
         </div>
        </div>
        {isModalOpen && 
          <ConfirmModal onClose={()=>setModalOpen(false)} confirmToProceed={()=>handleToggleUser(user?._id as string,user?.blocked as boolean)}/>
        }
      
    </div>
  )
}

export default AdminSingleUser
