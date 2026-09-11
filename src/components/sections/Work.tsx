import { work } from "@/lib/content";
import { ParallaxImage } from "../ui/ParallaxImage";
import { Reveal, MaskLines } from "../ui/Reveal";

/**
 * Case studies laid out asymmetrically — the visual bleeds past the text
 * column and the metrics float over its edge, so no two rows sit on the same
 * rhythm.
 */
export function Work() {
  return (
    <section id="work" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">09 / Selected work</p>
            <MaskLines className="display t-h2" lines={["Intelligence in action."]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede max-w-sm md:text-right">
              Three engagements, three different problems — the same method
              underneath all of them.
            </p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-40">
          {work.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal
                as="article"
                key={item.num}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                threshold={0.08}
              >
                {/* Visual */}
                <div
                  className={`relative lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  <div
                    className="relative aspect-[3/2] overflow-hidden border border-line"
                    data-cursor="VIEW CASE STUDY"
                  >
                    <ParallaxImage
                      src={item.image}
                      alt={item.alt}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="absolute inset-0"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(7,9,12,.75) 0%, rgba(7,9,12,.1) 45%, rgba(7,9,12,.35) 100%)",
                      }}
                    />
                    <span className="display absolute left-5 top-4 text-[clamp(3rem,7vw,5.5rem)] leading-none text-fg/12">
                      {item.num}
                    </span>
                  </div>

                  {/* Metrics float over the image edge */}
                  <ul
                    className={`glass relative z-10 -mt-10 mr-5 ml-5 grid grid-cols-3 divide-x divide-line md:-mt-14 lg:absolute lg:bottom-8 lg:m-0 lg:w-[74%] ${
                      flip ? "lg:right-8" : "lg:-right-12"
                    }`}
                  >
                    {item.metrics.map((m) => (
                      <li key={m.label} className="px-2 py-4 text-center md:px-4 md:py-5">
                        <p className="display text-[clamp(1rem,3.6vw,1.9rem)] leading-tight text-signal">
                          {m.value}
                        </p>
                        <p className="mono mt-1.5 text-[8px] leading-[1.35] tracking-[0.1em] text-faint md:text-[9px] md:tracking-[0.18em]">
                          {m.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Narrative */}
                <div
                  className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1 lg:pr-6" : "lg:pl-6"}`}
                >
                  <p className="mono mb-4 text-[10px] text-signal">
                    {item.industry}
                  </p>
                  <h3 className="display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.05]">
                    {item.title}
                  </h3>
                  <p className="mono mt-3 text-[10px] text-faint">
                    {item.client}
                  </p>

                  <dl className="mt-8 space-y-5 border-t border-line pt-6">
                    {[
                      ["Problem", item.problem],
                      ["Approach", item.approach],
                      ["Solution", item.solution],
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1.5 sm:grid-cols-[86px_1fr] sm:gap-4">
                        <dt className="tag pt-0.5">{k}</dt>
                        <dd className="text-[14px] leading-relaxed text-muted">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
