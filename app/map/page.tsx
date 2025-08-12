"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch("/api/map")
      .then(res => res.json())
      .then(data => setMarkers(data.data));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer center={[22.7196, 75.8577]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          attribution="Map data © OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
