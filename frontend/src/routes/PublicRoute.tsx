import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"
import { getProfileCompletionStatus } from "@/api/localStorage"
const PublicRoute = () => {
  const user = useSelector((state:RootState)=>state.user.user)
  const trainer = useSelector((state:RootState)=>state.trainer.trainer)
  const admin = useSelector((state:RootState)=>state.admin.admin)
    const userNew = getProfileCompletionStatus()

  if(user&&userNew === 'false') return <Navigate to="/user/home"/>

  if(trainer&&userNew === 'false') return <Navigate to="/trainer/dashboard"/>
  if(admin) return <Navigate to="/admin/dashboard"/>
  return <Outlet/>
}

export default PublicRoute
