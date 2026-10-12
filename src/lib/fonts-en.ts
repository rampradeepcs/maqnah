import { Inter, Urbanist } from "next/font/google";
import { mono } from "./fonts-mono";

/**
 * English typefaces. Urbanist is the title face the brief asks for (a calm
 * geometric sans); Inter carries body copy. Imported by the English root
 * layout and the global 404.
 */
const display = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontsEn = `${display.variable} ${sans.variable} ${mono.variable}`;
