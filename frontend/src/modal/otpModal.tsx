

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { OtpModalProps } from '@/interfaces/Iotp-modalprops';
import { showErrorToast } from '@/utils/toast';

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit, onResend }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOtp('');
      startTimer();
    }
  }, [isOpen]);

  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
      setOtp('');
    } else {
      showErrorToast('Please enter a valid 6-digit OTP');
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      startTimer();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/10 rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#FFC436]">Verify OTP</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/10 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-white/70 mb-4">
            Please enter the 6-digit OTP sent to your email.
          </p>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 bg-black/30 border rounded-lg 
              border-white/10 text-white placeholder-white/30
              focus:outline-none focus:border-warm-yellow
              tracking-widest text-center text-lg
              transition-colors duration-200"
            placeholder="Enter OTP"
          />

          <div className="mt-4 text-center">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm font-medium ${
                canResend
                  ? 'text-[#FFC436] hover:underline'
                  : 'text-white/30 cursor-not-allowed'
              }`}
            >
              {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 flex justify-evenly space-x-3">
          <button
            onClick={onClose}
            className="mt-4 mx-4 bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 mx-4 bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;

