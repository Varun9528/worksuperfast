'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPayments([
      {
        id: 1,
        transactionId: 'TXN001',
        jobTitle: 'Website Development',
        employer: 'Tech Corp',
        contractor: 'Rajesh Kumar',
        amount: 50000,
        platformFee: 1500,
        netAmount: 48500,
        status: 'completed',
        date: '2024-01-15',
        paymentMethod: 'UPI'
      },
      {
        id: 2,
        transactionId: 'TXN002',
        jobTitle: 'House Construction',
        employer: 'Builder Solutions',
        contractor: 'Priya Singh',
        amount: 500000,
        platformFee: 15000,
        netAmount: 485000,
        status: 'pending',
        date: '2024-01-14',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 3,
        transactionId: 'TXN003',
        jobTitle: 'Graphic Design',
        employer: 'Creative Studio',
        contractor: 'Amit Sharma',
        amount: 25000,
        platformFee: 750,
        netAmount: 24250,
        status: 'failed',
        date: '2024-01-13',
        paymentMethod: 'Credit Card'
      }
    ]);
  }, []);

  const filteredPayments = payments.filter(payment => 
    filter === 'all' || payment.status === filter
  );

  const handleStatusChange = (paymentId, newStatus) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
  };

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.platformFee, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const completedPayments = payments.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-xl text-yellow-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Payments</p>
              <p className="text-2xl font-bold text-blue-600">{completedPayments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {filteredPayments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                      <div className="text-sm text-gray-500">{payment.date}</div>
                      <div className="text-xs text-gray-400">{payment.paymentMethod}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>From: {payment.employer}</div>
                      <div>To: {payment.contractor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Total: ₹{payment.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Fee: ₹{payment.platformFee.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Net: ₹{payment.netAmount.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {payment.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(payment.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      )}
                      {payment.status === 'failed' && (
                        <button
                          onClick={() => handleStatusChange(payment.id, 'pending')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <i className="ri-restart-line"></i>
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900">
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