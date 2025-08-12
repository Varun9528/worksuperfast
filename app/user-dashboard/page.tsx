'use client'
import { useState, useEffect } from 'react';

interface Transaction {
  _id: string;
  jobId: string;
  jobTitle?: string; // agar mile toh dikhao
  amount: number;
  contractor: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDashboardProps {
  userId: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transactions?contractor=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load your transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUserTransactions();
  }, [userId]);

  if (loading) return <div>Loading your transactions...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Transactions</h1>
      {transactions.length === 0 && <p>No transactions found.</p>}

      <ul className="space-y-4">
        {transactions.map((tx) => (
          <li key={tx._id} className="border p-4 rounded shadow-sm">
            <p><strong>Job:</strong> {tx.jobTitle || tx.jobId}</p>
            <p><strong>Amount:</strong> ₹{tx.amount.toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={
                  tx.status === 'completed' ? 'text-green-600' :
                  tx.status === 'pending' ? 'text-yellow-600' :
                  'text-red-600'
                }
              >
                {tx.status}
              </span>
            </p>
            <p><strong>Date:</strong> {new Date(tx.createdAt).toLocaleDateString()}</p>
            <p>{tx.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
