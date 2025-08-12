'use client';

import { useEffect, useState } from 'react';

interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContractorDashboardNotifications({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/users/notifications?userId=${userId}`);
        const data = await res.json();

        if (data.notifications) {
          const unread = data.notifications.filter((n: Notification) => !n.isRead).length;
          setNotifications(data.notifications);
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error('Notification fetch failed:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // auto-refresh every 10 sec
    return () => clearInterval(interval);
  }, [userId]);

  const markAllAsRead = async () => {
    await fetch(`/api/users/mark-read?userId=${userId}`, {
      method: 'POST',
    });

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <i className="ri-notification-3-line text-2xl text-blue-700"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 border border-gray-200">
          <div className="px-4 py-2 flex justify-between items-center border-b">
            <span className="font-medium text-gray-700">Notifications</span>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n._id} className="px-4 py-2 text-sm text-gray-800">
                  {n.message}
                  <div className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-4 text-sm text-gray-500">No notifications yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
