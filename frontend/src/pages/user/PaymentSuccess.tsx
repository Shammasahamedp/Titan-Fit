import { getSessionDetails } from "@/api/payment-apicalls";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sessionDetails, setSessionDetails] = useState<any>(null);

  const getSessionId = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('session_id');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionId = getSessionId();
        const response = await getSessionDetails(sessionId as string);
        setSessionDetails(response?.data.sessionDetails);
      } catch (error) {
        showErrorToast(error);
      }
    };
    fetchData();
  }, []);

  if (!sessionDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <div className="text-black text-xl">Loading payment details...</div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
        <div className="bg-black p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
          <svg
            className="mx-auto mb-4 w-16 h-16 text-[#FFC436]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-[#FFC436] mb-2">Payment Successful!</h2>
          <p className="text-white mb-6">
            Thank you for your purchase. Here are your payment details:
          </p>

          <div className="text-left  text-white space-y-4 mb-6">
            <div className="overflow-x-auto">
              <p>
                <span className="font-semibold">Payment ID:</span>
                <span className="ml-2">{sessionDetails.id}</span>
              </p>
            </div>
            <p>
              <span className="font-semibold">Amount Paid:</span> ${(sessionDetails.amount_total / 100).toFixed(2)} {sessionDetails.currency?.toUpperCase()}
            </p>
            <p>
              <span className="font-semibold">Customer Email:</span> {sessionDetails.customer_email}
            </p>
            <p>
              <span className="font-semibold">Payment Date:</span> {new Date(sessionDetails.created * 1000).toLocaleString()}
            </p>
            {sessionDetails.payment_status && (
              <p>
                <span className="font-semibold">Payment Status:</span> {sessionDetails.payment_status}
              </p>
            )}
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#FFC436] text-black rounded-full hover:bg-black hover:text-[#FFC436] transition"
          >
            Go to Home
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
