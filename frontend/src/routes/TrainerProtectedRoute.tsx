import { Navigate,Outlet } from "react-router-dom"
import { useSelector, UseSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"


const TrainerProtectedRoute = () => {

    const trainer = useSelector((state:RootState)=>state.trainer.trainer)

    return trainer ? <Outlet/> : <Navigate to = '/login'/>
}

export default TrainerProtectedRoute
