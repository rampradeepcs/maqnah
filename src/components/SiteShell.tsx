import type { Dictionary } from "@/lib/i18n";
import { buildJsonLd } from "@/lib/seo";
import { SmoothScroll } from "./ui/SmoothScroll";
import { Cursor } from "./ui/Cursor";
import { HydrationMark } from "./ui/HydrationMark";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * The <html> document both root layouts render: English at "/" and Arabic
 * at "/ar". Language and direction come from the dictionary and fonts from
 * the layout, so each page is a complete, indexable document in its own
 * language that preloads only its own typefaces.
 */
export function SiteShell({
  dict,
  fontClassName,
  children,
}: {
  dict: Dictionary;
  /** Font variables from the layout's own font module (fonts-en / fonts-ar) */
  fontClassName: string;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={dict.lang}
      dir={dict.dir}
      suppressHydrationWarning
      className={`${fontClassName} h-full`}
    >
      <body className="min-h-full">
        <HydrationMark />
        <SmoothScroll />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.ui.skipToContent}
        </a>
        <Nav nav={dict.nav} ui={dict.ui} />
        <main id="main">{children}</main>
        <Footer dict={dict} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(dict)) }}
        />
      </body>
    </html>
  );
}
