import type { Viewport } from "next";
import "./globals.css";
import { display, mono, sans, serif } from "@/lib/fonts";
import { jsonLd, metadata as seo } from "@/lib/seo";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { LightNav } from "@/components/light/LightNav";
import { LightFooter } from "@/components/light/LightFooter";

export const metadata = seo;

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable} h-full`}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
