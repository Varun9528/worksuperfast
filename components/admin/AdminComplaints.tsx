'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setComplaints([
      {
        id: 1,
        title: 'Payment Issue',
        description: 'Payment not received for completed work',
        complainant: 'Rajesh Kumar',
        against: 'Tech Corp',
        type: 'payment',
        status: 'pending',
        priority: 'high',
        date: '2024-01-15',
        response: ''
      },
      {
        id: 2,
        title: 'Quality Issue',
        description: 'Work quality not as expected',
        complainant: 'Priya Singh',
        against: 'Builder Solutions',
        type: 'quality',
        status: 'resolved',
        priority: 'medium',
        date: '2024-01-14',
        response: 'Issue resolved after discussion'
      },
      {
        id: 3,
        title: 'Communication Problem',
        description: 'Contractor not responding to messages',
        complainant: 'Tech Corp',
        against: 'Amit Sharma',
        type: 'communication',
        status: 'in_progress',
        priority: 'low',
        date: '2024-01-13',
        response: 'Investigating the issue'
      }
    ]);
  }, []);

  const filteredComplaints = complaints.filter(complaint => 
    filter === 'all' || complaint.status === filter
  );

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Complaints Management</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Complaints</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredComplaints.map((complaint) => (
          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                    complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.priority} priority
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{complaint.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Complainant:</span>
                    <p className="text-gray-600">{complaint.complainant}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Against:</span>
                    <p className="text-gray-600">{complaint.against}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <p className="text-gray-600">{complaint.date}</p>
                  </div>
                </div>
                
                {complaint.response && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Response:</span>
                    <p className="text-gray-600 mt-1">{complaint.response}</p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                {complaint.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'in_progress')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Start Review
                  </button>
                )}
                {complaint.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'resolved')}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Mark Resolved
                  </button>
                )}
                <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}