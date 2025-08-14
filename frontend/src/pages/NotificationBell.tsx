import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  count: number;
  hasNew?: boolean;
  onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ count, hasNew = false, onClick }) => {
  return (
    <button className="relative p-2 text-white" onClick={onClick}>
      {hasNew && (
        <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#FFC436] rounded-full animate-ping" />
      )}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-h-[20px] min-w-[20px] bg-[#FFC436] text-black text-xs font-semibold
                         flex items-center justify-center rounded-full">
          {count > 9 ? '9+' : count}
        </span>
      )}
      <Bell className="h-6 w-6" />
    </button>
  );
};

export default NotificationBell;
