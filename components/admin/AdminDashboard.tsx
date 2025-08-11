
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
  onTabChange?: (tab: string) => void;
}

export default function AdminDashboard({ onTabChange }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalJobs: 0,
    pendingJobs: 0,
    activeContractors: 0,
    pendingContractors: 0,
    totalRevenue: 0,
    pendingComplaints: 0,
    totalUsers: 0,
    completedJobs: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    setStats({
      totalJobs: 1247,
      pendingJobs: 23,
      activeContractors: 456,
      pendingContractors: 12,
      totalRevenue: 125000,
      pendingComplaints: 5,
      totalUsers: 2340,
      completedJobs: 1156
    });

    setRecentActivities([
      { id: 1, type: 'job', message: 'New job posted: Website Development', time: '2 min ago', icon: 'ri-briefcase-line' },
      { id: 2, type: 'contractor', message: 'Contractor approved: Rajesh Kumar', time: '15 min ago', icon: 'ri-user-check-line' },
      { id: 3, type: 'complaint', message: 'New complaint filed', time: '1 hour ago', icon: 'ri-feedback-line' },
      { id: 4, type: 'payment', message: 'Payment processed: ₹15,000', time: '2 hours ago', icon: 'ri-money-dollar-circle-line' },
      { id: 5, type: 'job', message: 'Job completed: House Construction', time: '3 hours ago', icon: 'ri-check-line' }
    ]);
  }, []);

  const handleQuickAction = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const statsCards = [
    { title: 'Total Jobs', value: stats.totalJobs, icon: 'ri-briefcase-line', color: 'blue', change: '+12%' },
    { title: 'Pending Jobs', value: stats.pendingJobs, icon: 'ri-time-line', color: 'yellow', change: '+5%' },
    { title: 'Active Contractors', value: stats.activeContractors, icon: 'ri-group-line', color: 'green', change: '+8%' },
    { title: 'Pending Contractors', value: stats.pendingContractors, icon: 'ri-user-unfollow-line', color: 'orange', change: '-3%' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: 'ri-money-dollar-circle-line', color: 'green', change: '+15%' },
    { title: 'Pending Complaints', value: stats.pendingComplaints, icon: 'ri-feedback-line', color: 'red', change: '-2%' },
    { title: 'Total Users', value: stats.totalUsers, icon: 'ri-user-line', color: 'purple', change: '+20%' },
    { title: 'Completed Jobs', value: stats.completedJobs, icon: 'ri-check-line', color: 'green', change: '+18%' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${card.color}-100 rounded-lg flex items-center justify-center`}>
                <i className={`${card.icon} text-xl text-${card.color}-600`}></i>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {card.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className={`${activity.icon} text-blue-600`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleQuickAction('jobs')}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <i className="ri-add-line text-xl mb-2"></i>
              <div className="text-sm font-medium">Approve Jobs</div>
            </button>
            <button 
              onClick={() => handleQuickAction('contractors')}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              <i className="ri-user-check-line text-xl mb-2"></i>
              <div className="text-sm font-medium">Review Contractors</div>
            </button>
            <button 
              onClick={() => handleQuickAction('complaints')}
              className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer"
            >
              <i className="ri-feedback-line text-xl mb-2"></i>
              <div className="text-sm font-medium">Handle Complaints</div>
            </button>
            <button 
              onClick={() => handleQuickAction('payments')}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <i className="ri-money-dollar-circle-line text-xl mb-2"></i>
              <div className="text-sm font-medium">Process Payments</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
