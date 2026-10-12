import type { Viewport } from "next";
import "../globals.css";
import { ar } from "@/lib/i18n/ar";
import { buildMetadata } from "@/lib/seo";
import { fontsAr } from "@/lib/fonts-ar";
import { SiteShell } from "@/components/SiteShell";

export const metadata = buildMetadata(ar);

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  colorScheme: "light",
};

/** Root layout for the Arabic (RTL) site at "/ar". */
export default function ArabicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteShell dict={ar} fontClassName={fontsAr}>
      {children}
    </SiteShell>
  );
}
