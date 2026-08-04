import { PageHero } from "./Section";

/** Shared layout for legal pages (privacy policy, terms & conditions). */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} intro={`Last updated: ${updated}`} />
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line py-8 first:pt-0 last:border-0">
      <h2 className="flex items-baseline gap-4 font-display text-xl font-semibold text-fg md:text-2xl">
        <span className="text-sm font-semibold text-brand">{number}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-fg [&_a]:font-medium [&_a]:text-brand">
        {children}
      </div>
    </div>
  );
}
