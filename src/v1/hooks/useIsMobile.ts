"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [n, setN] = useState(false);
  useEffect(() => {
    const r = window.matchMedia("(max-width: 768px)");
    const o = () => setN(r.matches);
    o();
    r.addEventListener("change", o);
    return () => r.removeEventListener("change", o);
  }, []);
  return n;
}
