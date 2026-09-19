import type { Metadata, Viewport } from "next";
import "../globals.css";
import { display, mono, sans, serif } from "@/lib/fonts";
import { DESCRIPTION } from "@/lib/seo";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { LightNav } from "@/components/light/LightNav";
import { LightFooter } from "@/components/light/LightFooter";

/* A comparison version: kept out of search so it never competes with "/". */
export const metadata: Metadata = {
  title: "Maqnah — AI & data consulting (light version)",
  description: DESCRIPTION,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  colorScheme: "light",
};

/**
 * Second root layout. `theme-light` on <html> re-points the design tokens,
 * so shared pieces (cursor, form, counters, logo) render in the light palette.
 */
export default function LightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`theme-light ${display.variable} ${sans.variable} ${mono.variable} ${serif.variable} h-full`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <LightNav />
        <main id="main">{children}</main>
        <LightFooter />
      </body>
    </html>
  );
}
