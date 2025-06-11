import { getProfile } from "@/api/user-apicalls";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { ISubscriptionDetails } from "@/interfaces/user-interfaces";
import moment from "moment";
import NewTable from "@/components/common/NewTable";
const UserSubscriptionPage = () => {
  const [currentPlan, setCurrentPlan] = useState<ISubscriptionDetails | null>(
    null
  );
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [oldPlans, setOldPlans] = useState<ISubscriptionDetails[] | null>(null);
  const fetchSubscription = async () => {
    try {
      const userProfile = await getProfile();
      const subscription = userProfile?.subscription;
      console.log('subscription',subscription)
      if (Array.isArray(subscription)&&subscription.length>0) {
        if (subscription.length > 1) {
          const usedPlans = subscription.slice(0, subscription.length - 1);
          console.log(usedPlans);
          setOldPlans(usedPlans);
        }
        let length = subscription?.length;
        const lastSubscription = subscription[length - 1];
        console.log(lastSubscription);
        const endTs = new Date(lastSubscription.endDate).getTime();
        const nowTs = Date.now();
        console.log(endTs, nowTs);
        if (lastSubscription.creditsRemaining > 0 && endTs > nowTs) {
          setCurrentPlan(lastSubscription);
          console.log(currentPlan)
          const remaining = Math.ceil((endTs - nowTs) / (1000 * 60 * 60 * 24));
          setDaysRemaining(remaining);
        }
      }
    } catch (error) {
      showErrorToast(error);
    }
  };
  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h2 className="text-3xl font-bold text-warm-yellow mb-2">
        My Subscriptions
      </h2>

      {currentPlan ? (
        <div className="bg-black/30 border border-white/10 rounded-xl p-6 shadow-lg  text-white">
          <h3 className="text-xl font-semibold mb-2">
            Current Plan : {currentPlan.planName}
          </h3>
          <p className="mb-1">
            <span className="font-bold">Expires:</span>{" "}
            {moment(currentPlan.endDate).format("MMM Do YYYY")}
          </p>
         
          <p className="mb-1">
            <span className="font-bold">Credits Remaining:</span>{" "}
            {currentPlan.creditsRemaining}
          </p>
          <p className="text-[#FFC436]  font-medium">
            {daysRemaining !== null
              ? `${daysRemaining} day(s) remaining`
              : "Loading..."}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-8">No active subscription plan.</p>
      )}
      {oldPlans && (
        <NewTable
          columns={[
            "Start Date",
            "Cash Paid",
            "Name",
            "End Date",
            "Credits used",
          ]}
          tableDatas={oldPlans}
        />
      )}
    </div>
  );
};

export default UserSubscriptionPage;
