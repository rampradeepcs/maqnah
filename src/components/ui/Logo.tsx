/**
 * Maqnah's mark — five stepped blades, traced from the brand's own logo
 * artwork so the geometry is the real thing rather than an approximation.
 * Each blade is its own path, which lets them stagger in independently.
 */
export const BLADES = [
  "M4 37 L146 1 L173 3 L202.5 26.5 L0 73 Z",
  "M28 140 L94.5 116.5 L83 94 L264 46 L282 48 L320.5 79.5 L31 148 Z",
  "M79 206 L177 179 L166.5 157.5 L688.5 31.5 L635.5 99.5 L616 113 L79 219 Z",
  "M150 274 L274 244 L263.5 221.5 L599.5 159.5 L575.5 215.5 L562 224 L150 283 Z",
  "M228 334 L361 314 L351 288 L558.5 267.5 L546.5 314.5 L537 323 L225 340.5 Z",
];

export function LogoMark({
  className = "",
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 689 341"
      className={className}
      role="img"
      aria-label="Maqnah"
      fill="none"
    >
      <defs>
        <linearGradient id="mq-blade" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.42" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      {BLADES.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="url(#mq-blade)"
          style={
            animate
              ? {
                  opacity: 0,
                  animation: `blade-in .9s cubic-bezier(.16,1,.3,1) ${0.08 * i + 0.15}s forwards`,
                }
              : undefined
          }
        />
      ))}
      {animate && (
        <style>{`@keyframes blade-in{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}`}</style>
      )}
    </svg>
  );
}

/** Mark + wordmark lock-up for the navigation and footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[18px] w-auto text-signal" />
      <span className="display text-[19px] font-semibold tracking-[-0.02em] text-fg">
        MAQNAH
      </span>
    </span>
  );
}
