/**
 * Latitude/longitude coordinates for countries where PVCON has presence.
 * Used by the COBE globe to render marker dots.
 * Coordinates point to approximate capital/major-city locations.
 */
export const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  // ── Africa ──────────────────────────────────────────────
  DZ: { lat: 36.75, lng: 3.04 },      // Algiers
  EG: { lat: 30.04, lng: 31.24 },     // Cairo
  KE: { lat: -1.29, lng: 36.82 },     // Nairobi
  LY: { lat: 32.9, lng: 13.18 },      // Tripoli
  MA: { lat: 33.97, lng: -6.85 },     // Rabat
  MU: { lat: -20.16, lng: 57.5 },     // Port Louis
  RW: { lat: -1.94, lng: 29.87 },     // Kigali
  TN: { lat: 36.81, lng: 10.17 },     // Tunis
  ZA: { lat: -25.75, lng: 28.19 },    // Pretoria

  // ── Americas ────────────────────────────────────────────
  AR: { lat: -34.6, lng: -58.38 },    // Buenos Aires
  BR: { lat: -15.79, lng: -47.88 },   // Brasilia
  CA: { lat: 45.42, lng: -75.7 },     // Ottawa
  CL: { lat: -33.45, lng: -70.67 },   // Santiago
  CO: { lat: 4.71, lng: -74.07 },     // Bogota
  CR: { lat: 9.93, lng: -84.08 },     // San Jose
  DO: { lat: 18.47, lng: -69.9 },     // Santo Domingo
  EC: { lat: -0.18, lng: -78.47 },    // Quito
  SV: { lat: 13.69, lng: -89.19 },    // San Salvador
  GT: { lat: 14.63, lng: -90.51 },    // Guatemala City
  HN: { lat: 14.07, lng: -87.19 },    // Tegucigalpa
  MX: { lat: 19.43, lng: -99.13 },    // Mexico City
  NI: { lat: 12.11, lng: -86.24 },    // Managua
  PE: { lat: -12.05, lng: -77.04 },   // Lima
  TT: { lat: 10.65, lng: -61.5 },     // Port of Spain
  US: { lat: 38.9, lng: -77.04 },     // Washington DC

  // ── Asia / Middle East ──────────────────────────────────
  AE: { lat: 24.45, lng: 54.65 },     // Abu Dhabi
  AM: { lat: 40.18, lng: 44.51 },     // Yerevan
  AZ: { lat: 40.41, lng: 49.87 },     // Baku
  BD: { lat: 23.81, lng: 90.41 },     // Dhaka
  BH: { lat: 26.23, lng: 50.59 },     // Manama
  BN: { lat: 4.94, lng: 114.95 },     // Bandar Seri Begawan
  CN: { lat: 39.9, lng: 116.4 },      // Beijing
  GE: { lat: 41.72, lng: 44.79 },     // Tbilisi
  HK: { lat: 22.32, lng: 114.17 },    // Hong Kong
  ID: { lat: -6.21, lng: 106.85 },    // Jakarta
  IN: { lat: 28.61, lng: 77.21 },     // New Delhi
  IQ: { lat: 33.34, lng: 44.37 },     // Baghdad
  IR: { lat: 35.69, lng: 51.39 },     // Tehran
  IL: { lat: 31.77, lng: 35.22 },     // Jerusalem
  JO: { lat: 31.95, lng: 35.93 },     // Amman
  JP: { lat: 35.68, lng: 139.69 },    // Tokyo
  KG: { lat: 42.87, lng: 74.59 },     // Bishkek
  KH: { lat: 11.56, lng: 104.92 },    // Phnom Penh
  KR: { lat: 37.57, lng: 126.98 },    // Seoul
  KW: { lat: 29.37, lng: 47.98 },     // Kuwait City
  KZ: { lat: 51.17, lng: 71.45 },     // Astana
  LB: { lat: 33.89, lng: 35.5 },      // Beirut
  LI: { lat: 47.14, lng: 9.52 },      // Vaduz
  AU: { lat: -35.28, lng: 149.13 },    // Canberra
  MY: { lat: 3.14, lng: 101.69 },     // Kuala Lumpur
  NP: { lat: 27.72, lng: 85.32 },     // Kathmandu
  OM: { lat: 23.59, lng: 58.54 },     // Muscat
  PH: { lat: 14.6, lng: 120.98 },     // Manila
  PK: { lat: 33.69, lng: 73.04 },     // Islamabad
  QA: { lat: 25.29, lng: 51.53 },     // Doha
  SA: { lat: 24.69, lng: 46.72 },     // Riyadh
  SG: { lat: 1.35, lng: 103.82 },     // Singapore
  TH: { lat: 13.76, lng: 100.5 },     // Bangkok
  TJ: { lat: 38.56, lng: 68.77 },     // Dushanbe
  TW: { lat: 25.03, lng: 121.57 },    // Taipei
  TR: { lat: 39.93, lng: 32.86 },     // Ankara
  UZ: { lat: 41.3, lng: 69.28 },      // Tashkent
  VN: { lat: 21.03, lng: 105.85 },    // Hanoi
  XK: { lat: 42.66, lng: 21.17 },     // Pristina

  // ── Europe ──────────────────────────────────────────────
  AL: { lat: 41.33, lng: 19.82 },     // Tirana
  AT: { lat: 48.21, lng: 16.37 },     // Vienna
  BA: { lat: 43.86, lng: 18.41 },     // Sarajevo
  BE: { lat: 50.85, lng: 4.35 },      // Brussels
  BG: { lat: 42.7, lng: 23.32 },      // Sofia
  BY: { lat: 53.9, lng: 27.57 },      // Minsk
  CH: { lat: 46.95, lng: 7.45 },      // Bern
  CY: { lat: 35.17, lng: 33.36 },     // Nicosia
  CZ: { lat: 50.08, lng: 14.42 },     // Prague
  DE: { lat: 52.52, lng: 13.41 },     // Berlin
  DK: { lat: 55.68, lng: 12.57 },     // Copenhagen
  ES: { lat: 40.42, lng: -3.7 },      // Madrid
  FI: { lat: 60.17, lng: 24.94 },     // Helsinki
  FR: { lat: 48.86, lng: 2.35 },      // Paris
  GB: { lat: 51.51, lng: -0.13 },     // London
  GR: { lat: 37.98, lng: 23.73 },     // Athens
  HR: { lat: 45.81, lng: 15.98 },     // Zagreb
  HU: { lat: 47.5, lng: 19.04 },      // Budapest
  IE: { lat: 53.35, lng: -6.26 },     // Dublin
  IS: { lat: 64.15, lng: -21.94 },    // Reykjavik
  IT: { lat: 41.9, lng: 12.5 },       // Rome
  LT: { lat: 54.69, lng: 25.28 },     // Vilnius
  LV: { lat: 56.95, lng: 24.11 },     // Riga
  MD: { lat: 47.01, lng: 28.86 },     // Chisinau
  ME: { lat: 42.44, lng: 19.26 },     // Podgorica
  MK: { lat: 41.99, lng: 21.43 },     // Skopje
  MT: { lat: 35.9, lng: 14.51 },      // Valletta
  NL: { lat: 52.37, lng: 4.9 },       // Amsterdam
  NO: { lat: 59.91, lng: 10.75 },     // Oslo
  PL: { lat: 52.23, lng: 21.01 },     // Warsaw
  PT: { lat: 38.72, lng: -9.14 },     // Lisbon
  RO: { lat: 44.43, lng: 26.1 },      // Bucharest
  RS: { lat: 44.79, lng: 20.47 },     // Belgrade
  SE: { lat: 59.33, lng: 18.07 },     // Stockholm
  SI: { lat: 46.05, lng: 14.51 },     // Ljubljana
  SK: { lat: 48.15, lng: 17.11 },     // Bratislava
  UA: { lat: 50.45, lng: 30.52 },     // Kyiv
  RU: { lat: 55.76, lng: 37.62 },     // Moscow
};
