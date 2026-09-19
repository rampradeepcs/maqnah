import { light } from "@/lib/content-light";
import { MaskLines, Reveal } from "../ui/Reveal";
import { Hi } from "./Keyword";

const ICONS: Record<string, React.ReactNode> = {
  graph: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="6" cy="6" r="2.5" />
      <path d="M8.2 7.2l7.6 9.6M8.5 18h7M6 8.5v7M18 8.5v7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2.2 5.3-5.3 2.2 2.2-5.3z" />
    </>
  ),
  loop: (
    <>
      <path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.6 5.7L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 12.5l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
};

export function LightCapabilities() {
  const { capabilities } = light;
  return (
    <section
      id="capabilities"
      className="container-x border-t border-line py-24 md:py-36"
    >
      <MaskLines className="serif t-l-h2 text-fg" lines={capabilities.heading} />

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {capabilities.items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div
              className={`tile-${c.tone} flex h-24 w-24 items-center justify-center text-signal`}
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[c.icon]}
              </svg>
            </div>
            <h3 className="serif t-l-h3 mt-8 text-fg">
              <Hi>{c.title}</Hi>
            </h3>
            <p className="t-l-body mt-3 max-w-xs text-muted">
              <Hi>{c.line}</Hi>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
