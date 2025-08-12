'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return router.push('/login');

    fetch(`/api/users/profile?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data?.user) {
          setFormData({
            name: data.user.name || '',
            phone: data.user.phone || '',
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.push('/login');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const email = localStorage.getItem('userEmail');

    const res = await fetch('/api/users/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, ...formData }),
    });

    const result = await res.json();

    if (result.success) {
      setMessage('✅ Profile updated successfully!');
      setTimeout(() => {
        // 👇 force reload for profile page data refresh
        window.location.href = '/profile';
      }, 1200);
    } else {
      setMessage('❌ Update failed. Please try again.');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <>
                <i className="ri-loader-line animate-spin mr-2"></i>Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>Save Changes
              </>
            )}
          </button>

          {message && (
            <div className={`text-sm mt-4 text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
