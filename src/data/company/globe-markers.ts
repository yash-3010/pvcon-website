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
  markerColor: [0.13, 0.18, 0.39] as [number, number, number],   // --secondary (#202f63)
  baseColor: [1, 1, 1] as [number, number, number],
  glowColor: [0.94, 0.93, 0.91] as [number, number, number],
};
