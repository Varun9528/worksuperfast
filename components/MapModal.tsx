// File: components/MapModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic imports for react-leaflet components (SSR false)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

interface MapModalProps {
  job: {
    title: string;
    location?: {
      lat?: number;
      lng?: number;
      address?: string;
      phone?: string;
    };
  };
  onClose: () => void;
}

export default function MapModal({ job, onClose }: MapModalProps) {
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import leaflet only on client side
    import('leaflet').then(module => setL(module));
    setMapReady(true);
  }, []);

  if (!job.location?.lat || !job.location?.lng) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm">
          <p className="text-red-500">Location not available</p>
          <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const position: [number, number] = [job.location.lat, job.location.lng];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Map */}
        {mapReady && L && (
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={position}
              icon={L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })}
            >
              <Popup>
                <strong>{job.title}</strong>
                <br />
                {job.location.address || 'Address not available'}
              </Popup>
            </Marker>
          </MapContainer>
        )}

        {/* Details Section */}
        <div className="p-4 space-y-2">
          <p className="text-gray-700">
            📍 <strong>Address:</strong> {job.location.address || 'Not available'}
          </p>
          <p className="text-gray-700">
            📞 <strong>Phone:</strong>{' '}
            {job.location.phone ? (
              <a href={`tel:${job.location.phone}`} className="text-blue-600 hover:underline">
                {job.location.phone}
              </a>
            ) : (
              'Not available'
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3">
            {/* Navigation Button */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${job.location.lat},${job.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              🧭 Navigate
            </a>

            {/* Call Button */}
            {job.location.phone && (
              <a
                href={`tel:${job.location.phone}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                📞 Call
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
