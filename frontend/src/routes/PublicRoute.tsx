import { RootState } from "@/reduxStore/store"
import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"
import { getProfileCompletionStatus } from "@/api/localStorage"
const PublicRoute = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const trainer = useSelector((state: RootState) => state.trainer.trainer);
  const admin = useSelector((state: RootState) => state.admin.admin);
  const userNew = getProfileCompletionStatus();

  if (user) {
    return userNew === 'true' ? (
      <Navigate to="/user/profile-complete" />
    ) : (
      <Navigate to="/home" />
    );
  }
 
  if (trainer) {
    console.log('insidedddddddddd',userNew)
    return userNew === 'true' ? (
      <Navigate to="/trainer/profile-complete" />
    ) : (
      <Navigate to="/trainer/profile" />
    );
  }

  if (admin) return <Navigate to="/admin" />;

  return <Outlet />;
};


export default PublicRoute
