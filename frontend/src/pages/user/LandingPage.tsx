import Navbar from "@/components/userComponents/Navbar";
import Hero from "@/components/userComponents/Hero";
import Services from "@/components/userComponents/ServiceFirstPart";
import ServiceSecondPart from "@/components/userComponents/ServiceSecondPart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";
import { logout } from "@/reduxStore/slices/user-slice";
import { authLogout } from "@/api/auth";
const LandingPage = () => {
  const user = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch()
  const userLogout = async ()=>{
    dispatch(logout())
    authLogout()
  }
   const handleSubscription = async(subscriptionId:string)=>{
      try {
        console.log(subscriptionId)
      } catch (error) {
        console.log(error)
      }
    }
  return(
    <div>
       {user ? <Navbar logout={userLogout} role='user' /> : <Navbar  role=""  />}
       <Hero/>
       <Services/>
       <ServiceSecondPart/>
    </div>
  );
};

export default LandingPage;
