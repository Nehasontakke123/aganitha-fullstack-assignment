/**
 * Filters Component
 * Provides magnitude and time-based filtering controls
 * 
 * @param {number} minMagnitude - Current minimum magnitude filter
 * @param {Function} onMagnitudeChange - Callback when magnitude filter changes
 * @param {Array} earthquakes - Array of all earthquakes for stats
 */
export default function Filters({ minMagnitude, onMagnitudeChange, earthquakes = [] }) {
  const maxMagnitude = Math.max(...earthquakes.map(eq => eq.magnitude || 0), 0);

  return (
    <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
      {/* Magnitude Filter */}
      <div>
        <label 
          htmlFor="magnitude-slider" 
          className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
        >
          Minimum Magnitude: {minMagnitude.toFixed(1)}
        </label>
        <input
          id="magnitude-slider"
          type="range"
          min="0"
          max={Math.max(maxMagnitude, 10)}
          step="0.1"
          value={minMagnitude}
          onChange={(e) => onMagnitudeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          aria-label="Filter earthquakes by minimum magnitude"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0.0</span>
          <span>{Math.max(maxMagnitude, 10).toFixed(1)}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="text-xs sm:text-sm text-gray-600 space-y-1 pt-2 border-t border-gray-300">
        <p>
          <span className="font-semibold">{earthquakes.length}</span> earthquake{earthquakes.length !== 1 ? 's' : ''} shown
        </p>
        {earthquakes.length > 0 && (
          <p className="text-xs">
            Range: {Math.min(...earthquakes.map(eq => eq.magnitude || 0)).toFixed(1)} - {maxMagnitude.toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
}

