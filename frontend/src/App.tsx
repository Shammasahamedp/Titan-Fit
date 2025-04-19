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
import ForgotPassword from "./pages/ForgotPassword"
import AdminUserManagement from "./pages/admin/AdminUserManagement"
import AdminTrainerManagement from "./pages/admin/AdminTrainerManagement"
import UserProfileComplete from "./pages/user/UserProfileComplete"
import TrainerProfileComplete from './pages/trainer/TrainerProfileComplete'
// import AdminSubscriptionManagement from "./pages/admin/AdminSubscriptionManagement"
function App() {

  return (
    <Router>
      <Routes>
           {/* Public routes */}
           <Route path='/reset-password/:token' element={<ForgotPassword/>}/>
           <Route path='/user/profile-complete' element={<UserProfileComplete/>}/>
           <Route path='/trainer/profile-complete' element={<TrainerProfileComplete/>}/>

          <Route element={<PublicRoute/>}>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/trainer/signup' element={<TrainerSignup/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/reset-password/:token' element={<ForgotPassword/>}/>
          </Route>


          {/* protected routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path='/user/home' element={<LandingPage/>}/>
            <Route path="/user/profile" element={<UserDashboard/>}/>
            <Route path="/user/profile-complete" element={<UserDashboard/>}/>

          </Route>

          <Route element={<AdminProtectedRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path="/admin/usermanagement" element={<AdminUserManagement/>}/>
            <Route path="/admin/trainermanagement" element={<AdminTrainerManagement/>}/>
            {/* <Route path="/admin/subscriptionmanagement" element={<AdminSubscriptionManagement/>}/> */}

          </Route>

          <Route element={<TrainerProtectedRoute/>}>
            <Route path='/trainer/dashboard' element={<TrainerDashboard/>}/>
            <Route path="/trainer/profile-complete" element={<UserDashboard/>}/>

          </Route>
      </Routes>
    </Router>
  )
}

export default App
