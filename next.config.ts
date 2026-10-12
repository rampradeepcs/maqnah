import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /* No optimisation service (and no transformation quota): the custom
     loader picks from widths pre-exported in public/img, so `sizes` props
     yield real srcsets. Card and hero images go up to about 2x their
     desktop slots; the full-bleed strip and night sky are single files
     (marked `unoptimized`) because cover-cropping makes them render wider
     than the viewport on phones. */
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // The widths that exist across the ladders in src/lib/image-loader.ts.
    deviceSizes: [480, 600, 800, 960, 1200, 1600],
    imageSizes: [],
  },
  /* Two root layouts (English, Arabic) leave no single layout for a 404,
     so unmatched URLs get src/app/global-not-found.tsx. */
  experimental: { globalNotFound: true },
  /* The light version used to live at /light; keep shared links working. */
  async redirects() {
    return [{ source: "/light", destination: "/", permanent: true }];
  },
};

export default nextConfig;
