'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminContractors() {
  const [contractors, setContractors] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setContractors([
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh@email.com',
        phone: '+91 9876543210',
        skills: ['Construction', 'Plumbing'],
        experience: 5,
        rating: 4.8,
        status: 'approved',
        joinDate: '2024-01-10',
        completedJobs: 23
      },
      {
        id: 2,
        name: 'Priya Singh',
        email: 'priya@email.com',
        phone: '+91 9876543211',
        skills: ['Web Development', 'Design'],
        experience: 3,
        rating: 4.5,
        status: 'pending',
        joinDate: '2024-01-12',
        completedJobs: 15
      },
      {
        id: 3,
        name: 'Amit Sharma',
        email: 'amit@email.com',
        phone: '+91 9876543212',
        skills: ['Electrical', 'Maintenance'],
        experience: 8,
        rating: 4.9,
        status: 'suspended',
        joinDate: '2024-01-08',
        completedJobs: 45
      }
    ]);
  }, []);

  const filteredContractors = contractors.filter(contractor => 
    filter === 'all' || contractor.status === filter
  );

  const handleStatusChange = (contractorId, newStatus) => {
    setContractors(contractors.map(contractor => 
      contractor.id === contractorId ? { ...contractor, status: newStatus } : contractor
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contractors Management</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Contractors</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContractors.map((contractor) => (
                <motion.tr
                  key={contractor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contractor.name}</div>
                        <div className="text-sm text-gray-500">{contractor.completedJobs} jobs completed</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contractor.email}</div>
                    <div className="text-sm text-gray-500">{contractor.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {contractor.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contractor.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{contractor.rating}</span>
                      <i className="ri-star-fill text-yellow-400 ml-1"></i>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      contractor.status === 'approved' ? 'bg-green-100 text-green-800' :
                      contractor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {contractor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {contractor.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(contractor.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      )}
                      {contractor.status === 'approved' && (
                        <button
                          onClick={() => handleStatusChange(contractor.id, 'suspended')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <i className="ri-pause-line"></i>
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}