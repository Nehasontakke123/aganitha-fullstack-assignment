import { useState, useEffect, useCallback, useMemo } from 'react';
import MapView from './components/MapView';
import MarkerLayer from './components/MarkerLayer';
import EarthquakeList from './components/EarthquakeList';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import Legend from './components/Legend';
import { fetchEarthquakeData, parseEarthquakeData } from './services/usgs';

function App() {
  // Core state
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI state
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [sortBy, setSortBy] = useState('time'); // 'time' or 'magnitude'
  // Sidebar open by default on desktop, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch earthquake data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const geoJsonData = await fetchEarthquakeData();
        const parsedData = parseEarthquakeData(geoJsonData);
        setEarthquakes(parsedData);
      } catch (err) {
        setError('Failed to load earthquake data. Please check your internet connection and try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter earthquakes based on magnitude and search term
  const filteredEarthquakes = useMemo(() => {
    return earthquakes.filter(eq => {
      const magnitudeMatch = eq.magnitude >= minMagnitude;
      const searchMatch = !searchTerm || 
        eq.place.toLowerCase().includes(searchTerm.toLowerCase());
      return magnitudeMatch && searchMatch;
    });
  }, [earthquakes, minMagnitude, searchTerm]);

  // Handle earthquake selection
  const handleSelectEarthquake = useCallback((earthquake) => {
    setSelectedEarthquake(earthquake);
  }, []);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    // Find matching earthquake and center on it
    const match = earthquakes.find(eq => 
      eq.place.toLowerCase().includes(term.toLowerCase())
    );
    if (match) {
      setSelectedEarthquake(match);
    }
  }, [earthquakes]);

  // Handle search clear
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSelectedEarthquake(null);
  }, []);

  // Export filtered data to CSV
  const handleExportCSV = useCallback(() => {
    if (filteredEarthquakes.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Magnitude', 'Place', 'Time', 'Depth (km)', 'Latitude', 'Longitude', 'USGS Link'];
    const rows = filteredEarthquakes.map(eq => [
      eq.magnitude,
      `"${eq.place}"`, // Quote to handle commas in place names
      new Date(eq.time).toISOString(),
      eq.depth,
      eq.latitude,
      eq.longitude,
      eq.url
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earthquakes_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filteredEarthquakes]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header - Responsive */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Title and Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Earthquake Visualizer</h1>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
            {/* Sort toggle */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="hidden sm:inline text-sm text-gray-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort earthquakes"
              >
                <option value="time">Time</option>
                <option value="magnitude">Magnitude</option>
              </select>
            </div>

            {/* Export button */}
            <button
              onClick={handleExportCSV}
              disabled={filteredEarthquakes.length === 0}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors whitespace-nowrap"
              aria-label="Export to CSV"
            >
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Responsive with overlay on mobile */}
        {isSidebarOpen && (
          <>
            {/* Mobile overlay backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
            
            {/* Sidebar */}
            <aside className="fixed lg:static inset-y-0 left-0 top-16 lg:top-0 w-80 sm:w-96 max-w-[85vw] bg-white shadow-lg lg:shadow-none flex flex-col z-40 lg:z-20 overflow-hidden">
            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />

            {/* Filters */}
            <Filters 
              minMagnitude={minMagnitude}
              onMagnitudeChange={setMinMagnitude}
              earthquakes={filteredEarthquakes}
            />

            {/* Earthquake List */}
            <div className="flex-1 overflow-hidden px-3 sm:px-4 py-2">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading earthquakes...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-red-600">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-semibold">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <EarthquakeList
                  earthquakes={filteredEarthquakes}
                  onSelect={handleSelectEarthquake}
                  sortBy={sortBy}
                  selectedId={selectedEarthquake?.id}
                />
              )}
            </div>
            </aside>
          </>
        )}

        {/* Map - Hidden when sidebar is open on mobile */}
        <div className={`flex-1 relative ${isSidebarOpen ? 'hidden lg:block' : 'block'}`}>
          <MapView
            earthquakes={<MarkerLayer earthquakes={filteredEarthquakes} selectedId={selectedEarthquake?.id} />}
            selectedEarthquake={selectedEarthquake}
            defaultCenter={[20, 0]}
            defaultZoom={2}
          />
          <Legend />
        </div>
      </div>
    </div>
  );
}

export default App;

