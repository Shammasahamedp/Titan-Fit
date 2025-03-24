import { Route,Routes } from "react-router-dom"
import TrainerSignup from "@/pages/TrainerSignup"
const TrainerRoute = () => {
  return (
        <Routes>
            <Route path='/trainer/signup' element={<TrainerSignup/>}/>
        </Routes>
  )
}

export default TrainerRoute
