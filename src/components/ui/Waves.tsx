"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/** Width of one drawn strip in viewBox units; the path is twice this so sliding by half loops seamlessly. */
const TILE = 1440;
const HEIGHT = 120;

/** A filled band whose top edge is a repeating wave. `period` must divide TILE so the loop has no seam. */
function wavePath(period: number, amplitude: number, baseline: number) {
  let d = `M0 ${baseline}`;
  for (let x = 0; x < TILE * 2; x += period) {
    d += ` C${x + period / 4} ${baseline - amplitude}, ${x + (period * 3) / 4} ${baseline + amplitude}, ${x + period} ${baseline}`;
  }
  return `${d} L${TILE * 2} ${HEIGHT} L0 ${HEIGHT} Z`;
}

const LAYERS = [
  { period: 1440, amplitude: 22, baseline: 54, fill: "rgba(0, 120, 192, 0.18)", duration: 26, reverse: true },
  { period: 720, amplitude: 14, baseline: 70, fill: "rgba(0, 120, 192, 0.38)", duration: 18, reverse: false },
  { period: 480, amplitude: 9, baseline: 88, fill: "#004870", duration: 12, reverse: true },
];

/**
 * Slow sea swell used where the white page meets the deep-blue band.
 * The front layer matches `bg-blue-deep`, so the section below continues it without a seam.
 * Motion follows the reader's reduced-motion setting through the surrounding MotionConfig.
 */
export default function Waves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-16 overflow-hidden md:h-28", className)}>
      {LAYERS.map((layer) => (
        <motion.svg
          key={layer.period}
          viewBox={`0 0 ${TILE * 2} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-0 h-full w-[200%]"
          initial={{ x: layer.reverse ? "-50%" : "0%" }}
          animate={{ x: layer.reverse ? "0%" : "-50%" }}
          transition={{ duration: layer.duration, ease: "linear", repeat: Infinity }}
        >
          <path d={wavePath(layer.period, layer.amplitude, layer.baseline)} fill={layer.fill} />
        </motion.svg>
      ))}
    </div>
  );
}
