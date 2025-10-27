# Earthquake Visualizer

A real-time earthquake visualization web application built with React, Vite, Tailwind CSS, and Leaflet. This application fetches live earthquake data from the USGS Earthquake API and displays it on an interactive map with filtering and search capabilities.

**Candidate ID: Naukri1025**

## 🚀 Features

- **Interactive Map**: Visualize earthquakes worldwide using Leaflet with custom markers sized and colored by magnitude
- **Real-time Data**: Fetches and displays earthquakes from the last 24 hours via USGS API
- **Filtering**: Filter earthquakes by minimum magnitude using a slider control
- **Search**: Search earthquakes by location name
- **Sorting**: Sort earthquakes by time or magnitude
- **Marker Clustering**: Groups nearby earthquakes for better visualization
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Keyboard navigation, ARIA labels, and proper color contrast
- **CSV Export**: Download filtered earthquake data as CSV
- **Auto-refresh**: Automatically refreshes data every 5 minutes

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **react-leaflet** - React components for Leaflet maps
- **react-leaflet-markercluster** - Marker clustering functionality
- **USGS Earthquake API** - Real-time earthquake data source

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd earthquake-visualizer
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running Locally

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

The application will be live at `https://your-project.vercel.app`

### Deploying to CodeSandbox

1. Go to [codesandbox.io](https://codesandbox.io)
2. Click "Create" → "Import from GitHub"
3. Enter your repository URL
4. CodeSandbox will automatically detect Vite configuration
5. The application will be live and shareable

### Deploying to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

## 📝 Usage

### Viewing Earthquakes

- Earthquakes are displayed as colored markers on the map
- Marker colors indicate magnitude:
  - **Green**: < 2.0 (minor)
  - **Yellow**: 2.0-4.0 (light)
  - **Orange**: 4.0-6.0 (moderate)
  - **Red**: ≥ 6.0 (strong)

- Marker size also indicates magnitude (larger = stronger)

### Filtering

- Use the magnitude slider in the sidebar to filter earthquakes by minimum magnitude
- The statistics panel shows the count and range of filtered earthquakes

### Searching

- Enter a location name in the search bar (e.g., "California", "Japan")
- Click "Search" to find and center on earthquakes in that area
- Click "Clear" to reset the search

### Sorting

- Use the dropdown in the header to sort by:
  - **Time**: Most recent earthquakes first
  - **Magnitude**: Highest magnitude earthquakes first

### Selecting Earthquakes

- Click any earthquake in the list to center the map on it and view details
- Click any marker on the map to view earthquake details in a popup

### Exporting Data

- Click the "Export CSV" button in the header to download the currently filtered earthquakes as a CSV file

## 🗂️ Project Structure

```
earthquake-visualizer/
├── src/
│   ├── components/          # React components
│   │   ├── MapView.jsx     # Main map container
│   │   ├── MarkerLayer.jsx # Earthquake markers with clustering
│   │   ├── EarthquakeList.jsx # List of earthquakes
│   │   ├── Filters.jsx     # Magnitude filter controls
│   │   ├── SearchBar.jsx   # Location search
│   │   ├── Legend.jsx      # Map legend
│   │   └── __tests__/      # Component tests
│   ├── services/           # API and utility services
│   │   └── usgs.js         # USGS API integration
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── README.md               # This file
```

## 🔧 Configuration

### Changing the API Endpoint

To use a different USGS endpoint, edit `src/services/usgs.js`:

```javascript
const API_ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
```

Available endpoints:
- `all_day.geojson` - Last 24 hours
- `all_week.geojson` - Last 7 days
- `all_month.geojson` - Last 30 days

### Changing Map Defaults

To change the default map center and zoom, edit `src/App.jsx`:

```javascript
<MapView
  defaultCenter={[20, 0]}  // [latitude, longitude]
  defaultZoom={2}           // Zoom level
/>
```

### Styling

The app uses Tailwind CSS. Customize styles in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Component files - Inline Tailwind classes

## 🧪 Testing

Run tests with:
```bash
npm test
```

Example test included: `src/components/__tests__/Filters.test.jsx`

## 📊 Data Source

Earthquake data is provided by the [USGS Earthquake Program](https://earthquake.usgs.gov/). Data is updated every few minutes and includes:

- Magnitude
- Location
- Depth
- Time
- USGS event page URL

## ♿ Accessibility

The application includes accessibility features:
- Keyboard navigation support
- ARIA labels on interactive elements
- Proper heading hierarchy
- High contrast colors
- Screen reader friendly

## 🐛 Troubleshooting

**Map not loading?**
- Check if the Leaflet CSS is loaded properly
- Verify internet connection
- Check browser console for errors

**No earthquakes showing?**
- Verify API endpoint is accessible
- Check if filters are too restrictive
- Try refreshing the page

**Build fails on deployment?**
- Ensure all dependencies are in `package.json`
- Check that build command is `npm run build`
- Verify output directory is `dist`

## 📄 License

This project is created for educational purposes as part of a take-home assignment.

## 🎨 UI Improvements (30-minute bonus ideas)

- Add a loading skeleton for better perceived performance
- Implement time-based filtering (last 1 hour, 6 hours, 12 hours, 24 hours)
- Add a dark mode toggle
- Show earthquake statistics in the header (total count, max magnitude)
- Add tooltips with more details on hover
- Implement keyboard shortcuts for common actions
- Add a "Go to my location" button to center the map on user's location
- Show a timeline visualization of earthquake activity
- Add magnitude distribution chart
- Implement a "Share" button to share filtered views via URL parameters

