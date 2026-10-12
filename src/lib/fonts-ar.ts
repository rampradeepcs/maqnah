import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { mono } from "./fonts-mono";

/**
 * Arabic typefaces: Alexandria (a geometric Arabic display face that sits
 * naturally beside Urbanist) for titles, IBM Plex Sans Arabic for body copy.
 * Both include Latin glyphs for the brand name and acronyms.
 *
 * Not preloaded: Turbopack shares one font-preload list across both root
 * layouts, so preloading these would add ~200 KB of Arabic fonts to the
 * English page. On /ar they're fetched as soon as the stylesheet needs them
 * (display: swap shows the system Arabic face for that moment).
 */
const display = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: false,
});

const sans = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const fontsAr = `${display.variable} ${sans.variable} ${mono.variable}`;
