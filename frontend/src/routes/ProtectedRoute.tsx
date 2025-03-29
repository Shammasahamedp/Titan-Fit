import { Navigate,Outlet,useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"


const ProtectedRoute = () => {
  const location = useLocation()
    const user = useSelector((state:RootState)=>state.user.user)
  return user ? <Outlet/> :<Navigate to ='/' state={{from:location}} replace/>
}

export default ProtectedRoute
