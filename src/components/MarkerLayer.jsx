import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  getMagnitudeColor, 
  getMagnitudeSize, 
  formatDate 
} from '../services/usgs';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/**
 * Individual Earthquake Marker Component
 */
function EarthquakeMarker({ earthquake, selectedId }) {
  const magnitude = earthquake.magnitude || 0;
  const size = getMagnitudeSize(magnitude);
  const color = getMagnitudeColor(magnitude);

  // Create a custom circle marker icon
  const icon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        opacity: ${earthquake.id === selectedId ? '1' : '0.8'};
        transition: opacity 0.2s;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  return (
    <Marker 
      position={[earthquake.latitude, earthquake.longitude]}
      icon={icon}
    >
      <Popup>
        <div className="min-w-[250px]">
          <h3 className="font-bold text-lg mb-2">
            Magnitude {magnitude.toFixed(1)}
          </h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Location:</span>{' '}
              {earthquake.place}
            </p>
            <p>
              <span className="font-semibold">Depth:</span>{' '}
              {earthquake.depth?.toFixed(2)} km
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              {formatDate(earthquake.time)}
            </p>
            <p>
              <span className="font-semibold">Coordinates:</span>{' '}
              {earthquake.latitude.toFixed(4)}, {earthquake.longitude.toFixed(4)}
            </p>
          </div>
          <a
            href={earthquake.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-blue-600 hover:underline text-sm font-medium"
          >
            View on USGS →
          </a>
        </div>
      </Popup>
    </Marker>
  );
}

/**
 * MarkerLayer Component
 * Renders all earthquake markers on the map with clustering support
 * 
 * @param {Array} earthquakes - Array of earthquake data
 * @param {string} selectedId - ID of currently selected earthquake
 */
export default function MarkerLayer({ earthquakes = [], selectedId }) {
  const map = useMap();

  useEffect(() => {
    // Fit map bounds to show all markers when earthquakes change
    if (earthquakes.length > 0) {
      const bounds = L.latLngBounds(
        earthquakes.map(eq => [eq.latitude, eq.longitude])
      );
      
      // Only auto-fit if no specific earthquake is selected
      if (!selectedId) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [earthquakes, map, selectedId]);

  if (earthquakes.length === 0) {
    return null;
  }

  return (
    <MarkerClusterInline 
      earthquakes={earthquakes}
      selectedId={selectedId}
    />
  );
}

/**
 * Simple marker rendering without clustering
 * For better performance with many markers, consider implementing clustering
 */
function MarkerClusterInline({ earthquakes, selectedId }) {
  return (
    <>
      {earthquakes.map(earthquake => (
        <EarthquakeMarker 
          key={earthquake.id} 
          earthquake={earthquake}
          selectedId={selectedId}
        />
      ))}
    </>
  );
}

