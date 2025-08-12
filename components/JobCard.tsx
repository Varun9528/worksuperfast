'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    category: string;
    payment: string;
    originalPayment: string;
    location?: {
      lat?: number;
      lng?: number;
      address?: string;
    };
    city?: string;
    state?: string;
    pincode?: string;
    description: string;
    postedBy: string;
    phone: string;
    status: string;
  };
  onViewLocation: (job: any) => void;
}

export default function JobCard({ job, onViewLocation }: JobCardProps) {
  const [actionStatus, setActionStatus] = useState('available');

const handleTakeMoney = async () => {
  if (actionStatus === 'available') {
    setActionStatus('processing');

    const contractorNameOrId = 'Jane Smith';

    const paymentNumber = Number(job.payment?.replace(/[^0-9]/g, '') || '0');

    if (!job._id) {
      alert('Invalid Job ID');
      setActionStatus('available');
      return;
    }

    if (paymentNumber <= 0) {
      alert('Invalid payment amount');
      setActionStatus('available');
      return;
    }

    const requestBody = {
      jobId: job._id,
      amount: paymentNumber,
      contractor: contractorNameOrId,
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment request failed');
      }

      setActionStatus('completed');
      alert('Payment request sent to admin for approval.');
    } catch (error) {
      console.error(error);
      alert(error.message);
      setActionStatus('available');
    }
  }
};




  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {job.category}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{job.payment}</div>
          <div className="text-sm text-gray-500 line-through">{job.originalPayment}</div>
          <div className="text-xs text-gray-600">After 3% cut</div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

      {job.location?.address && (
        <div className="flex items-center space-x-2 mb-2">
          <i className="ri-map-pin-line text-gray-400"></i>
          <span className="text-sm text-gray-600">{job.location.address}</span>
        </div>
      )}

      {(job.city || job.state || job.pincode) && (
        <div className="flex items-center space-x-2 mb-4">
          <i className="ri-building-line text-gray-400"></i>
          <span className="text-sm text-gray-600">
            {[job.city, job.state].filter(Boolean).join(', ')}{job.pincode ? ` - ${job.pincode}` : ''}
          </span>
        </div>
      )}

      <div className="flex items-center space-x-2 mb-6">
        <i className="ri-user-line text-gray-400"></i>
        <span className="text-sm text-gray-600">Posted by {job.postedBy}</span>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onViewLocation(job)}
          className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center justify-center whitespace-nowrap"
        >
          <i className="ri-map-pin-line mr-2"></i>
          View Location
        </button>

        <button
          onClick={handleTakeMoney}
          disabled={actionStatus === 'processing'}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center whitespace-nowrap ${
            actionStatus === 'available'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : actionStatus === 'processing'
              ? 'bg-yellow-600 text-white cursor-not-allowed'
              : 'bg-green-600 text-white cursor-not-allowed'
          }`}
        >
          {actionStatus === 'available' && (
            <>
              <i className="ri-money-dollar-circle-line mr-2"></i>
              Take Money
            </>
          )}
          {actionStatus === 'processing' && (
            <>
              <i className="ri-loader-line animate-spin mr-2"></i>
              Processing...
            </>
          )}
          {actionStatus === 'completed' && (
            <>
              <i className="ri-check-line mr-2"></i>
              Completed
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
