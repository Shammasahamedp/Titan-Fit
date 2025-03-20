import Navbar from "../components/userComponents/Navbar";
import Hero from "@/components/userComponents/Hero";
import Services from "@/components/userComponents/ServiceFirstPart";
import ServiceSecondPart from "@/components/userComponents/ServiceSecondPart";
const LandingPage = () => {
  return(
    <div>
       <Navbar />
       <Hero/>
       <Services/>
       <ServiceSecondPart/>
    </div>
  );
};

export default LandingPage;
