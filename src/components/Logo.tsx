/** Nachi Tekneka logo — red "NT" mark (from brand asset) + adaptive wordmark. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 31 32" className={className} fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.95307H30.1261V6.02342H23.1027H19.3741V27.2428L23.0065 27.1491L23.0858 9.5797L30.1261 9.60911V31.3104H0V11.4893L17.9465 27.2428V6.02342H14.2178V18.5844L0 5.89843V1.95307Z"
        fill="#ED3237"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-auto shrink-0" />
      {wordmark && (
        <span className="font-display text-[1.15rem] font-semibold tracking-tight leading-none">
          <span className="text-current">nachi</span>{" "}
          <span className="text-current/80">tekneka</span>
          <sup className="ml-0.5 text-[0.72em] align-super text-brand">™</sup>
        </span>
      )}
    </span>
  );
}
