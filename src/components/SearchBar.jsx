import { useState } from 'react';

/**
 * SearchBar Component
 * Allows users to search earthquakes by location name or filter by coordinates
 * 
 * @param {Function} onSearch - Callback when search is performed
 * @param {Function} onClear - Callback to clear search
 */
export default function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    } else {
      onClear();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
      <label htmlFor="search-input" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        Search by Location
      </label>
      <div className="flex gap-1 sm:gap-2">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., California, Japan"
          className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search earthquakes by location"
        />
        <button
          onClick={handleSearch}
          className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
          aria-label="Search for earthquakes"
        >
          Search
        </button>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              onClear();
            }}
            className="px-3 sm:px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors whitespace-nowrap"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

