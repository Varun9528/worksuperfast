'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { BellIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedType, setSelectedType] = useState<'all' | 'contractor' | 'post-work'>('all');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');

    if (!token || !email) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/profile?email=${email}`);
        if (!res.ok) throw new Error('User profile fetch failed');

        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('userId', data.user._id);

        const notiRes = await fetch(`/api/users/notifications?userId=${data.user._id}`);
        const notiData = await notiRes.json();

        if (notiData.success) {
          console.log('✅ Notifications fetched:', notiData.notifications); // ✅ DEBUG
          setNotifications(notiData.notifications || []);
          const unread = (notiData.notifications || []).filter((n: any) => !n.isRead).length;
          setUnreadCount(unread);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(
        notifications.filter((n: any) => (n.type || 'general') === selectedType)
      );
    }
  }, [selectedType, notifications]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  if (status === 'loading' || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <span className="text-xl font-bold text-blue-700">User Dashboard</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
              <HomeIcon className="w-5 h-5" /> Home
            </Link>

            <div className="relative">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  if (unreadCount > 0) markAllAsRead();
                }}
                className="relative focus:outline-none"
              >
                <BellIcon className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b font-semibold text-gray-700">
                      Notifications
                    </div>

                    <div className="px-4 py-2 border-b">
                      <select
                        value={selectedType}
                        onChange={(e) =>
                          setSelectedType(e.target.value as 'all' | 'contractor' | 'post-work')
                        }
                        className="w-full border px-3 py-2 rounded text-sm"
                      >
                        <option value="all">All</option>
                        <option value="contractor">Add Contractor</option>
                        <option value="post-work">Post Work</option>
                      </select>
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((note, idx) => (
                          <div key={idx} className="px-4 py-3 hover:bg-gray-50">
                            <p className="text-sm text-gray-800">{note.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(note.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-4 text-sm text-gray-500">No notifications.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold uppercase">
              {user.name?.charAt(0)}
            </div>
          </div>
        </div>
      </nav>

      {/* PROFILE */}
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-medium text-sm text-gray-500">Full Name</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Email Address</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Phone Number</p>
              <p className="text-lg">{user.phone}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Referral Code</p>
              <p className="text-lg">{user.referralCode || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/edit-profile" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit Profile
            </Link>
            <Link href="/change-password" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Change Password
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userEmail');
                router.push('/login');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
