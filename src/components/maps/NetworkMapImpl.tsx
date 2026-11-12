"use client";

import { useEffect, useRef } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TopoJSON from "ol/format/TopoJSON";
import { LineString, MultiPolygon, Point, Polygon } from "ol/geom";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import type { FeatureLike } from "ol/Feature";
import { fromLonLat, transformExtent } from "ol/proj";
import "ol/ol.css";
import {
  HEAD_OFFICE,
  HIDDEN_COUNTRIES,
  KOREA_ID,
  NETWORK_EXTENT_LONLAT,
  NETWORK_REGIONS,
  type RegionKey,
} from "./networkData";

export type NetworkMapProps = {
  /** Region names in the current language. */
  labels: Record<RegionKey, string>;
  /** Label for the head office dot. */
  headOfficeLabel: string;
  /** Text alternative describing what the map shows. */
  ariaLabel: string;
};

const COLORS = {
  land: "#e5e2e5",
  border: "#ffffff",
  network: "#bcdcf0",
  korea: "#004870",
  route: "rgba(0, 120, 192, 0.55)",
  hub: "#0078c0",
  ink: "#201820",
};

const FONT_STACK = '"Wanted Sans Variable", "Wanted Sans", sans-serif';
const FONT = `600 13px ${FONT_STACK}`;
/** Below this map width labels shrink so neighbouring regions don't collide on phones. */
const NARROW_WIDTH = 560;
const NARROW_FONT = `600 11px ${FONT_STACK}`;

/** Where each region's name sits relative to its anchor, so labels clear each other and the lines. */
const LABEL_PLACEMENT: Record<RegionKey, { align: CanvasTextAlign; x: number; y: number }> = {
  asia: { align: "center", x: 0, y: 16 },
  europe: { align: "left", x: 8, y: 13 },
  middleEast: { align: "center", x: 0, y: 16 },
  cis: { align: "center", x: 0, y: -14 },
  northAmerica: { align: "center", x: 0, y: 16 },
  oceania: { align: "center", x: 0, y: 16 },
};

/**
 * Countries that cross the 180th meridian (Russia, Fiji, the Aleutians) have rings that jump from +180 to -180,
 * which draws as a band across the whole map. Shifting the western half by 360° keeps each ring continuous.
 */
function unwrapAntimeridian(geometry: Polygon | MultiPolygon) {
  const fixRing = (ring: number[][]) => {
    const crosses = ring.some(([lon]) => lon > 150) && ring.some(([lon]) => lon < -150);
    return crosses ? ring.map(([lon, lat]) => [lon < 0 ? lon + 360 : lon, lat]) : ring;
  };
  if (geometry instanceof Polygon) {
    geometry.setCoordinates(geometry.getCoordinates().map(fixRing));
  } else {
    geometry.setCoordinates(geometry.getCoordinates().map((polygon) => polygon.map(fixRing)));
  }
}

/** A gentle arc between two projected points, bowed towards the north. */
function arc(from: number[], to: number[], segments = 48) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  let nx = -dy / length;
  let ny = dx / length;
  if (ny < 0) {
    nx = -nx;
    ny = -ny;
  }
  const bow = length * 0.18;
  const cx = (x1 + x2) / 2 + nx * bow;
  const cy = (y1 + y2) / 2 + ny * bow;
  const points: number[][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const c = t * t;
    points.push([a * x1 + b * cx + c * x2, a * y1 + b * cy + c * y2]);
  }
  return new LineString(points);
}

