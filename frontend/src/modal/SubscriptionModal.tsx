import { getActiveSubscription } from "@/api/subscription-apicalls";
import { getProfile } from "@/api/user-apicalls";
import { ISubscriptionInput } from "@/interfaces/IsubscriptionInputs";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
};
const SubscriptionModal = ({ isOpen, onClose, onSubscribe }: Props) => {
  const [plans, setPlans] = useState<(ISubscriptionInput & { _id: string })[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasSubscriptionAlready,setHasSubscription] = useState(false)
  useEffect(() => {
    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      const userProfile = await getProfile()
       console.log(userProfile)
      if(userProfile?.subscription?.length){
        let length = userProfile.subscription.length
        const lastSubscription = userProfile.subscription[length-1]
        const endTs = new Date(lastSubscription.endDate).getTime()
        const nowTs = Date.now()
      
       if( lastSubscription.creditsRemaining > 0 && endTs>nowTs){
              setHasSubscription(true)
       }else{
        setLoading(true);
        const res = await getActiveSubscription();
        if (res) {
          setPlans(res.data.activeSubscriptions);
        }
       }
      }else{
        setLoading(true);
        const res = await getActiveSubscription();
        if (res) {
          setPlans(res.data.activeSubscriptions);
        }
      }

     
    } catch (error) {
      showErrorToast(error);
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto px-4 py-30">
      <div className="bg-[url('/userdashboard.jpg')] bg-cover bg-fixed bg-center bg-no-repeat rounded-lg p-6 max-w-4xl w-full max-h-[90vh] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          Choose Your Plan
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : hasSubscriptionAlready ?(
          <div className="text-center">
          <p className="text-[#FFC436] mb-4">
            You already have an active subscription plan.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-[#FFC436] font-medium text-black px-6 py-3 rounded-lg hover:bg-[#0f0f0f] hover:text-[#FFC436]"
            >
              Go to my plan
            </button>
          </div>
        </div>
        

        ):(
          <div className="flex flex-wrap justify-center gap-6 text-white">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="border rounded-xl p-6 shadow-md w-full sm:w-64 text-center"
              >
                <h3 className="text-xl font-bold mb-2">{plan.planName}</h3>
                <p className="text-3xl font-semibold mb-4">${plan.price}</p>
                <p className="text-xl font-medium mb-2">Benefits</p>
                <div className="mb-4 text-left">
                  <p className="mb-2">{plan.description}</p>
                  
                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {plan.durationInMonth} Months
                  </p>
                  <p>
                    <span className="font-semibold">Credits:</span>{" "}
                    {plan.credits} 
                  </p>
                </div>
        
                <button
                  onClick={() => onSubscribe(plan._id)}
                  className="mt-4 bg-[#FFC436] text-black px-6 py-3 rounded-lg hover:bg-[#0f0f0f] hover:text-[#FFC436]"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;

