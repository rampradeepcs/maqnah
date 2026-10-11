/**
 * Three abstract line graphics, one per service pillar, drawn on a faint
 * construction grid: stacked signal bars (foundations), a radiating burst
 * (intelligence) and nested discs settling into place (operations).
 * Ink with a single green accent, so colour still marks what is active.
 */
const INK = "#101512";
const GREEN = "#006c35";
const GUIDE = "rgba(16,21,18,0.12)";

function Guides() {
  return (
    <g stroke={GUIDE} strokeWidth={1} strokeDasharray="3 4">
      <path d="M20 20H300M20 180H300M20 20V180M300 20V180M20 20 300 180M300 20 20 180" />
    </g>
  );
}

function Bars() {
  const n = 25;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = 28 + i * 11;
        return <path key={`g${i}`} d={`M${x} 26V174`} stroke={GUIDE} strokeWidth={1} />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const x = 28 + i * 11;
        const wave = 0.5 + 0.5 * Math.sin((i / (n - 1)) * Math.PI * 4 - Math.PI / 2);
        const h = 16 + wave * 92;
        const accent = i === 6 || i === 18;
        return (
          <path
            key={`b${i}`}
            d={`M${x} ${100 - h / 2}V${100 + h / 2}`}
            stroke={accent ? GREEN : INK}
            strokeWidth={3.2}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Burst() {
  const cx = 160;
  const cy = 100;
  return (
    <g>
      <Guides />
      {[34, 58, 82].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} stroke={GUIDE} strokeDasharray="3 4" />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        const px = -uy;
        const py = ux;
        const r0 = 9;
        const r1 = 76;
        const w = 5.5;
        const d = `M${cx + ux * r0} ${cy + uy * r0} L${cx + ux * r1 + px * w} ${cy + uy * r1 + py * w} L${cx + ux * r1 - px * w} ${cy + uy * r1 - py * w} Z`;
        return <path key={i} d={d} fill={i === 1 ? GREEN : INK} />;
      })}
      <circle cx={cx} cy={cy} r={5} fill={GREEN} />
    </g>
  );
}

function Discs() {
  const discs = [
    { r: 78, c: "#eef0ee" },
    { r: 64, c: "#dfe2df" },
    { r: 51, c: "#c4c9c5" },
    { r: 39, c: "#a3a9a5" },
    { r: 28, c: "#7d847f" },
    { r: 18, c: GREEN },
  ];
  return (
    <g>
      <Guides />
      {discs.map((d, i) => (
        <circle key={d.r} cx={140 + i * 7} cy={94 + i * 4} r={d.r} fill={d.c} />
      ))}
    </g>
  );
}

const ART = { foundations: Bars, intelligence: Burst, operations: Discs } as const;

export function PillarArt({
  variant,
  className = "",
}: {
  variant: keyof typeof ART;
  className?: string;
}) {
  const Art = ART[variant];
  return (
    <svg viewBox="0 0 320 200" fill="none" aria-hidden className={className}>
      <Art />
    </svg>
  );
}
