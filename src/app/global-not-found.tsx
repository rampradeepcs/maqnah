import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontsEn } from "@/lib/fonts-en";
import { Logo } from "@/components/ui/Logo";

/**
 * The 404 for URLs no route matches. With two root layouts (English and
 * Arabic) there is no single layout to build one from, so this is its own
 * small document, in both languages, pointing back to each home page.
 */
export const metadata: Metadata = {
  title: "404 — Page not found · Maqnah",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={`${fontsEn} h-full`}>
      <body className="hairline-grid grid min-h-full place-items-center px-5 py-16">
        <main className="w-full max-w-xl">
          <Link href="/" aria-label="Maqnah">
            <Logo />
          </Link>
          <p className="label eyebrow mt-14">404</p>
          <h1 className="display t-h2 mt-4 text-fg">This page doesn&apos;t exist.</h1>
          <p className="lede mt-4 text-muted">
            The link may be old, or the address mistyped.
          </p>
          <Link href="/" className="btn btn-dark mt-8">
            Back to Maqnah
          </Link>

          <div lang="ar" dir="rtl" className="mt-14 border-t border-line pt-10">
            <h2 className="display t-h3 text-fg">هذه الصفحة غير موجودة.</h2>
            <p className="mt-3 text-muted">ربما يكون الرابط قديمًا أو العنوان غير صحيح.</p>
            <Link href="/ar" hrefLang="ar" className="btn btn-ghost mt-6">
              العودة إلى Maqnah
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
