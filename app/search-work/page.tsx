"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import MapModal from "@/components/MapModal";

export default function SearchWork() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    pincode: "",
    state: ""
  });
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const categories = [
    "Information Technology", "Construction", "Electrical", "Plumbing",
    "Carpentry", "Painting", "Cleaning", "Gardening"
  ];

  const states = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleViewLocation = (job: any) => {
    setSelectedJob(job);
    setShowMapModal(true);
  };

  const filteredJobs = jobs.filter((job) => {
    const keyword = filters.keyword.toLowerCase();
    const titleMatch = job.title?.toLowerCase().includes(keyword);
    const descriptionMatch = job.description?.toLowerCase().includes(keyword);
    const keywordMatch = filters.keyword === '' || titleMatch || descriptionMatch;

    const categoryMatch = filters.category === '' || job.category === filters.category;
    const pincodeMatch = filters.pincode === '' || job.pincode?.includes(filters.pincode);
    const stateMatch =
      filters.state === '' ||
      (typeof job.state === 'string' && job.state.includes(filters.state)) ||
      (typeof job.location === 'object' && typeof job.location.address === 'string' && job.location.address.includes(filters.state));

    return keywordMatch && categoryMatch && pincodeMatch && stateMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "highToLow") return b.payment - a.payment;
    if (sortBy === "lowToHigh") return a.payment - b.payment;
    return 0;
  });

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
            <input
              type="text"
              placeholder="Search by keyword..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />

            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter pincode..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
              value={filters.pincode}
              onChange={(e) => handleFilterChange("pincode", e.target.value)}
            />

            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{sortedJobs.length} Jobs Found</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="highToLow">Payment High to Low</option>
                <option value="lowToHigh">Payment Low to High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
              <JobCard key={job._id} job={job} onViewLocation={handleViewLocation} />
            ))}
          </div>

          {sortedJobs.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      {showMapModal &&
        selectedJob?.location?.lat &&
        selectedJob?.location?.lng && (
          <MapModal job={selectedJob} onClose={() => setShowMapModal(false)} />
        )}

      <Footer />
    </div>
  );
}
