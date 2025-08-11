'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import MapModal from '@/components/MapModal';

export default function SearchWork() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    pincode: '',
    state: ''
  });
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = [
    'Information Technology',
    'Construction',
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Painting',
    'Cleaning',
    'Gardening'
  ];

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const mockJobs = [
    {
      id: 1,
      title: 'Website Development for E-commerce',
      category: 'Information Technology',
      payment: '₹48,500',
      originalPayment: '₹50,000',
      location: 'Mumbai, Maharashtra',
      pincode: '400001',
      description: 'Need a skilled developer to create a modern e-commerce website with payment integration.',
      postedBy: 'Rajesh Sharma',
      phone: '+91 9876543210',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      status: 'available'
    },
    {
      id: 2,
      title: 'House Construction Project',
      category: 'Construction',
      payment: '₹485,000',
      originalPayment: '₹500,000',
      location: 'Bangalore, Karnataka',
      pincode: '560001',
      description: 'Complete house construction project requiring experienced contractors.',
      postedBy: 'Priya Patel',
      phone: '+91 9876543211',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      status: 'available'
    },
    {
      id: 3,
      title: 'Electrical Wiring Installation',
      category: 'Electrical',
      payment: '₹14,550',
      originalPayment: '₹15,000',
      location: 'Delhi, Delhi',
      pincode: '110001',
      description: 'Complete electrical wiring for a 3BHK apartment with modern fittings.',
      postedBy: 'Amit Kumar',
      phone: '+91 9876543212',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      status: 'available'
    },
    {
      id: 4,
      title: 'Plumbing Repair and Maintenance',
      category: 'Plumbing',
      payment: '₹4,850',
      originalPayment: '₹5,000',
      location: 'Chennai, Tamil Nadu',
      pincode: '600001',
      description: 'Bathroom plumbing repair and kitchen pipe maintenance work.',
      postedBy: 'Deepika Reddy',
      phone: '+91 9876543213',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      status: 'available'
    },
    {
      id: 5,
      title: 'Custom Furniture Making',
      category: 'Carpentry',
      payment: '₹24,250',
      originalPayment: '₹25,000',
      location: 'Pune, Maharashtra',
      pincode: '411001',
      description: 'Custom wooden furniture for bedroom and living room.',
      postedBy: 'Suresh Gupta',
      phone: '+91 9876543214',
      coordinates: { lat: 18.5204, lng: 73.8567 },
      status: 'available'
    },
    {
      id: 6,
      title: 'Home Interior Painting',
      category: 'Painting',
      payment: '₹19,400',
      originalPayment: '₹20,000',
      location: 'Hyderabad, Telangana',
      pincode: '500001',
      description: 'Complete interior painting for 2BHK apartment with premium colors.',
      postedBy: 'Lakshmi Rao',
      phone: '+91 9876543215',
      coordinates: { lat: 17.3850, lng: 78.4867 },
      status: 'available'
    }
  ];

  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.keyword === '' || job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
       job.description.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (filters.category === '' || job.category === filters.category) &&
      (filters.pincode === '' || job.pincode.includes(filters.pincode)) &&
      (filters.state === '' || job.location.includes(filters.state))
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleViewLocation = (job) => {
    setSelectedJob(job);
    setShowMapModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Search Work Opportunities
            </h1>
            <p className="text-xl text-gray-600">
              Find verified work opportunities across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search by keyword..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Enter pincode..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filters.pincode}
                onChange={(e) => handleFilterChange('pincode', e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Jobs Found
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8">
                <option>Latest</option>
                <option>Payment High to Low</option>
                <option>Payment Low to High</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onViewLocation={handleViewLocation}
              />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      {showMapModal && (
        <MapModal
          job={selectedJob}
          onClose={() => setShowMapModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}