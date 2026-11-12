"use client";

import dynamic from "next/dynamic";

/*
 * OpenLayers needs the browser, and neither map is needed for first paint,
 * so both load on the client after the page. Placeholders keep the final size to avoid layout shift.
 */

export const NetworkMap = dynamic(() => import("./NetworkMapImpl"), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full sm:aspect-[2/1]" />,
});

export const LocationMap = dynamic(() => import("./LocationMapImpl"), {
  ssr: false,
  loading: () => <div className="h-[360px] w-full rounded-lg border border-line bg-mist md:h-[480px]" />,
});

export type { NetworkMapProps } from "./NetworkMapImpl";
export type { LocationMapProps } from "./LocationMapImpl";
export type { RegionKey } from "./networkData";
export { OFFICE } from "./officeLocation";
