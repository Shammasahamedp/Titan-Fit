import { Button } from '../ui/button';
import SubscriptionModal from "@/modal/SubscriptionModal";
import { useState } from 'react';
import { makeStripeSession } from '@/api/payment-apicalls';
import { showErrorToast } from '@/utils/toast';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/reduxStore/store';
const Services = () => {
  const [isSubscriptionModalOpen,setSubscriptionModal] = useState(false)
   const user=useSelector((state:RootState)=>state.user.user)
   
   const handleSubscription = async(subscriptionId:string)=>{
      try {
        if(user === null){
          throw new Error('Not logged in')
         }
        const response = await makeStripeSession (subscriptionId)
        window.location.href = response?.data.url
        console.log(subscriptionId)
      } catch (error) {
        showErrorToast(error)
        console.log(error)
      }
    }

  return (
    <>
    <section className="w-full py-16 px-4 md:px-8" style={{backgroundImage:"url('/white-bg.jpg')"}}>
         <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black">Take Your Fitness to the Next Level</h2>
        <p className="mt-2 text-lg text-gray-700">Join our exclusive training programs and meal plans designed for you.</p>
        <Button onClick={()=>setSubscriptionModal(true)} className="mt-4 bg-[#FFC436] text-black px-6 py-3 rounded-lg hover:bg-[#0f0f0f] hover:text-[#FFC436]" >
          Go Pro
        </Button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Personal Trainer Section */}
        <div 
          className="relative group h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/personal-trainer-bg.webp" 
            alt="Personal Trainer" 
            loading='lazy'
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
            <h2 className="text-3xl font-bold">Personal Trainer</h2>
            <p className="mt-2 text-lg">Unleash your potential with expert training</p>
          </div>
        </div>

        {/* Meal Plan Section */}
        <div 
          className="relative group h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/mealplan-bg.jpg" 
            alt="Meal Plan" 
            loading='lazy'
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
            <h2 className="text-3xl font-bold">Meal Plan</h2>
            <p className="mt-2 text-lg">Customized diet plans for you</p>
          </div>
        </div>

      </div>
      {
        isSubscriptionModalOpen&&
        <SubscriptionModal  isOpen={isSubscriptionModalOpen}  onClose={()=>setSubscriptionModal(false)} onSubscribe={handleSubscription}/>
      }
    </section>
    <ToastContainer/>
    </>
    
  );
};

export default Services;
