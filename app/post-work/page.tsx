'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
const MapSelector = dynamic(() => import('@/components/MapSelectorWrapper'), {
  ssr: false,
});

export default function PostWork() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    payment: '',
    paymentType: 'fixed',
    state: '',
    city: '',
    pincode: '',
    location: null,
    name: '',
    phone: '',
    email: '',
    photo: null,
    postedBy: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [locationMsg, setLocationMsg] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    if (userId) {
      setFormData(prev => ({ ...prev, postedBy: userId }));
    }
  }, []);

  const categories = [
    'Information Technology', 'Construction', 'Electrical', 'Plumbing',
    'Carpentry', 'Painting', 'Cleaning', 'Gardening'
  ];

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({ ...prev, location }));
    const locText = location.address
      ? `📍 ${location.address}`
      : `📍 Location set: lat ${location.lat.toFixed(4)}, lng ${location.lng.toFixed(4)}`;
    setLocationMsg(locText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setSubmitMessage('❌ User ID not found. Please login again.');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'location' && value) {
        data.append('location', JSON.stringify(value)); // lat, lng, address
      } else if (key === 'photo' && value) {
        data.append('photo', value);
      } else if (typeof value === 'string') {
        data.append(key, value);
      }
    });

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Something went wrong');
      }

      setSubmitMessage('✅ Work posted successfully!');
      setFormData({
        title: '', description: '', category: '', payment: '', paymentType: 'fixed',
        state: '', city: '', pincode: '', location: null, name: '', phone: '',
        email: '', photo: null, postedBy: userId
      });
      setLocationMsg('');
    } catch (error) {
      setSubmitMessage('❌ ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Post Work</h1>
            <p className="text-xl text-gray-600">
              Share your work requirements and connect with skilled professionals
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter work title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Describe your work..."
                    maxLength={500}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <label>
                        <input
                          type="radio"
                          name="paymentType"
                          value="fixed"
                          checked={formData.paymentType === 'fixed'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Fixed
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paymentType"
                          value="visit"
                          checked={formData.paymentType === 'visit'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Visit to Decide
                      </label>
                    </div>
                    {formData.paymentType === 'fixed' && (
                      <input
                        type="number"
                        name="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                        placeholder="Enter amount in ₹"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    required
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Pin *</label>
                  <MapSelector onLocationSelect={handleLocationSelect} />
                  {locationMsg && <p className="text-sm text-green-600 mt-2">{locationMsg}</p>}
                </div>

                {/* Hidden input for postedBy */}
                <input type="hidden" name="postedBy" value={formData.postedBy} />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-medium ${submitMessage.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Post Work'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
