import { dataFlow } from "@/lib/content";
import { DataEcosystem } from "../visuals/DataEcosystem";
import { Reveal, MaskLines } from "../ui/Reveal";

export function DataFlow() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-28">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-6 md:mb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">05 / Data ecosystem</p>
            <MaskLines className="display t-h2" lines={[dataFlow.heading]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede max-w-md md:text-right">{dataFlow.lede}</p>
          </Reveal>
        </div>
      </div>

      <Reveal threshold={0.05}>
        <DataEcosystem className="h-[620px] w-full md:h-[660px] lg:h-[720px]" />
      </Reveal>

      <div className="container-x">
        <div className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <p className="mono text-[10px] text-faint">
            {dataFlow.inputs.length} source systems
          </p>
          <p className="mono text-[10px] text-faint sm:text-center">
            1 governed intelligence layer
          </p>
          <p className="mono text-[10px] text-signal sm:text-right">
            {dataFlow.outputs.length} things you can act on
          </p>
        </div>
      </div>
    </section>
  );
}
