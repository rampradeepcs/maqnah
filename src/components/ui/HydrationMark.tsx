"use client";

import { useEffect } from "react";

/**
 * Marks <html> once the app has hydrated, which switches off the CSS safety
 * net that reveals content when JavaScript fails to load (see `settle` in
 * globals.css).
 */
export function HydrationMark() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
