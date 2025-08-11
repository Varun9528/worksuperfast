'use client';

import { useState } from 'react';

interface MapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export default function MapSelector({ onLocationSelect }: MapSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleLocationClick = () => {
    setShowMap(true);
    
    const defaultLocation = {
      lat: 28.6139,
      lng: 77.2090,
      address: "New Delhi, India"
    };
    
    setSelectedLocation(defaultLocation);
    onLocationSelect(defaultLocation);
  };

  return (
    <div className="space-y-4">
      <div
        className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
        onClick={handleLocationClick}
      >
        {!showMap ? (
          <div className="text-center">
            <i className="ri-map-pin-add-line text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-600 font-medium">Click to select location on map</p>
            <p className="text-sm text-gray-500">Pin your exact work location</p>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=28.6139,77.2090&zoom=15"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <i className="ri-map-pin-fill text-white text-sm"></i>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {selectedLocation && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <i className="ri-map-pin-line text-blue-600"></i>
            <span className="text-sm text-blue-800 font-medium">
              Location Selected: {selectedLocation.address}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}