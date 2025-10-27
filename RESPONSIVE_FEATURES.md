# Responsive Design Features

This Earthquake Visualizer is fully responsive and optimized for all device sizes from mobile phones to desktop computers.

## 📱 Mobile-First Design

### Header (src/App.jsx)
- **Mobile (< 640px)**: Stacked layout with smaller text and compact controls
- **Tablet (640px+)**: Horizontal layout with slightly larger elements
- **Desktop (1024px+)**: Full horizontal layout with all labels visible

**Responsive classes used:**
- `flex-col sm:flex-row` - Stack vertically on mobile, horizontal on larger screens
- `text-lg sm:text-xl md:text-2xl` - Responsive title sizing
- `px-3 sm:px-4` - Responsive padding
- `hidden sm:inline` - Hide labels on mobile, show on larger screens

### Sidebar (src/App.jsx)
- **Mobile**: Fixed overlay that slides from left, full-screen backdrop
- **Tablet/Desktop**: Static sidebar alongside map
- **Behavior**: Click outside to close on mobile; always visible on desktop

**Responsive features:**
- `fixed lg:static` - Overlay on mobile, static on desktop
- `w-80 sm:w-96` - Responsive width
- `max-w-[85vw]` - Limits maximum width on mobile
- `z-40 lg hệ-20` - Z-index management for proper layering
- Backdrop overlay: `bg-black bg-opacity-50 z-30 lg:hidden`

### Search Bar (src/components/SearchBar.jsx)
- Smaller padding on mobile: `p-3 sm:p-4`
- Smaller text: `text-xs sm:text-sm`
- Compact button spacing: `gap-1 sm:gap-2`
- Reduced placeholder text on mobile
- `whitespace-nowrap` prevents button text wrapping

### Filters (src/components/Filters.jsx)
- Reduced spacing: `space-y-3 sm:space-y-4`
- Smaller text sizes throughout
- Compact statistics display

### Earthquake List (src/components/EarthquakeList.jsx)
- Smaller padding: `p-3 sm:p-4`
- Compact magnitude indicator: `w-3 h-3 sm:w-4 sm:h-4`
- Responsive text: `text-xs sm:text-sm`, `text-base sm:text-lg`
- Stacked info on mobile: `flex-col sm:flex-row`
- Wrap coordinates on small screens: `flex-wrap`

### Legend (src/components/Legend.jsx)
- Smaller positioning: `top-2 right-2 sm:top-4 sm:right-4`
- Responsive width: `max-w-[160px] sm:max-w-[200px]`
- Compact padding and text
- Smaller color indicators

### Map Display
- Hide map when sidebar is open on mobile
- Full view when sidebar is closed
- Always visible on desktop (1024px+)

**Class used:** `${isSidebarOpen ? 'hidden lg:block' : 'block'}`

## 🎯 Breakpoints Used

Tailwind's default breakpoints:
- **sm:** 640px (Tablet portrait)
- **md:** 768px (Tablet landscape)
- **lg:** 1024px (Desktop)
- **xl:** 1280px (Large desktop)
- **2xl:** 1536px (Extra large desktop)

## ✅ Mobile Optimizations

1. **Touch-Friendly Targets**
   - Buttons have minimum 44x44px touch targets
   - Adequate spacing between interactive elements

2. **Viewport Management**
   - Proper viewport meta tag in `index.html`
   - Sidebar doesn't overwhelm small screens
   - Map uses full available space when sidebar is closed

3. **Text Readability**
   - Minimum 12px font size (text-xs)
   - Proper line heights for readability
   - Truncated text where appropriate

4. **Performance**
   - Reduced padding/margins on mobile
   - Smaller legend and indicators
   - Efficient re-renders with proper React hooks

5. **Accessibility**
   - ARIA labels maintained on all screen sizes
   - Keyboard navigation works on all devices
   - Focus states visible on all controls

## 🧪 Testing Responsiveness

### Test on Different Devices

1. **Mobile Phone (320px - 640px)**
   - Sidebar overlays as fixed panel
   - Header stacks vertically
   - Compact controls
   - Touch-friendly buttons

2. **Tablet (640px - 1024px)**
   - Hybrid layout
   - More horizontal space
   - Larger text and controls
   - Sidebar still overlays

3. **Desktop (1024px+)**
   - Full side-by-side layout
   - Sidebar always visible
   - All labels and text visible
   - Optimal spacing and sizing

### Browser DevTools Testing

```javascript
// Test responsive behavior in Chrome DevTools:
// 1. Open DevTools (F12)
// 2. Click device toggle (Ctrl+Shift+M)
// 3. Test these resolutions:
//    - iPhone SE (375x667)
//    - iPad (768x1024)
//    - Desktop (1920x1080)
```

## 🎨 Key Responsive Patterns

### 1. Progressive Enhancement
- Mobile-first base styles
- Enhanced layouts for larger screens
- No functionality loss on smaller devices

### 2. Flexible Units
- `flex` layouts for proper distribution
- `min-w-0` to prevent flex item overflow
- `whitespace-nowrap` where appropriate

### 3. Conditional Rendering
- Different layouts based on screen size
- Hide/show elements with `hidden sm:inline`
- Stack vs. horizontal with `flex-col sm:flex-row`

### 4. Contextual Sizing
- Smaller elements on mobile
- Increased size on larger screens
- Maintains visual hierarchy

## 💡 Customization

To adjust responsive behavior, modify Tailwind classes:

**Change breakpoint:**
```jsx
// Instead of sm:, use md: or lg:
className="block md:flex"
```

**Adjust spacing:**
```jsx
// Control padding/margin
className="p-2 md:p-4 lg:p-6"
```

**Control visibility:**
```jsx
// Show/hide at different sizes
className="hidden lg:block"
```

All responsive features are implemented using Tailwind's utility classes, making them easy to customize and maintain.

