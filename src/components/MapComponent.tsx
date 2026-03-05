import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';

// Fix for Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for Corporate Branding
const corporateIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Coordinates for Zeno Business Center, Bursa
// Odunluk Mah. Akademi Cad. Zeno Business Center No: 2C / 15 Nilüfer / BURSA
const position: [number, number] = [40.1977059, 28.9790643];

const MapComponent = () => {
  const { isDark } = useTheme();
  const [map, setMap] = useState<L.Map | null>(null);
  const markerRef = React.useRef<L.Marker>(null);

  useEffect(() => {
    // Small delay to ensure map is fully rendered before opening popup
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [map]);

  return (
    <MapContainer 
      center={position} 
      zoom={18} 
      scrollWheelZoom={false} 
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={isDark 
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        }
      />
      <Marker position={position} icon={corporateIcon} ref={markerRef}>
        <Popup closeButton={false} autoClose={false} closeOnClick={false}>
          <div className="text-center min-w-[200px]">
            <h3 className="font-bold text-mosk-dark text-base mb-1" style={{ color: '#ea580c' }}>MOSK Bilişim Teknolojileri Ltd. Şti.</h3>
            <p className="text-sm text-gray-700 font-medium">Teknoloji Üssümüz</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
