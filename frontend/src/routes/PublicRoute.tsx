import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"
const PublicRoute = () => {
  const user = useSelector((state:RootState)=>state.user.user)
  const trainer = useSelector((state:RootState)=>state.trainer.trainer)
  const admin = useSelector((state:RootState)=>state.admin.admin)

  if(user) return <Navigate to="/user/home"/>

  if(trainer) return <Navigate to="/trainer/dashboard"/>
  if(admin) return <Navigate to="/admin/dashboard"/>
  return <Outlet/>
}

export default PublicRoute