export default function NetworkMapImpl({ labels, headOfficeLabel, ariaLabel }: NetworkMapProps) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!target.current) return;
    let cancelled = false;

    const networkIds = new Set(NETWORK_REGIONS.flatMap((r) => r.countries));
    const countryStyle = (feature: FeatureLike) => {
      const id = String(feature.getId());
      const fill = id === KOREA_ID ? COLORS.korea : networkIds.has(id) ? COLORS.network : COLORS.land;
      return new Style({
        fill: new Fill({ color: fill }),
        stroke: new Stroke({ color: COLORS.border, width: 0.6 }),
      });
    };

    const countries = new VectorSource();
    const overlay = new VectorSource({ wrapX: false });
    const office = fromLonLat([HEAD_OFFICE.lon, HEAD_OFFICE.lat]);

    for (const region of NETWORK_REGIONS) {
      overlay.addFeature(
        new Feature({
          geometry: arc(office, fromLonLat([region.anchor.lon, region.anchor.lat])),
          kind: "route",
        }),
      );
      for (const hub of region.hubs) {
        overlay.addFeature(new Feature({ geometry: new Point(fromLonLat([hub.lon, hub.lat])), kind: "hub" }));
      }
      overlay.addFeature(
        new Feature({
          geometry: new Point(fromLonLat([region.anchor.lon, region.anchor.lat])),
          kind: "label",
          region: region.key,
        }),
      );
    }
    overlay.addFeature(new Feature({ geometry: new Point(office), kind: "office" }));

    // Set by `fit` from the rendered width; read by the label styles.
    let narrow = false;
    const overlayStyle = (feature: FeatureLike) => {
      switch (feature.get("kind")) {
        case "route":
          return new Style({ stroke: new Stroke({ color: COLORS.route, width: 1.4 }) });
        case "hub":
          return new Style({
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({ color: COLORS.hub }),
              stroke: new Stroke({ color: "#ffffff", width: 1.5 }),
            }),
          });
        case "office":
          return new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({ color: COLORS.ink }),
              stroke: new Stroke({ color: "#ffffff", width: 2 }),
            }),
            text: new Text({
              text: headOfficeLabel,
              font: narrow ? NARROW_FONT : FONT,
              fill: new Fill({ color: COLORS.ink }),
              stroke: new Stroke({ color: "#ffffff", width: 3 }),
              textAlign: "left",
              offsetX: 10,
              offsetY: -10,
            }),
          });
        case "label": {
          const key = feature.get("region") as RegionKey;
          const place = LABEL_PLACEMENT[key];
          return new Style({
            text: new Text({
              text: labels[key],
              font: narrow ? NARROW_FONT : FONT,
              fill: new Fill({ color: COLORS.ink }),
              stroke: new Stroke({ color: "#ffffff", width: 3 }),
              textAlign: place.align,
              offsetX: place.x,
              offsetY: place.y,
            }),
          });
        }
      }
    };

    const extent = transformExtent(NETWORK_EXTENT_LONLAT, "EPSG:4326", "EPSG:3857");
    const countryLayer = new VectorLayer({ source: countries, style: countryStyle });
    const overlayLayer = new VectorLayer({ source: overlay, style: overlayStyle, declutter: false });
    const map = new OlMap({
      target: target.current,
      layers: [countryLayer, overlayLayer],
      controls: [],
      interactions: [],
      view: new View({ center: [0, 0], zoom: 1, multiWorld: true, showFullExtent: true }),
    });

    const fit = () => {
      const size = map.getSize();
      if (!size || size[0] === 0) return;
      map.getView().fit(extent, { size, padding: [8, 8, 8, 8] });
      const nextNarrow = size[0] < NARROW_WIDTH;
      if (nextNarrow !== narrow) {
        narrow = nextNarrow;
        overlayLayer.changed();
      }
    };
    map.on("change:size", fit);
    fit();

    fetch("/data/countries-110m.json")
      .then((response) => response.json())
      .then((topology) => {
        if (cancelled) return;
        const features = new TopoJSON({ layers: ["countries"] })
          .readFeatures(topology, { dataProjection: "EPSG:4326", featureProjection: "EPSG:4326" })
          .filter((f) => !HIDDEN_COUNTRIES.includes(String(f.getId())));
        for (const feature of features) {
          const geometry = feature.getGeometry();
          if (geometry instanceof Polygon || geometry instanceof MultiPolygon) {
            unwrapAntimeridian(geometry);
            geometry.transform("EPSG:4326", "EPSG:3857");
          }
        }
        countries.addFeatures(features);
      })
      .catch(() => {
        // The region list next to the map carries the same information, so a failed load only hides the drawing.
      });

    // Canvas text uses whatever font is ready when it draws; redraw once the web font has arrived.
    document.fonts?.load(FONT).then(() => {
      if (!cancelled) overlayLayer.changed();
    });

    return () => {
      cancelled = true;
      map.setTarget(undefined);
      map.dispose();
    };
  }, [labels, headOfficeLabel]);

  return (
    <div ref={target} role="img" aria-label={ariaLabel} className="aspect-[4/3] w-full sm:aspect-[2/1]" />
  );
}
