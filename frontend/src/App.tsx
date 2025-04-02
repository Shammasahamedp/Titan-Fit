import { BrowserRouter as Router ,Routes ,Route} from "react-router-dom"
import LandingPage from "./pages/user/LandingPage"
import AdminLogin from "./pages/admin/AdminLogin"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminProtectedRoute from "./routes/AdminProtectedRoute"
import TrainerProtectedRoute from "./routes/TrainerProtectedRoute"
import Login from "./pages/Login"
import Signup from "./pages/user/Signup"
import TrainerSignup from "./pages/trainer/TrainerSignup"
import UserDashboard from "./pages/user/UserDashboard"
import PublicRoute from "./routes/PublicRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import TrainerDashboard from "./pages/trainer/TrainerDashboard"

function App() {

  return (
    <Router>
      <Routes>
           {/* Public routes */}
          <Route element={<PublicRoute/>}>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/trainer/signup' element={<TrainerSignup/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          </Route>


          {/* protected routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path='/user/home' element={<LandingPage/>}/>
            <Route path="/user/profile" element={<UserDashboard/>}/>
          </Route>

          <Route element={<AdminProtectedRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          </Route>

          <Route element={<TrainerProtectedRoute/>}>
            <Route path='/trainer/dashboard' element={<TrainerDashboard/>}/>
          </Route>
      </Routes>
    </Router>
  )
}

export default App
