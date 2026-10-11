import {
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

/**
 * One place for every typeface. The serif carries the headlines; display,
 * sans and mono cover sub-heads, body copy and the cursor label.
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
