import { companyPresence } from "./config";
import { countryCoordinates } from "./country-coordinates";

/**
 * Curated subset of countries to show labels for on the globe.
 * Spread across continents for visual balance without clutter.
 */
const labelledCountries: Record<string, string> = {
  US: "USA",
  DE: "Germany",
  GB: "UK",
  JP: "Japan",
  CN: "China",
  BR: "Brazil",
  SG: "Singapore",
  AE: "UAE",
  ZA: "South Africa",
  SA: "Saudi Arabia",
  TR: "Turkey",
  MX: "Mexico",
  AU: "Australia",
};

/** Pre-computed markers for the COBE globe. */
export const globeMarkers = companyPresence
  .filter(({ code }) => code in countryCoordinates)
  .map(({ code }) => ({
    id: code,
    location: [countryCoordinates[code].lat, countryCoordinates[code].lng] as [number, number],
    label: labelledCountries[code] ?? "",
  }));

/** PVCON brand colors for globe rendering (RGB 0-1 range). */
export const globeColors = {
  // markerColor: [0.13, 0.18, 0.39] as [number, number, number],   // --secondary (#202f63)
  markerColor: [0.57, 0.7, 0.33] as [number, number, number],   // --primary (#92b353)
  baseColor: [1, 1, 1] as [number, number, number],
  glowColor: [0.94, 0.93, 0.91] as [number, number, number],
  arcColor: [0.13, 0.18, 0.39] as [number, number, number],      // --primary (#92b353)
};

type Arc = {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
};

export const globeArcs: Arc[] = [
  // india to all labelledCountries 
  {
    id: "india-usa",
    from: [20.5937, 78.9629], // India
    to: [37.0902, -95.7129], // USA
    label: "India → USA",
  },
  {
    id: "india-germany",
    from: [20.5937, 78.9629], // India
    to: [51.1657, 10.4515], // Germany
    label: "India → Germany",
  },
  {
    id: "india-uk",
    from: [20.5937, 78.9629], // India
    to: [55.3781, -3.4360], // UK
    label: "India → UK",
  },
  {
    id: "india-japan",
    from: [20.5937, 78.9629], // India
    to: [36.2048, 138.2529], // Japan
    label: "India → Japan",
  },
  {
    id: "india-china",
    from: [20.5937, 78.9629], // India
    to: [35.8617, 104.1954], // China
    label: "India → China",
  },
  {
    id: "india-brazil",
    from: [20.5937, 78.9629], // India
    to: [-14.2350, -51.9253], // Brazil
    label: "India → Brazil",
  },
  {
    id: "india-singapore",
    from: [20.5937, 78.9629], // India
    to: [1.3521, 103.8198], // Singapore
    label: "India → Singapore",
  },
  {
    id: "india-uae",
    from: [20.5937, 78.9629], // India
    to: [23.4241, 53.8478], // UAE
    label: "India → UAE",
  },
  {
    id: "india-southafrica",
    from: [20.5937, 78.9629], // India
    to: [-30.5595, 22.9375], // South Africa
    label: "India → South Africa",
  },
  {
    id: "india-saudiarabia",
    from: [20.5937, 78.9629], // India
    to: [23.8859, 45.0792], // Saudi Arabia
    label: "India → Saudi Arabia",
  },
  {
    id: "india-turkey",
    from: [20.5937, 78.9629], // India
    to: [38.9637, 35.2433], // Turkey
    label: "India → Turkey",
  },
  {
    id: "india-mexico",
    from: [20.5937, 78.9629], // India
    to: [23.6345, -102.5528], // Mexico
    label: "India → Mexico",
  },
  {
    id: "india-australia",
    from: [20.5937, 78.9629], // India
    to: [-25.2744, 133.7751], // Australia
    label: "India → Australia",
  },
];
