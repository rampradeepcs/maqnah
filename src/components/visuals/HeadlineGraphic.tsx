import type { HeadlineGraphic as Name } from "@/lib/i18n";

/**
 * The two small colour graphics set into the banner headline, in the spirit
 * of the brief's reference (a gold padlock and a blue "AI" tile): glossy,
 * emoji-like and colourful against the ink type. "data" is a stack of
 * platform layers in amber, blue and indigo; "ai" is two sparkles and the
 * letters in a pink-to-violet gradient, drawn edge to edge on its white
 * chip. Each appears once per page, so the gradient ids can be fixed.
 */
export function HeadlineGraphic({ name, className = "" }: { name: Name; className?: string }) {
  return name === "data" ? <DataStack className={className} /> : <AiTile className={className} />;
}

/** One isometric slab: a lit top face over a darker edge. */
function Slab({ y, face, edge }: { y: number; face: string; edge: string }) {
  return (
    <g>
      <path d={`M7 ${y}L24 ${y + 8.5}L41 ${y}V${y + 3.2}L24 ${y + 11.7}L7 ${y + 3.2}Z`} fill={edge} />
      <path d={`M24 ${y - 8.5}L41 ${y}L24 ${y + 8.5}L7 ${y}Z`} fill={face} />
      <path
        d={`M24 ${y - 8.5}L41 ${y}`}
        stroke="#ffffff"
        strokeOpacity={0.55}
        strokeWidth={0.9}
        strokeLinecap="round"
      />
    </g>
  );
}

function DataStack({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="hg-amber" x1="10" y1="6" x2="38" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="1" stopColor="#f29a1f" />
        </linearGradient>
        <linearGradient id="hg-sky" x1="10" y1="15" x2="38" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9dbcff" />
          <stop offset="1" stopColor="#4a7dff" />
        </linearGradient>
        <linearGradient id="hg-indigo" x1="10" y1="24" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8a85e3" />
          <stop offset="1" stopColor="#3d3887" />
        </linearGradient>
      </defs>
      <Slab y={33} face="url(#hg-indigo)" edge="#2b2769" />
      <Slab y={24} face="url(#hg-sky)" edge="#2f5bd6" />
      <Slab y={15} face="url(#hg-amber)" edge="#c97a14" />
    </svg>
  );
}

/** A four-point sparkle: concave sides meeting in sharp tips. */
function sparkle(x: number, y: number, r: number) {
  const k = 0.29 * r;
  return `M${x} ${y - r}Q${x + k} ${y - k} ${x + r} ${y}Q${x + k} ${y + k} ${x} ${y + r}Q${x - k} ${y + k} ${x - r} ${y}Q${x - k} ${y - k} ${x} ${y - r}Z`;
}

/** The sparkles and letters in one paint, so the shadow can repeat them. */
function AiMark({ paint }: { paint: string }) {
  return (
    <g fill={paint} stroke={paint} strokeLinecap="round" strokeLinejoin="round">
      <path d={sparkle(15.2, 21.7, 8.2)} stroke="none" />
      <path d={sparkle(25.9, 10.5, 4.3)} stroke="none" />
      {/* "AI", drawn as strokes so it never depends on a loaded font */}
      <g fill="none">
        <path d="M21.1 40.2L27 26.4L32.9 40.2" strokeWidth={3.3} />
        <path d="M22.9 36.3H31.1" strokeWidth={2.6} strokeLinecap="butt" />
        <path d="M39.2 26.4V40.2" strokeWidth={3.5} />
      </g>
    </g>
  );
}

function AiTile({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="hg-ai" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6bd9" />
          <stop offset="0.5" stopColor="#7a5efb" />
          <stop offset="1" stopColor="#6304d2" />
        </linearGradient>
      </defs>
      {/* A flat shadow, set just below and right of every shape */}
      <g opacity={0.1} transform="translate(0.25 0.9)">
        <AiMark paint="#13141b" />
      </g>
      <AiMark paint="url(#hg-ai)" />
    </svg>
  );
}
