"use client";

import { useEffect, useRef, useState } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control/defaults";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import DragPan from "ol/interaction/DragPan";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import { platformModifierKeyOnly } from "ol/events/condition";
import type MapBrowserEvent from "ol/MapBrowserEvent";
import { fromLonLat } from "ol/proj";
import { boundingExtent } from "ol/extent";
import "ol/ol.css";
import { OFFICE, STATION_EXIT } from "./officeLocation";

export type LocationMapProps = {
  officeName: string;
  officeDetail: string;
  stationLabel: string;
  zoomIn: string;
  zoomOut: string;
  /** Shown briefly when someone scrolls or drags with one finger over the map. */
  gestureHint: string;
  ariaLabel: string;
};

/** Build overlay markup with DOM APIs so dictionary text is never parsed as HTML. */
function officeMarker(name: string, detail: string) {
  const root = document.createElement("div");
  root.className = "flex flex-col items-center";
  const card = document.createElement("div");
  card.className =
    "rounded-lg bg-ink px-3 py-2 text-[13px] leading-snug whitespace-nowrap text-white shadow-[0_8px_24px_rgba(32,24,32,0.25)]";
  const title = document.createElement("strong");
  title.className = "block font-semibold";
  title.textContent = name;
  const sub = document.createElement("span");
  sub.className = "block text-white/70";
  sub.textContent = detail;
  card.append(title, sub);
  const tip = document.createElement("div");
  tip.className = "h-0 w-0 border-x-[7px] border-t-[8px] border-x-transparent border-t-ink";
  const dot = document.createElement("div");
  dot.className = "mt-1 size-4 rounded-full border-[3px] border-white bg-blue shadow";
  root.append(card, tip, dot);
  return root;
}

function stationMarker(label: string) {
  const root = document.createElement("div");
  root.className =
    "flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap text-ink shadow ring-1 ring-line";
  const dot = document.createElement("span");
  dot.className = "size-2.5 rounded-full bg-blue-deep";
  const text = document.createElement("span");
  text.textContent = label;
  root.append(text, dot);
  return root;
}

export default function LocationMapImpl({
  officeName,
  officeDetail,
  stationLabel,
  zoomIn,
  zoomOut,
  gestureHint,
  ariaLabel,
}: LocationMapProps) {
  const target = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OlMap | null>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!target.current) return;

    // Page scrolling stays page scrolling: zoom needs Ctrl/⌘ + wheel, panning on touch needs two fingers.
    const dragPan: DragPan = new DragPan({
      condition: (event: MapBrowserEvent) => {
        const pointerEvent = event.originalEvent as PointerEvent;
        return pointerEvent.pointerType !== "touch" || dragPan.getPointerCount() >= 2;
      },
    });
    const map = new OlMap({
      target: target.current,
      layers: [new TileLayer({ source: new OSM(), className: "mb-map-tiles" })],
      controls: defaultControls({ zoom: false, rotate: false, attributionOptions: { collapsible: false } }),
      interactions: defaultInteractions({ dragPan: false, mouseWheelZoom: false }).extend([
        dragPan,
        new MouseWheelZoom({ condition: platformModifierKeyOnly }),
      ]),
      view: new View({ center: fromLonLat([OFFICE.lon, OFFICE.lat]), zoom: 16, minZoom: 11, maxZoom: 19 }),
    });
    // Frame both the office and the station exit, leaving room for the office card above
    // and the zoom buttons on the right.
    const frame = boundingExtent([
      fromLonLat([OFFICE.lon, OFFICE.lat]),
      fromLonLat([STATION_EXIT.lon, STATION_EXIT.lat]),
    ]);
    const fitFrame = () => {
      const size = map.getSize();
      if (size && size[0] > 0) map.getView().fit(frame, { size, padding: [96, 72, 48, 48], maxZoom: 17 });
    };
    map.once("change:size", fitFrame);
    fitFrame();
    map.addOverlay(
      new Overlay({
        element: stationMarker(stationLabel),
        position: fromLonLat([STATION_EXIT.lon, STATION_EXIT.lat]),
        positioning: "center-right",
        offset: [9, 0],
        stopEvent: false,
      }),
    );
    map.addOverlay(
      new Overlay({
        element: officeMarker(officeName, officeDetail),
        position: fromLonLat([OFFICE.lon, OFFICE.lat]),
        positioning: "bottom-center",
        offset: [0, 8],
        stopEvent: false,
      }),
    );
    mapRef.current = map;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const flash = () => {
      setHint(true);
      clearTimeout(timer);
      timer = setTimeout(() => setHint(false), 1400);
    };
    const el = target.current;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) flash();
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 1) flash();
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      clearTimeout(timer);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouch);
      map.setTarget(undefined);
      map.dispose();
      mapRef.current = null;
    };
  }, [officeName, officeDetail, stationLabel]);

  const zoomBy = (delta: number) => {
    const view = mapRef.current?.getView();
    const zoom = view?.getZoom();
    if (view && zoom !== undefined) view.animate({ zoom: zoom + delta, duration: 200 });
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-mist">
      <div ref={target} role="region" aria-label={ariaLabel} className="h-[360px] w-full md:h-[480px]" />
      <div className="absolute top-3 right-3 flex flex-col overflow-hidden rounded-md border border-line bg-white shadow-sm">
        <button
          type="button"
          onClick={() => zoomBy(1)}
          aria-label={zoomIn}
          className="flex size-11 items-center justify-center text-h4 leading-none text-ink hover:bg-mist"
        >
          +
        </button>
        <span className="h-px bg-line" />
        <button
          type="button"
          onClick={() => zoomBy(-1)}
          aria-label={zoomOut}
          className="flex size-11 items-center justify-center text-h4 leading-none text-ink hover:bg-mist"
        >
          −
        </button>
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/45 px-6 text-center text-small font-semibold text-white transition-opacity duration-200 ${
          hint ? "opacity-100" : "opacity-0"
        }`}
      >
        {gestureHint}
      </div>
    </div>
  );
}
