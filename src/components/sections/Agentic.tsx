import { agentic } from "@/lib/content";
import { Counter } from "../ui/Counter";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Straight under the banner, the outcomes that back it up: one solid green
 * band, no imagery, and the three metrics laid out in a single row —
 * large light numerals divided by hairlines.
 */
export function Agentic() {
  return (
    <section
      id="agentic"
      className="noise relative overflow-hidden bg-signal text-white"
    >
      <div className="container-x relative py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal>
              <span className="pill-outline border-white/40 text-white">
                {agentic.pill}
              </span>
            </Reveal>
            <MaskLines
              className="display t-h2 mt-7 font-light"
              lines={[agentic.heading]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="lede max-w-[46ch] text-white/80">{agentic.line}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-white/25 md:mt-20 md:grid-cols-3">
          {agentic.metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={0.08 * i}
              className={`py-9 md:px-10 md:pb-2 md:pt-12 ${
                i > 0
                  ? "border-t border-white/25 md:border-l md:border-t-0"
                  : "md:pl-0"
              }`}
            >
              <p className="label text-white/70">{m.prefix}</p>
              <p className="display t-num mt-3 font-light">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-4 text-[16px] text-white/85">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
