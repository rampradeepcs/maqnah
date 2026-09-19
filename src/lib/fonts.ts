import {
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

/**
 * One place for every typeface, shared by both root layouts.
 * The dark version uses display/sans/mono; the light version adds the serif.
 */
export const display = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
