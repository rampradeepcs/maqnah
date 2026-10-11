import Image from "next/image";

/**
 * The official Maqnah lock-up — mark and wordmark exactly as supplied in the
 * brand brief (public/brand). `tone="white"` reverses it for dark grounds
 * with a filter, so the source artwork is never redrawn.
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
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/maqnah-mark.svg"
        width={68}
        height={32}
        alt=""
        priority
        className={`h-[26px] w-auto sm:h-8 ${reverse}`}
      />
      <Image
        src="/brand/maqnah-wordmark.svg"
        width={141}
        height={36}
        alt="Maqnah"
        priority
        className={`h-[29px] w-auto sm:h-9 ${reverse}`}
      />
    </span>
  );
}
