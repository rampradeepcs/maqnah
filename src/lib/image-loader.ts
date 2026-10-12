"use client";

/**
 * Static image loader: no optimisation service, just pre-exported widths.
 *
 * Each ladder lists the widths that exist in public/img (the largest is the
 * original file; smaller ones carry a `-<width>` suffix). For a requested
 * width the loader returns the smallest file that covers it, so the `sizes`
 * props produce real srcsets and phones skip the desktop files. Anything not
 * listed is served as-is.
 */
const LADDERS: [RegExp, number[]][] = [
  [/^\/img\/hero-lens\.jpg$/, [800, 1200, 1600]],
  [/^\/img\/work-[a-z-]+\.jpg$/, [600, 1200]],
  [/^\/img\/industry-[a-z-]+\.jpg$/, [480, 960]],
];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const ladder = LADDERS.find(([pattern]) => pattern.test(src))?.[1];
  if (!ladder) return src;
  const largest = ladder[ladder.length - 1];
  const pick = ladder.find((w) => w >= width) ?? largest;
  return pick === largest ? src : src.replace(/\.jpg$/, `-${pick}.jpg`);
}
