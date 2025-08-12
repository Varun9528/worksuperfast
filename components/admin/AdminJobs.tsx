'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/admin/jobs');
      const text = await res.text();

      if (!res.ok) {
        throw new Error(`Fetch failed (${res.status}): ${text}`);
      }

      const data = JSON.parse(text);
      if (!data.jobs || !Array.isArray(data.jobs)) {
        throw new Error('Invalid jobs data format');
      }

      // Filter out jobs with no title or category if needed
      const validJobs = data.jobs.filter(
        (job) => job.title || job.category
      );

      setJobs(validJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      if (newStatus === 'approved') {
        await fetch(`/api/jobs/${jobId}/approve`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminId: '64d84a36abc1234567890aaa',
          }),
        });
      } else {
        await fetch(`/api/jobs/${jobId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: newStatus,
            adminId: '64d84a36abc1234567890aaa',
          }),
        });
      }

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const filteredJobs = jobs.filter(
    (job) => filter === 'all' || job.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
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

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {job.title || '—'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.category || '—'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(job.location?.city || '—') + ', ' + (job.location?.state || '—')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{job.payment?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {job.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(job._id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(job._id, 'rejected')}
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
