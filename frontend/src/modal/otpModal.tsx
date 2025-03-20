import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { OtpModalProps } from "@/interfaces/Iotp-modalprops";
import { showErrorToast } from "@/utils/toast";
const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit,onResend}) => {
  const [otp, setOtp] = useState("");
  const [timer,setTimer] = useState(30)
  const [canResend,setCanResend] = useState(false)
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      setOtp(""); // Reset OTP input when modal opens
      setTimer(30); // Reset timer
      setCanResend(false);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown); // Cleanup on modal close
    }
  }, [isOpen]);

  const handleSubmit = async() => {
    if (otp.length === 6) {
      onSubmit(otp);
      setOtp("");
      // onClose();
    } else {
      // alert("Please enter a valid 6-digit OTP");
      showErrorToast('please enter a valid 6 digit OTP')
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      setTimer(30); // Reset timer
      setCanResend(false);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Enter OTP</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <p className="text-gray-600 mt-2">Enter the 6-digit OTP sent to your email.</p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg tracking-widest"
          placeholder="123456"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-600"
        >
          Submit OTP
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`${
              canResend ? "text-black hover:underline" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpModal;
