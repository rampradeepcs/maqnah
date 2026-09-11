"use client";

import Image from "next/image";
import { useScrollProgress } from "./scroll";
import { REDUCED_MOTION, useMediaQuery } from "./useMediaQuery";

/**
 * An image that drifts inside its frame as the frame crosses the viewport.
 * The movement is small on purpose — enough to give the section depth,
 * not enough to notice as an effect.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  /** Pixels of travel across the full pass. */
  range = 40,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  range?: number;
  className?: string;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>("pass");
  const reduced = useMediaQuery(REDUCED_MOTION);
  const shift = reduced ? 0 : (progress - 0.5) * -range * 2;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="relative h-full w-full"
        style={{
          transform: `translate3d(0, ${shift}px, 0) scale(1.12)`,
          willChange: "transform",
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
