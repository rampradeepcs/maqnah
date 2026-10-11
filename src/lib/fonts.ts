import { Inter, JetBrains_Mono, Urbanist } from "next/font/google";

/**
 * One place for every typeface. Urbanist is the title face the brief asks
 * for (a calm geometric sans); Inter carries body copy and JetBrains Mono
 * the cursor label.
 */
export const display = Urbanist({
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
