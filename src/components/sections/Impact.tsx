import { impact, stats } from "@/lib/content";
import { Counter } from "../ui/Counter";
import { Reveal, MaskLines } from "../ui/Reveal";

export function Impact() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,255,74,.5), transparent)",
        }}
      />

      <div className="container-x">
        <p className="tag mb-8">10 / Impact</p>
        <MaskLines
          className="display t-h1 max-w-5xl"
          lines={[
            "Technology is only",
            "valuable when it",
            "moves the numbers.",
          ]}
        />

        <Reveal delay={0.2}>
          <p className="lede mt-8 max-w-2xl">{impact.lede}</p>
        </Reveal>

        {/* The numbers */}
        <div className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-b border-line py-8 lg:border-r lg:last:border-r-0 md:py-10"
            >
              <Counter
                to={s.value}
                suffix={s.suffix}
                className="display block text-[clamp(3rem,6.5vw,5.5rem)] leading-none text-signal"
              />
              <p className="mono mt-3 text-[10px] text-faint">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Mission & vision */}
        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          {[
            ["Our mission", impact.mission],
            ["Our vision", impact.vision],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.1}>
              <p className="tag mb-5">{k}</p>
              <p className="display text-[clamp(1.2rem,2.1vw,1.75rem)] leading-[1.3] text-fg/90">
                {v}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
