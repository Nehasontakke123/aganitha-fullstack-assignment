import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { beforeEach } from 'vitest';
import Filters from '../Filters';

describe('Filters', () => {
  const mockEarthquakes = [
    { magnitude: 5.0, latitude: 0, longitude: 0 },
    { magnitude: 3.5, latitude: 0, longitude: 0 },
    { magnitude: 6.2, latitude: 0, longitude: 0 },
  ];

  it('renders magnitude filter slider', () => {
    const handleChange = vi.fn();
    render(
      <Filters
        minMagnitude={2.5}
        onMagnitudeChange={handleChange}
        earthquakes={mockEarthquakes}
      />
    );

    expect(screen.getByText('Minimum Magnitude: 2.5')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('displays earthquake count', () => {
    const handleChange = vi.fn();
    render(
      <Filters
        minMagnitude={0}
        onMagnitudeChange={handleChange}
        earthquakes={mockEarthquakes}
      />
    );

    expect(screen.getByText(/3 earthquake/)).toBeInTheDocument();
  });

  it('calculates magnitude range correctly', () => {
    const handleChange = vi.fn();
    render(
      <Filters
        minMagnitude={0}
        onMagnitudeChange={handleChange}
        earthquakes={mockEarthquakes}
      />
    );

    expect(screen.getByText(/Range: 3.5 - 6.2/)).toBeInTheDocument();
  });
});

