'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: 'Website Development',
        category: 'Technology',
        employer: 'Tech Corp',
        location: 'Mumbai, Maharashtra',
        budget: 50000,
        status: 'pending',
        postedDate: '2024-01-15',
        applicants: 12
      },
      {
        id: 2,
        title: 'House Construction',
        category: 'Construction',
        employer: 'Builder Solutions',
        location: 'Delhi, Delhi',
        budget: 500000,
        status: 'approved',
        postedDate: '2024-01-14',
        applicants: 8
      },
      {
        id: 3,
        title: 'Graphic Design',
        category: 'Design',
        employer: 'Creative Studio',
        location: 'Bangalore, Karnataka',
        budget: 25000,
        status: 'rejected',
        postedDate: '2024-01-13',
        applicants: 5
      }
    ]);
  }, []);

  const filteredJobs = jobs.filter(job => filter === 'all' || job.status === filter);

  const handleStatusChange = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Jobs</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
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
              {filteredJobs.map((job) => (
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.category}</div>
                      <div className="text-xs text-gray-400">{job.applicants} applicants</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.employer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{job.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.status === 'approved' ? 'bg-green-100 text-green-800' :
                      job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {job.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(job.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(job.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </>
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