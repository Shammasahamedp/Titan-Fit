import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedChatRoute = () => {
    const user = useSelector((state:RootState)=>state.user.user)
    const trainer = useSelector((state:RootState)=>state.trainer.trainer)
    console.log('user',user,'trianer',trainer)
    if(!user && !trainer){
        return <Navigate to='/login' />
    }

    return <Outlet/>
}  

export default ProtectedChatRoute 
