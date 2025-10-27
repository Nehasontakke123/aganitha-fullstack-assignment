# Quick Start Guide

Get up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:3000`

## 3. Build for Production

```bash
npm run build
```

## What You'll See

- **Map View**: Interactive world map showing recent earthquakes
- **Sidebar**: Filter by magnitude, search locations, view earthquake list
- **Markers**: Color-coded by magnitude (green → yellow → orange → red)
- **Details**: Click markers or list items for earthquake information

## Troubleshooting

**Can't see the map?**
- Check browser console for errors
- Verify Leaflet CSS is loading (should see map styles)

**No earthquakes showing?**
- API might be down - check https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
- Try adjusting the magnitude filter (might be too high)

**Build errors?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- If still failing, check Node.js version (should be 16+)

## Key Files to Know

- `src/App.jsx` - Main app component with state management
- `src/services/usgs.js` - API integration
- `src/components/` - All UI components
- `README.md` - Full documentation

Enjoy visualizing earthquakes! 🌍

