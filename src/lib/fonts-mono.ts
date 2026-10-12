import { JetBrains_Mono } from "next/font/google";

// Only the desktop cursor label uses it (semibold), so it isn't preloaded.
export const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
});
