"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Riyadh",
});

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};
const now = () => fmt.format(new Date());
const server = () => "";

/** Local time in Riyadh — the small detail that says where the team sits. */
export function Clock({ className = "" }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, now, server);
  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time || "--:-- --"} AST
    </span>
  );
}
