import type { IconName } from "@/lib/content";

/**
 * One family of thin line icons (24-unit grid, 1.6 stroke) so every glyph on
 * the page reads as the same hand: strengths, pillars, form, footer.
 */
type Name =
  | IconName
  | "layers"
  | "spark"
  | "chart"
  | "shield"
  | "nodes"
  | "check"
  | "phone"
  | "mail"
  | "camera"
  | "user"
  | "linkedin"
  | "x"
  | "menu"
  | "close"
  | "arrow-right"
  | "arrow-down";

const PATHS: Record<Name, React.ReactNode> = {
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z" />
      <path d="M18.5 15.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-4M12 16V8M17 16v-7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.9 7 9.5 4.1-1.6 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  nodes: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="m8 7 8 .5M7.2 7.9l3.8 8.3M16.9 9l-3.9 7.1" />
    </>
  ),
  domain: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  scale: (
    <>
      <path d="M4 20V9l5-3v14M9 20V4l6 3v13M15 20V10l5 2.5V20" />
      <path d="M3 20h18" />
    </>
  ),
  integration: (
    <>
      <path d="M9 7V3M15 7V3" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" />
      <path d="M12 17v4" />
    </>
  ),
  design: (
    <>
      <path d="m12 3 6 6-6 12-6-12 6-6Z" />
      <circle cx="12" cy="11.5" r="1.6" />
      <path d="M12 13.1V21" />
    </>
  ),
  local: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  foundations: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  intelligence: (
    <>
      <path d="M12 2.5c.7 4.6 2.4 6.3 7 7-4.6.7-6.3 2.4-7 7-.7-4.6-2.4-6.3-7-7 4.6-.7 6.3-2.4 7-7Z" />
      <path d="M5 18.5h.01M19 18.5h.01M12 21.5h.01" />
    </>
  ),
  operations: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.7 2.7L16.2 9.4" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.9 20 4 13.1 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.8-2.5h6.4L17 8h3v11H4V8Z" />
      <circle cx="12" cy="13.3" r="3.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.4-2.5S16 11.5 16 13v3" />
    </>
  ),
  x: <path d="M4.5 4h4.2l10.8 16h-4.2L4.5 4ZM19 4l-6.1 7M5 20l6.1-7" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "arrow-right": <path d="M5 12h14m-5-5 5 5-5 5" />,
  "arrow-down": <path d="M12 5v14m-5-5 5 5 5-5" />,
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: Name;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
