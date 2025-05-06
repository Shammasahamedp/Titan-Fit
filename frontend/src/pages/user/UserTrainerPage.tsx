import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { logoutUser } from "@/api/auth"
import Navbar from "@/components/userComponents/Navbar"
import Trainers from "./Trainers"
const UserTrainerPage = () => {
    const user = useSelector((state:RootState)=>state.user.user)
  return (
    <div>
      {user ? <Navbar logout={logoutUser} role="user"/>:<Navbar role=""/>}
      <Trainers/>
    </div>
  )
}

export default UserTrainerPage
