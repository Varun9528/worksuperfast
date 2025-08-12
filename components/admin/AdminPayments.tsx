'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Payment {
  _id: string
  transactionId: string
  date: string
  paymentMethod: string
  jobTitle: string
  employer: string
  contractor: string
  amount: number
  platformFee?: number
  netAmount?: number
  status: 'pending' | 'completed' | 'failed' | string
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true)
      try {
        const res = await fetch('/api/transactions')
        if (!res.ok) {
          console.error('Response not OK:', res.status)
          return
        }
        const data = await res.json()
        setPayments(data)
      } catch (error) {
        console.error('Failed to fetch payments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  const handleStatusChange = async (_id: string, newStatus: 'pending' | 'completed' | 'failed') => {
    try {
      const res = await fetch(`/api/transactions/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        // Update frontend state accordingly
        setPayments(prev => prev.map(p => (p._id === _id ? { ...p, status: newStatus } : p)))
        alert('Status updated successfully')

        // Agar status completed hua to notification bhejo (jo tumne already setup kiya hai)
        if (newStatus === 'completed') {
          const payment = payments.find(p => p._id === _id)
          if (payment) {
            await fetch('/api/notifications', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: payment.contractor,
                message: `Your payment for job "${payment.jobTitle}" has been approved.`,
                type: 'payment',
                isRead: false,
                createdAt: new Date().toISOString(),
              }),
            })
          }
        }
      } else {
        const errorData = await res.json()
        alert('Status update failed: ' + errorData.message)
      }
    } catch (error) {
      alert('Error updating status ❌')
      console.error(error)
    }
  }


  const filteredPayments = payments.filter(
    p => filter === 'all' || p.status === filter
  )

  const totalRevenue = payments.reduce((sum, p) => sum + (p.platformFee || 0), 0)
  const pendingPayments = payments.filter(p => p.status === 'pending').length
  const completedPayments = payments.filter(p => p.status === 'completed').length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Payments</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon="ri-money-dollar-circle-line"
          color="green"
        />
        <SummaryCard
          title="Pending Payments"
          value={pendingPayments}
          icon="ri-time-line"
          color="yellow"
        />
        <SummaryCard
          title="Completed Payments"
          value={completedPayments}
          icon="ri-check-line"
          color="blue"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <TH>Transaction</TH>
                <TH>Job Details</TH>
                <TH>Parties</TH>
                <TH>Amount</TH>
                <TH>Status</TH>
                <TH>Actions</TH>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <tr>
                  <TD colSpan={6} className="text-center text-gray-500 py-6">
                    Loading payments...
                  </TD>
                </tr>
              )}

              {!loading && filteredPayments.length === 0 && (
                <tr>
                  <TD colSpan={6} className="text-center text-gray-500 py-6">
                    No payments found.
                  </TD>
                </tr>
              )}

              {filteredPayments.map(p => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <TD>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{p.transactionId || p._id}</div>
                      <div className="text-sm text-gray-500">{new Date(p.date || p.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">{p.paymentMethod || '-'}</div>
                    </div>
                  </TD>
                  <TD>
                    <div className="text-sm font-medium text-gray-900">{p.jobTitle || '-'}</div>
                  </TD>
                  <TD>
                    <div className="text-sm text-gray-900">
                      <div>From: {p.employer || '-'}</div>
                      <div>To: {p.contractor || '-'}</div>
                    </div>
                  </TD>
                  <TD>
                    <div className="text-sm text-gray-900">
                      <div>Total: ₹{p.amount?.toLocaleString?.() || '-'}</div>
                      <div className="text-xs text-gray-500">Fee: ₹{p.platformFee?.toLocaleString?.() || '0'}</div>
                      <div className="text-xs text-gray-500">Net: ₹{p.netAmount?.toLocaleString?.() || '0'}</div>
                    </div>
                  </TD>
                  <TD>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${p.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : p.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {p.status}
                    </span>
                  </TD>
                  <TD>
                    <div className="flex space-x-2">
                      {p.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(p._id, 'completed')}
                            className="text-green-600 hover:text-green-900"
                            title="Approve Payment"
                          >
                            <i className="ri-check-line text-2xl"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(p._id, 'failed')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject Payment"
                          >
                            <i className="ri-close-line text-2xl"></i>
                          </button>
                        </>
                      )}

                      {p.status === 'failed' && (
                        <button
                          onClick={() => handleStatusChange(p._id, 'pending')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Retry Payment"
                        >
                          <i className="ri-restart-line text-2xl"></i>
                        </button>
                      )}

                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                        onClick={() => alert(`Transaction Details:\n${JSON.stringify(p, null, 2)}`)}
                      >
                        <i className="ri-eye-line text-2xl"></i>
                      </button>
                    </div>
                  </TD>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-xl text-${color}-600`}></i>
        </div>
      </div>
    </div>
  )
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
)

const TD = ({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) => (
  <td className="px-6 py-4 whitespace-nowrap" colSpan={colSpan}>{children}</td>
)
