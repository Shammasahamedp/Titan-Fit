import { motion } from "framer-motion";
import { useState } from "react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
      setOtp(""); // Reset OTP input
      onClose();
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

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
      </motion.div>
    </div>
  );
};

export default OtpModal;
