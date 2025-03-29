import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { Outlet,Navigate,useLocation } from "react-router-dom"
const PublicRoute = () => {
  const location = useLocation()
  const user = useSelector((state:RootState)=>state.user.user)
  return user?<Navigate to='/user/home' state={{from:location}} replace/>:<Outlet/>
}

export default PublicRoute
