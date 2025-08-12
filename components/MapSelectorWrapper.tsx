'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Props {
  onLocationSelect: (location: Location) => void;
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to re-center map whenever location changes
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

export default function MapSelectorWithMap({ onLocationSelect }: Props) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Load Google Maps Places API
  useEffect(() => {
    if (!apiKey) {
      console.error('Google Maps API key is missing.');
      return;
    }
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initAutocomplete();
      document.body.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, [apiKey]);

  // Initialize Autocomplete
  const initAutocomplete = () => {
    if (window.google?.maps?.places && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ['geometry', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', async () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || (await reverseGeocode(lat, lng));
          const loc = { lat, lng, address };
          setCurrentLocation(loc);
          onLocationSelect(loc);
          setInputValue(address);
          console.log('Place selected:', loc);
        }
      });
    }
  };

  // Reverse Geocode API call
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    if (!apiKey) return '';
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return '';
    } catch (e) {
      console.error('Reverse geocoding failed:', e);
      return '';
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        console.log('Browser GPS location:', lat, lng);

        let address = await reverseGeocode(lat, lng);
        if (!address) {
          address = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        }

        const loc = { lat, lng, address };
        setCurrentLocation(loc);
        onLocationSelect(loc);
        setInputValue(address);
      },
      async (error) => {
        console.warn('GPS failed, using Google Geolocation API fallback...', error);

        try {
          const res = await fetch(
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
            { method: 'POST' }
          );
          const data = await res.json();
          console.log('Google fallback location:', data);

          if (data?.location) {
            const lat = data.location.lat;
            const lng = data.location.lng;

            let address = await reverseGeocode(lat, lng);
            if (!address) {
              address = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
            }

            const loc = { lat, lng, address };
            setCurrentLocation(loc);
            onLocationSelect(loc);
            setInputValue(address);
          } else {
            alert('Unable to detect location.');
          }
        } catch (e) {
          console.error('Google fallback error:', e);
          alert('Unable to detect location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search location"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
      />
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Use Current Location
      </button>

      {currentLocation && (
        <div style={{ height: 400, width: '100%' }}>
          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom
          >
            <RecenterMap lat={currentLocation.lat} lng={currentLocation.lng} />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Street View">
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  attribution="Tiles © Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={markerIcon} />
          </MapContainer>
        </div>
      )}
    </div>
  );
}
