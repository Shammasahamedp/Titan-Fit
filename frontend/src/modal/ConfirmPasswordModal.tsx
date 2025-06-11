


import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { IForgotPasswordModalProps } from '@/interfaces/IforgotpasswordModal';
import { showErrorToast } from '@/utils/toast';

const ConfirmPasswordModal: React.FC<IForgotPasswordModalProps> = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!/.{8,}/.test(password)) {
      showErrorToast('Password must contain at least 8 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(password);
    } catch (error) {
      console.error('Error submitting password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/10 rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#FFC436]">
            Confirm Current Password
          </h3>
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
            Please enter your current password to continue.
          </p>
          
          <div className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border rounded-lg 
                  border-white/10 text-white placeholder-white/30
                  focus:outline-none focus:border-warm-yellow
                  transition-colors duration-200"
                placeholder="Enter your current password"
                autoComplete="current-password"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 flex justify-evenly space-x-3">
          <button
            onClick={onClose}
            className="mt-4 mx-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 mx-4 bg-[#FFC436]  text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordModal;