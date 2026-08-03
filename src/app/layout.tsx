import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NoRightClick } from "@/components/NoRightClick";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Splash } from "@/components/Splash";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://www.nachitekneka.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Nachi Tekneka — A Solution Provider for the Spinning Industry",
    template: "%s · Nachi Tekneka",
  },
  description:
    "Nachi Tekneka delivers OEM-level spare parts, Nachi SpinLyfeX™ retrofit systems and onsite technical services for the spinning industry — from blowroom to ring frame. ISO 9001:2015 certified.",
  keywords: [
    "spinning industry spare parts",
    "Nachi Tekneka",
    "SpinLyfeX retrofit",
    "servo upgrade RSB",
    "carding auto leveler",
    "draw frame parts",
    "comber parts",
    "ring frame spares",
    "textile machinery retrofit",
    "Rieter spare parts",
  ],
  authors: [{ name: "Nachi Tekneka" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "Nachi Tekneka — A Solution Provider for the Spinning Industry",
    description:
      "OEM-level spare parts, SpinLyfeX™ retrofits and onsite technical services for spinning mills worldwide. ISO 9001:2015 certified.",
    siteName: "Nachi Tekneka",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nachi Tekneka — Spinning Industry Solutions",
    description:
      "OEM-level spare parts, SpinLyfeX™ retrofits and onsite technical services for spinning mills worldwide.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nachi Tekneka",
  url: SITE,
  slogan: "A Solution Provider for the Spinning Industry",
  email: "info@nachitekneka.com",
  telephone: "+91 422 267 0091",
  foundingLocation: "Coimbatore, India",
  areaServed: ["India", "United States", "Mexico", "Worldwide"],
  hasCredential: "ISO 9001:2015",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Splash />
        <SmoothScroll />
        <NoRightClick />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
