import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";

const display = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const DESCRIPTION =
  "Maqnah is an AI, data and digital transformation consulting partner. We turn enterprise data into intelligence — strategy, machine learning, automation and platforms built for real business impact.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Maqnah — Turn Data Into Intelligence",
    template: "%s · Maqnah",
  },
  description: DESCRIPTION,
  keywords: [
    "AI consulting Saudi Arabia",
    "data intelligence",
    "enterprise AI strategy",
    "predictive analytics",
    "generative AI consulting",
    "intelligent automation",
    "digital transformation",
    "data engineering",
    "AI agents",
    "Maqnah",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Maqnah — Turn Data Into Intelligence",
    description: DESCRIPTION,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: DESCRIPTION }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maqnah — Turn Data Into Intelligence",
    description: DESCRIPTION,
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090C",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: "Turning complexity into intelligence.",
  email: site.email,
  foundingLocation: site.location,
  areaServed: "Worldwide",
  description: DESCRIPTION,
  knowsAbout: [
    "Artificial Intelligence",
    "Data Engineering",
    "Predictive Analytics",
    "Intelligent Automation",
    "Digital Transformation",
  ],
  address: { "@type": "PostalAddress", addressCountry: "SA" },
};

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
