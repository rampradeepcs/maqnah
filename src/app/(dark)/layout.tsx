import type { Viewport } from "next";
import "../globals.css";
import { display, mono, sans } from "@/lib/fonts";
import { jsonLd, metadata as seo } from "@/lib/seo";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";

export const metadata = seo;

export const viewport: Viewport = {
  themeColor: "#07090C",
  colorScheme: "dark",
};

/**
 * Root layout for the dark version (the production home at "/").
 * A second root layout under /light serves the light version, so each
 * owns its own <html> and <body> — no runtime theme switching.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-void"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
