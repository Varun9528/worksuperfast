'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Props {
  defaultLocation?: Location | null;
  onLocationSelect: (location: Location) => void;
}

export default function MapSelector({ defaultLocation, onLocationSelect }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [isInitial, setIsInitial] = useState(true); // ✅ prevent re-trigger

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('leaflet-map').setView(
        defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : [20.5937, 78.9629],
        defaultLocation ? 15 : 5
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      mapRef.current.on('click', async (e: L.LeafletMouseEvent) => {
        await setMarker(e.latlng.lat, e.latlng.lng);
      });
    }

    // ✅ Only set marker once on initial mount if defaultLocation is provided
    if (isInitial && defaultLocation) {
      setIsInitial(false);
      setMarker(defaultLocation.lat, defaultLocation.lng);
    }

    async function setMarker(lat: number, lng: number) {
      const address = await getAddress(lat, lng);
      const location = { lat, lng, address };

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current!);
        markerRef.current.on('dragend', async () => {
          const pos = markerRef.current!.getLatLng();
          const updatedAddress = await getAddress(pos.lat, pos.lng);
          onLocationSelect({ lat: pos.lat, lng: pos.lng, address: updatedAddress });
        });
      }

      mapRef.current!.setView([lat, lng], 15);
      onLocationSelect(location);
    }

    async function getAddress(lat: number, lng: number): Promise<string> {
      try {
        const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lng}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.display_name || 'Unknown address';
      } catch (err) {
        console.error('Address fetch failed:', err);
        return 'Address not found';
      }
    }
  }, [defaultLocation, onLocationSelect, isInitial]);

  return <div id="leaflet-map" className="w-full h-72 rounded border" />;
}
