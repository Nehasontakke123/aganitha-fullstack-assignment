import { getTimeAgo, getMagnitudeColor } from '../services/usgs';

/**
 * EarthquakeList Component
 * Displays a scrollable list of earthquakes with sorting options
 * 
 * @param {Array} earthquakes - Array of earthquake data
 * @param {Function} onSelect - Callback when an earthquake is selected
 * @param {string} sortBy - Sort criteria ('time' or 'magnitude')
 * @param {string} selectedId - ID of currently selected earthquake
 */
export default function EarthquakeList({ earthquakes, onSelect, sortBy, selectedId }) {
  // Sort earthquakes based on sortBy prop
  const sortedEarthquakes = [...earthquakes].sort((a, b) => {
    if (sortBy === 'magnitude') {
      return b.magnitude - a.magnitude; // Descending
    }
    return b.time - a.time; // Descending (most recent first)
  });

  if (sortedEarthquakes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-lg">No earthquakes found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto h-full">
      {sortedEarthquakes.map(earthquake => {
        const magnitude = earthquake.magnitude || 0;
        const color = getMagnitudeColor(magnitude);
        const isSelected = earthquake.id === selectedId;

        return (
          <button
            key={earthquake.id}
            onClick={() => onSelect(earthquake)}
            className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
              isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
            }`}
            aria-label={`View earthquake in ${earthquake.place} with magnitude ${magnitude.toFixed(1)}`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Magnitude indicator */}
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              
              {/* Earthquake details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    M {magnitude.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {getTimeAgo(earthquake.time)}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-1">
                  {earthquake.place}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500">
                  <span>Depth: {earthquake.depth?.toFixed(1)} km</span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {earthquake.latitude.toFixed(2)}, {earthquake.longitude.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

