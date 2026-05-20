"use client";

import { useEffect, useState } from "react";
// Dynamically import react-leaflet to prevent Server-Side Rendering (SSR) issues
// since leaflet needs the window object
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

interface Issue {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
  severity: number;
  status: string;
}

export default function IssueMap() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Only import leaflet on the client side
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });

    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/issues");
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch issues", error);
      }
    };
    
    fetchIssues();
  }, []);

  // Show a placeholder until leaflet loads
  if (!L) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
        <div className="animate-pulse flex flex-col items-center">
          <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
          <p className="text-gray-500 font-medium">Loading Map...</p>
        </div>
      </div>
    );
  }

  // Define custom icons using CDN links
  const pendingIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const resolvedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Calculate center based on the first issue if available, else fallback to a default city (e.g. NYC)
  const defaultCenter: [number, number] = [40.7128, -74.0060]; 
  const center: [number, number] = issues.length > 0 
    ? [issues[0].latitude, issues[0].longitude] 
    : defaultCenter;

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md border border-gray-200 z-0 relative">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Using CartoDB Voyager for a cleaner look
        />
        
        {issues.map((issue) => (
          <Marker 
            key={issue.id}
            position={[issue.latitude, issue.longitude]}
            icon={issue.status === 'resolved' ? resolvedIcon : pendingIcon}
          >
            <Popup>
              <div className="p-1 min-w-[150px]">
                <h3 className="font-bold text-gray-800 text-sm mb-1">{issue.category}</h3>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Severity:</span>
                  <span className="font-bold text-gray-700">{issue.severity}/10</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Status:</span>
                  <span className={issue.status === 'resolved' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
