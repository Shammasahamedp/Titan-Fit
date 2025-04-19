import { Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"
import { getProfileCompletionStatus } from "@/api/localStorage"


const TrainerProtectedRoute = () => {

    const trainer = useSelector((state:RootState)=>state.trainer.trainer)
    const trainerNew = getProfileCompletionStatus()
    if(trainer&&trainerNew === 'true'){
        <Navigate to='/trainer/profile-complete'/>
        return 
    }
    return trainer ? <Outlet/> : <Navigate to = '/login'/>
}

export default TrainerProtectedRoute
