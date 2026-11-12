"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Fired by in-app links so pages re-check `location.hash` even when the route does not change. */
export const HASH_NAV_EVENT = "app:hashnav";

export function notifyHashNav() {
  window.dispatchEvent(new Event(HASH_NAV_EVENT));
}

type Options = {
  /** Pixels added to the target's top (negative to clear the fixed header). */
  offset: number;
  /** Wait for the page to lay out before scrolling. */
  delay?: number;
  /** Scroll back to the top when the URL carries no hash. */
  resetWhenEmpty?: boolean;
};

/** Smooth-scrolls to the element named by the URL hash, leaving room for the fixed header. */
export function useHashScroll({ offset, delay = 100, resetWhenEmpty = false }: Options) {
  const pathname = usePathname();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    window.addEventListener("hashchange", bump);
    window.addEventListener(HASH_NAV_EVENT, bump);
    return () => {
      window.removeEventListener("hashchange", bump);
      window.removeEventListener(HASH_NAV_EVENT, bump);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!id) {
        if (resetWhenEmpty) window.scrollTo(0, 0);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + offset,
          behavior: "smooth",
        });
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [pathname, tick, offset, delay, resetWhenEmpty]);
}
