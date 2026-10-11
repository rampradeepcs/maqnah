import Image from "next/image";

/**
 * The official Maqnah lock-up from the brand brief (public/brand), with the
 * mark's blades recoloured from indigo to the site's Saudi green.
 * `tone="white"` reverses it for dark grounds with a filter, so the source
 * artwork is never redrawn.
 *
 * Geometry follows the brief's lock-up (mark 68×32, wordmark 141×36, mark
 * set 4.2 units above the wordmark so its blades centre on the capitals,
 * 11.7 units apart), drawn at 85% (72% on phones). The 2px nudge centres
 * the letters, not the box that includes the "q" descender.
 */
export function Logo({
  className = "",
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "white";
}) {
  const reverse = tone === "white" ? "brightness-0 invert" : "";
  return (
    <span
      className={`inline-flex translate-y-[2px] items-start gap-[8.5px] sm:gap-[10px] ${className}`}
    >
      <Image
        src="/brand/maqnah-mark.svg"
        width={68}
        height={32}
        alt=""
        priority
        className={`h-[23px] w-auto sm:h-[27px] ${reverse}`}
      />
      <Image
        src="/brand/maqnah-wordmark.svg"
        width={141}
        height={36}
        alt="Maqnah"
        priority
        className={`mt-[3px] h-[26px] w-auto sm:mt-[3.6px] sm:h-[30.5px] ${reverse}`}
      />
    </span>
  );
}
