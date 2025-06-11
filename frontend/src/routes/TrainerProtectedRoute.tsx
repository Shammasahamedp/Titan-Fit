import { Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/reduxStore/store"
import { getProfileCompletionStatus } from "@/api/localStorage"


const TrainerProtectedRoute = () => {

    const trainer = useSelector((state:RootState)=>state.trainer.trainer)
    console.log(trainer,'trainer')
    const trainerNew = getProfileCompletionStatus()
    console.log('trainernew',trainerNew)
    if(trainer&&trainerNew === 'true'){
        return <Navigate to='/trainer/profile-complete'/>
         
    }
    return trainer ? <Outlet/> : <Navigate to = '/login'/>
}

export default TrainerProtectedRoute
