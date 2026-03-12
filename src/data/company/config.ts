export const companyConfig = {
  ceoImageSrc: "/images/team/moin-don.webp",
  teamMembers: [
    { id: "moin-don", imageSrc: "/images/team/moin-don.webp", initials: "MD", color: "#202f63" },
    { id: "rameez-don", imageSrc: "/images/team/rameez-don.webp", initials: "RD", color: "#92b353" },
    { id: "sonam-garg", imageSrc: "/images/team/sonam-garg.webp", initials: "SG", color: "#7da844" },
    { id: "nazrul-khan", imageSrc: "/images/team/nazrul-khan.webp", initials: "NK", color: "#202f63" },
  ],
} as const;

/**
 * Countries where PVCON has a presence.
 * Uses ISO 3166-1 alpha-2 codes — must match the `id` attributes in world-map-paths.ts.
 * Dot positions are calculated automatically from each country's SVG path bounding box.
 * To add a country: just add its code + label. No coordinates needed.
 */
/**
 * lat/lng overrides: required for archipelagos, very large countries, or any
 * country whose dot lands in the ocean. Uses the map's geoViewBox for conversion.
 * Compact mainland countries can omit lat/lng — they auto-centre via getBBox().
 */
export const companyPresence: { code: string; label: string; lat?: number; lng?: number }[] = [
  // Americas
  { code: "US", label: "United States",  lat:  39.50, lng:  -98.35 }, // continental center
  { code: "CA", label: "Canada",         lat:  56.13, lng:  -96.80 }, // populated south
  { code: "BR", label: "Brazil",         lat: -14.24, lng:  -51.93 },
  { code: "MX", label: "Mexico",         lat:  23.63, lng: -102.55 },
  { code: "AR", label: "Argentina",      lat: -38.42, lng:  -63.62 },
  { code: "CL", label: "Chile",          lat: -35.68, lng:  -71.54 },

  // Europe — compact shapes, bbox works fine
  { code: "GB", label: "United Kingdom" },
  { code: "IE", label: "Ireland" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "ES", label: "Spain" },
  { code: "IT", label: "Italy" },
  { code: "NL", label: "Netherlands" },
  { code: "BE", label: "Belgium" },
  { code: "CH", label: "Switzerland" },
  { code: "AT", label: "Austria" },
  { code: "SE", label: "Sweden" },
  { code: "DK", label: "Denmark" },
  { code: "NO", label: "Norway",         lat:  64.50, lng:   17.00 }, // avoid Svalbard pulling bbox north
  { code: "FI", label: "Finland" },
  { code: "PL", label: "Poland" },
  { code: "CZ", label: "Czech Republic" },
  { code: "HU", label: "Hungary" },
  { code: "RO", label: "Romania" },

  { code: "TR", label: "Turkey" },
  { code: "RU", label: "Russia",         lat:  61.52, lng:  105.32 }, // vast — force Siberia center

  // Middle East
  { code: "AE", label: "United Arab Emirates" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "IL", label: "Israel" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },

  // Asia
  { code: "IN", label: "India" },
  { code: "CN", label: "China" },
  { code: "JP", label: "Japan",          lat:  36.20, lng:  138.25 }, // Honshu
  { code: "KR", label: "South Korea" },
  { code: "SG", label: "Singapore" },
  { code: "TH", label: "Thailand" },
  { code: "MY", label: "Malaysia",       lat:   3.80, lng:  109.70 }, // Borneo midpoint
  { code: "ID", label: "Indonesia",      lat:  -2.55, lng:  118.02 }, // archipelago
  { code: "PH", label: "Philippines",    lat:  12.88, lng:  121.77 }, // archipelago
  { code: "VN", label: "Vietnam" },
  { code: "TW", label: "Taiwan",         lat:  23.70, lng:  121.00 },
  { code: "HK", label: "Hong Kong",      lat:  22.35, lng:  114.10 },

  // Oceania
  { code: "AU", label: "Australia",      lat: -25.27, lng:  133.78 }, // inland center
  { code: "NZ", label: "New Zealand",    lat: -40.90, lng:  174.89 }, // North Island

  // Africa
  { code: "ZA", label: "South Africa",   lat: -28.47, lng:   24.68 },
  { code: "EG", label: "Egypt" },
  { code: "NG", label: "Nigeria" },
  { code: "KE", label: "Kenya" },
];
