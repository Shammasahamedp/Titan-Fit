import { BrowserRouter as Router } from "react-router-dom"
import TrainerRoute from "./routes/trainerRoute"
import UserRoute from "./routes/userRoute"
function App() {

  return (
    <Router>
     <UserRoute/>
     <TrainerRoute />
    </Router>
  )
}

export default App
