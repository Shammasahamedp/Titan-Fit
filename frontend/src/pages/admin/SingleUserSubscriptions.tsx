import { getSingleUserSubscriptions } from "@/api/admin-apicalls"
import NewTable from "@/components/common/NewTable"
import { ISingleUserSubscriptions } from "@/interfaces/user-interfaces"
import { showErrorToast } from "@/utils/toast"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
const SingleUserSubscriptions = () => {
  const navigate = useNavigate()
  const [subsriptions,setSubscriptions] = useState<ISingleUserSubscriptions[]|[]>([])
  const {userId}  = useParams()
  const getSubscriptionOfUser = async(userId:string)=>{
    try {
       const response = await getSingleUserSubscriptions(userId)
       if(response?.data.subscriptions){
        let formattedSubscriptions = response.data.subscriptions.map((sub:ISingleUserSubscriptions)=>({
             ...sub,
            //  paymentId:sub.paymentId
             startDate: new Date(sub.startDate).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        endDate: new Date(sub.endDate).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        }))
        setSubscriptions(formattedSubscriptions)
        console.log('for',formattedSubscriptions)
       }

    } catch (error) {
      showErrorToast(error)
    }
  }
  useEffect(()=>{
     getSubscriptionOfUser(userId as string)
  },[])
  return (
    <div className="flex-1  p-6 pt-16 md:ml-64 overflow-x-auto">
    <h2 className="text-3xl font-bold mb-4 o hover:cursor-pointer">
       Subscription History
    </h2>
      <button onClick={()=>navigate('/admin/subscribedusers')}>
               <ArrowLeft/>
          </button>
    <NewTable columns={['planName','amountPaid','subscriptionId','paymentId','startDate','endDate','totalCredits','creditsRemaining','status']} tableDatas={subsriptions} filterKeys={['planName']}  />
 </div>
  )
}

export default SingleUserSubscriptions
