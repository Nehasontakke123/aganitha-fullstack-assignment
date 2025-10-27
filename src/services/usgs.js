/**
 * USGS Earthquake API Service
 * Fetches earthquake data from the USGS all_day GeoJSON endpoint
 */

const API_ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

/**
 * Fetch earthquake data from USGS API
 * @returns {Promise<Object>} GeoJSON data
 */
export async function fetchEarthquakeData() {
  try {
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
}

/**
 * Parse earthquake data from GeoJSON to a more usable format
 * @param {Object} geoJsonData - GeoJSON data from USGS
 * @returns {Array} Array of earthquake objects
 */
export function parseEarthquakeData(geoJsonData) {
  if (!geoJsonData || !geoJsonData.features) {
    return [];
  }

  return geoJsonData.features.map(feature => {
    const { properties, geometry } = feature;
    const [longitude, latitude, depth] = geometry.coordinates;

    return {
      id: feature.id,
      magnitude: properties.mag,
      place: properties.place,
      time: properties.time,
      depth: depth,
      longitude,
      latitude,
      url: properties.url,
      // Additional properties
      updated: properties.updated,
      detail: properties.detail,
      status: properties.status,
      tsunami: properties.tsunami,
      sig: properties.sig,
      code: properties.code,
      type: properties.type,
    };
  });
}

/**
 * Format timestamp to human-readable date
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Get time difference in a human-readable format
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Time ago string (e.g., "2 hours ago")
 */
export function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

/**
 * Determine marker color based on magnitude
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} Color hex code
 */
export function getMagnitudeColor(magnitude) {
  if (magnitude < 2) return '#00ff00'; // Green
  if (magnitude < 4) return '#ffff00'; // Yellow
  if (magnitude < 6) return '#ff9900'; // Orange
  return '#ff0000'; // Red
}

/**
 * Determine marker size based on magnitude
 * @param {number} magnitude - Earthquake magnitude
 * @returns {number} Size in pixels
 */
export function getMagnitudeSize(magnitude) {
  // Scale from 10px to 40px based on magnitude (0 to 10)
  return Math.max(10, Math.min(40, 10 + (magnitude * 3)));
}

