'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface MapModalProps {
  job: {
    title: string;
    location: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postedBy: string;
    phone: string;
  };
  onClose: () => void;
}

export default function MapModal({ job, onClose }: MapModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line"></i>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-user-line"></i>
                  <span>{job.postedBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line"></i>
                  <span>{job.phone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <i className="ri-close-line text-gray-600"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${job.coordinates.lat},${job.coordinates.lng}&zoom=15`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Job Location"
            ></iframe>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => window.open(`https://maps.google.com/?q=${job.coordinates.lat},${job.coordinates.lng}`, '_blank')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <i className="ri-external-link-line"></i>
              <span>Open in Google Maps</span>
            </button>
            
            <button
              onClick={() => window.open(`tel:${job.phone}`, '_self')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <i className="ri-phone-line"></i>
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}