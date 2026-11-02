import type { HeadlineGraphic as Name } from "@/lib/i18n";

/**
 * The two small colour graphics set into the banner headline, in the spirit
 * of the brief's reference (a gold padlock and a blue "AI" tile): glossy,
 * emoji-like and colourful against the ink type. "data" is a stack of
 * platform layers in amber, blue and indigo; "ai" is a blue tile with a
 * spark. Each appears once per page, so the gradient ids can be fixed.
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

function AiTile({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="hg-ai" x1="8" y1="10" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7aa6ff" />
          <stop offset="1" stopColor="#2e5cf0" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="32" height="32" rx="9" fill="url(#hg-ai)" />
      <rect
        x="6.6"
        y="10.6"
        width="30.8"
        height="30.8"
        rx="8.4"
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.35}
        strokeWidth={1.2}
      />
      {/* "AI", drawn as strokes so it never depends on a loaded font */}
      <g stroke="#ffffff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M13.5 33.5L18.5 18.5L23.5 33.5M15.3 28.4H21.7" />
        <path d="M29.5 18.5V33.5" />
      </g>
      {/* The spark, breaking the tile's corner */}
      <path
        d="M39 3.5C39.6 7.4 40.6 8.4 44.5 9C40.6 9.6 39.6 10.6 39 14.5C38.4 10.6 37.4 9.6 33.5 9C37.4 8.4 38.4 7.4 39 3.5Z"
        fill="#ffc94a"
        stroke="#ffffff"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
