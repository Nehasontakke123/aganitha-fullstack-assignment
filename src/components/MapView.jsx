import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Component to handle map viewport changes
 * This is used to programmatically change the map center and zoom
 */
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

/**
 * MapView Component
 * Displays the Leaflet map with earthquake markers
 * 
 * @param {Array} earthquakes - Array of earthquake data
 * @param {Function} onMapReady - Callback when map is ready
 * @param {Object} selectedEarthquake - Currently selected earthquake
 * @param {number} defaultCenter - Default map center coordinates [lat, lng]
 * @param {number} defaultZoom - Default zoom level
 */
export default function MapView({ 
  earthquakes = [], 
  onMapReady, 
  selectedEarthquake,
  defaultCenter = [20, 0],
  defaultZoom = 2
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady(mapRef.current);
    }
  }, [onMapReady]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Display selected earthquake marker */}
        {selectedEarthquake && (
          <ChangeMapView 
            center={[selectedEarthquake.latitude, selectedEarthquake.longitude]} 
            zoom={6}
          />
        )}
        
        {/* MarkerLayer component will be rendered as children */}
        {earthquakes}
      </MapContainer>
      
      {/* Map attribution */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 pointer-events-none z-10">
        <p>
          Data from{' '}
          <a 
            href="https://earthquake.usgs.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline pointer-events-auto"
            aria-label="USGS Earthquake Program"
          >
            USGS Earthquake Program
          </a>
        </p>
      </div>
    </div>
  );
}

