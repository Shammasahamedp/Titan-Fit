import React, { useEffect, useState } from "react";
import { INotification } from "@/interfaces/INotification";
import { X } from "lucide-react";
import { getNotification } from "@/api/user-apicalls";
import { markNotificationAsRead } from "@/api/notification-apicalls";
import { showErrorToast } from "@/utils/toast";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotification()
      console.log('res',res?.data)
      setNotifications(res?.data.notifications)
    } catch (err) {
      showErrorToast(err)
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      let success = await markNotificationAsRead(id)
      if(success){
           setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      }
     
    } catch (err) {
     showErrorToast(err)
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400">No notifications found</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 mb-3 rounded-lg border ${
                  n.isRead ? "border-gray-700 bg-gray-800" : "border-blue-500 bg-gray-800"
                }`}
              >
                <p className="text-sm">{n.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {n.createdAt&&new Date(n?.createdAt).toLocaleString()}
                  </span>
                  {!n.isRead && (
                    <button
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => markAsRead(n._id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
