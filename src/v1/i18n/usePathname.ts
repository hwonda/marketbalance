"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { stripLocale } from "./config";

/** Current path without the locale prefix, so `/en/about` compares equal to `/about`. */
export function usePathname() {
  return stripLocale(useNextPathname());
}
