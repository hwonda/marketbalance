/** Regions shown on the overseas network map. Keys match the `key` field of the `regions` arrays in the dictionaries. */
export type RegionKey = "asia" | "europe" | "middleEast" | "cis" | "northAmerica" | "oceania";

type Hub = { lon: number; lat: number };

export type NetworkRegion = {
  key: RegionKey;
  /** ISO 3166-1 numeric codes, as used by world-atlas. Small places (Hong Kong, Singapore) only get a hub dot. */
  countries: string[];
  hubs: Hub[];
  /** Where the region name sits; also the end of the line drawn from the head office. */
  anchor: Hub;
};

/** Head office, Anyang (approximate). */
export const HEAD_OFFICE: Hub = { lon: 126.95, lat: 37.39 };
export const KOREA_ID = "410";
/** Antarctica is left off so the map spends its height on inhabited land. */
export const HIDDEN_COUNTRIES = ["010"];

// Longitudes east of 180 are written as lon + 360 so the Americas sit to the right of Asia on a Pacific-centred map.
export const NETWORK_REGIONS: NetworkRegion[] = [
  {
    key: "asia",
    countries: ["156", "158", "704", "764", "356"],
    hubs: [
      { lon: 121.47, lat: 31.23 }, // Shanghai
      { lon: 114.17, lat: 22.32 }, // Hong Kong
      { lon: 121.56, lat: 25.03 }, // Taipei
      { lon: 106.63, lat: 10.82 }, // Ho Chi Minh City
      { lon: 100.5, lat: 13.75 }, // Bangkok
      { lon: 103.82, lat: 1.35 }, // Singapore
      { lon: 77.21, lat: 28.61 }, // New Delhi
    ],
    anchor: { lon: 103.82, lat: 1.35 },
  },
  {
    key: "europe",
    countries: ["276", "203", "348"],
    hubs: [
      { lon: 11.58, lat: 48.14 }, // Munich
      { lon: 14.42, lat: 50.08 }, // Prague
      { lon: 19.04, lat: 47.5 }, // Budapest
    ],
    anchor: { lon: 11.58, lat: 48.14 },
  },
  {
    key: "middleEast",
    countries: ["784", "792"],
    hubs: [
      { lon: 55.27, lat: 25.2 }, // Dubai
      { lon: 28.98, lat: 41.01 }, // Istanbul
    ],
    anchor: { lon: 55.27, lat: 25.2 },
  },
  {
    key: "cis",
    countries: ["643"],
    hubs: [{ lon: 37.62, lat: 55.75 }], // Moscow
    anchor: { lon: 37.62, lat: 55.75 },
  },
  {
    key: "northAmerica",
    countries: ["840"],
    hubs: [{ lon: -118.24 + 360, lat: 34.05 }], // Los Angeles
    anchor: { lon: -118.24 + 360, lat: 34.05 },
  },
  {
    key: "oceania",
    countries: ["036"],
    hubs: [{ lon: 151.21, lat: -33.87 }], // Sydney
    anchor: { lon: 151.21, lat: -33.87 },
  },
];

/** Visible window: Europe on the left edge, the US west coast on the right. */
export const NETWORK_EXTENT_LONLAT: [number, number, number, number] = [-14, -46, 296, 72];
