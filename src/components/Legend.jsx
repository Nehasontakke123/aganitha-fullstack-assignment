import { getMagnitudeColor } from '../services/usgs';

/**
 * Legend Component
 * Displays the color-coded legend for earthquake magnitudes
 */
export default function Legend() {
  const magnitudeRanges = [
    { label: '< 2.0', min: 1, max: 2, color: getMagnitudeColor(1) },
    { label: '2.0 - 4.0', min: 2, max: 4, color: getMagnitudeColor(3) },
    { label: '4.0 - 6.0', min: 4, max: 6, color: getMagnitudeColor(5) },
    { label: '≥ 6.0', min: 6, max: 10, color: getMagnitudeColor(7) },
  ];

  return (
    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-[1000] max-w-[160px] sm:max-w-[200px]">
      <h3 className="font-bold text-xs sm:text-sm mb-2 sm:mb-3 text-gray-800">Magnitude Scale</h3>
      <div className="space-y-2">
        {magnitudeRanges.map(range => (
          <div key={range.label} className="flex items-center gap-1.5 sm:gap-2">
            <div 
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: range.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-700">{range.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Marker size also indicates magnitude
        </p>
      </div>
    </div>
  );
}

