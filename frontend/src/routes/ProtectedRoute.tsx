import { Navigate,Outlet,useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"
import { getProfileCompletionStatus } from "@/api/localStorage"


const ProtectedRoute = () => {
  const location = useLocation()
    const user = useSelector((state:RootState)=>state.user.user)
    const userNew = getProfileCompletionStatus()
    if(user&&userNew === 'true') {
      return <Navigate to = '/user/profile-complete'/>
       
    }
  return user ? <Outlet/> :<Navigate to ='/' state={{from:location}} replace/>
}

export default ProtectedRoute
