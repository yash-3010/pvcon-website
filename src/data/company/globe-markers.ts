import { companyPresence } from "./config";
import { countryCoordinates } from "./country-coordinates";

/**
 * Curated subset of countries to show labels for on the globe.
 * Spread across continents for visual balance without clutter.
 */
const labelledCountries: Record<string, string> = {
  US: "USA",
  BR: "Brazil",
  GB: "UK",
  DE: "Germany",
  IN: "India",
  JP: "Japan",
  AE: "UAE",
  ZA: "South Africa",
  SG: "Singapore",
  SA: "Saudi Arabia",
  TR: "Turkey",
  CN: "China",
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
  {
    id: "india-usa",
    from: [20.5937, 78.9629], // India
    to: [37.0902, -95.7129], // USA
    label: "India → USA",
  },
  {
    id: "india-uk",
    from: [20.5937, 78.9629],
    to: [55.3781, -3.4360],
    label: "India → UK",
  },
  {
    id: "india-uae",
    from: [20.5937, 78.9629],
    to: [23.4241, 53.8478],
    label: "India → UAE",
  },
  {
    id: "india-singapore",
    from: [20.5937, 78.9629],
    to: [1.3521, 103.8198],
    label: "India → Singapore",
  },
  {
    id: "europe-usa",
    from: [50.1109, 8.6821], // Germany-ish central EU
    to: [37.0902, -95.7129],
    label: "Europe → USA",
  },
  {
    id: "asia-europe",
    from: [35.6762, 139.6503], // Japan
    to: [48.8566, 2.3522], // France
    label: "Japan → France",
  },
];
