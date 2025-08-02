import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/LandingPage";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import TrainerProtectedRoute from "./routes/TrainerProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/user/Signup";
import TrainerSignup from "./pages/trainer/TrainerSignup";
import UserDashboard from "./pages/user/UserDashboard";
import PublicRoute from "./routes/PublicRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminTrainerManagement from "./pages/admin/AdminTrainerManagement";
import UserProfileComplete from "./pages/user/UserProfileComplete";
import TrainerProfileComplete from "./pages/trainer/TrainerProfileComplete";
import AdminSubscriptionManagement from "./pages/admin/AdminSubscriptionManagement";
import PaymentSuccess from "./pages/user/PaymentSuccess";
import TrainerAvailability from "./pages/trainer/TrainerAvailability";
import TrainerProfile from "./pages/trainer/TrainerProfile";
import UserProfile from "./pages/user/UserProfile";
import UserTrainerPage from "./pages/user/UserTrainerPage";
import UserSingleTrainer from "./pages/user/UserSingleTrainer";
import UserSubscriptionPage from "./pages/user/UserSubscriptionPage";
import AdminSubscribedUsers from "./pages/admin/AdminSubscribedUsers";
import SingleUserSubscriptions from "./pages/admin/SingleUserSubscriptions";
import TrainerBookedSession from "./pages/trainer/TrainerBookedSessions";
import UserBookings from "./pages/user/UserBookings";
import AdminSingleTrainer from "./pages/admin/AdminSingleTrainer";
import AdminSingleUser from "./pages/admin/AdminSingleUser";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import AdminNewTrainers from "./pages/admin/AdminNewTrainers";
import ProtectedChatRoute from "./routes/ProtectedChatRoute";
import ChatDashboard from "./pages/ChatDashboard";
import ChatWindow from "./components/common/Chatwindow";
function App() {
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/reset-password/:token" element={<ForgotPassword />} />

        <Route
          path="/user/profile-complete"
          element={<UserProfileComplete />}
        />
        <Route
          path="/trainer/profile-complete"
          element={<TrainerProfileComplete />}
        />
        <Route element={<ProtectedChatRoute/>}>
          <Route path="/chat" element={<ChatDashboard />}>
            <Route path=":id" element={<ChatWindow />} />
            
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trainer/signup" element={<TrainerSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/reset-password/:token" element={<ForgotPassword />} />
        </Route>

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/user" element={<UserDashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="subscription" element={<UserSubscriptionPage />} />
            <Route path="my-bookings" element={<UserBookings />} />
          </Route>
          <Route path="/trainers" element={<UserTrainerPage />} />

          <Route
            path="/trainers/single-trainer/:id"
            element={<UserSingleTrainer />}
          />
          <Route path="/user/profile-complete" element={<UserDashboard />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="usermanagement" element={<AdminUserManagement />} />
            <Route path="usermanagement/:userId" element={<AdminSingleUser />} />

            <Route
              path="trainermanagement"
              element={<AdminTrainerManagement />}
            />
            <Route
              path="newtrainers"
              element={<AdminNewTrainers />}
            />
            <Route
              path="trainermanagement/:trainerId"
              element={<AdminSingleTrainer />}
            />
            <Route
              path="subscriptionmanagement"
              element={<AdminSubscriptionManagement />}
            />
            <Route path="subscribedusers" element={<AdminSubscribedUsers />} />
            <Route
              path="subscribedusers/:userId"
              element={<SingleUserSubscriptions />}
            />
          </Route>
        </Route>

        <Route element={<TrainerProtectedRoute />}>
          <Route path="/trainer" element={<TrainerDashboard />}>
            <Route path="profile" element={<TrainerProfile />} />
            <Route path="availability" element={<TrainerAvailability />} />
            <Route path="bookedsessions" element={<TrainerBookedSession />} />
          </Route>
        </Route>
        {/* </Routes> */}
      </Routes>
    </Router>   
  );
}

export default App;
