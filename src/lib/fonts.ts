import { Inter, JetBrains_Mono, Urbanist } from "next/font/google";

/**
 * One place for every typeface. Urbanist is the title face the brief asks
 * for (a calm geometric sans); Inter carries body copy and JetBrains Mono
 * the cursor label.
 */
export const display = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Only the desktop cursor label uses it (semibold), so it isn't preloaded.
export const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
});
