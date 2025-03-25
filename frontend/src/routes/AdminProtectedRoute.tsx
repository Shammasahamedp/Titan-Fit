import { Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"


const AdminProtectedRoute = () => {
    const admin = useSelector((state:RootState)=>state.admin.admin)

  return admin ? <Outlet/> : <Navigate to = '/admin/login'/>
}

export default AdminProtectedRoute
