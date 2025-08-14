import React from 'react';
import { X } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  onConfirm,
  title = 'Notification',
  message,
  confirmText = 'Okay',
  cancelText = 'Cancel',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black border border-white/10 rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="text-lg font-semibold text-[#FFC436]">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/10 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="pt-4">
          <p className="text-white/80">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6 border-t border-white/10 pt-4">
          <button
            onClick={onClose}
            className="bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#FFC436] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
