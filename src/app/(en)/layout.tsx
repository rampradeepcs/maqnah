import type { Viewport } from "next";
import "../globals.css";
import { en } from "@/lib/i18n/en";
import { buildMetadata } from "@/lib/seo";
import { fontsEn } from "@/lib/fonts-en";
import { SiteShell } from "@/components/SiteShell";

export const metadata = buildMetadata(en);

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  colorScheme: "light",
};

/** Root layout for the English site at "/". */
export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteShell dict={en} fontClassName={fontsEn}>
      {children}
    </SiteShell>
  );
}
