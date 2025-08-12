'use client';

import { useEffect, useState } from 'react';

interface Notification {
  _id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsListProps {
  userId: string;  // Current logged-in user ka ID
}

export default function NotificationsList({ userId }: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notifications fetch karna
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(`/api/notifications?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();

        if (data.success) {
          setNotifications(data.notifications);
        } else {
          setError('No notifications found');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching notifications');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  // Notification read mark karna (optional)
  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}

      <ul>
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className={`p-3 mb-2 rounded cursor-pointer border ${
              notification.isRead ? 'bg-gray-100' : 'bg-blue-100 font-semibold'
            }`}
            onClick={() => markAsRead(notification._id)}
            title={notification.isRead ? 'Read' : 'Mark as read'}
          >
            <div>{notification.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
