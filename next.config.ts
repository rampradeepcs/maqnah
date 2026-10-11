import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /* Serve images as-is: every asset in public/img is pre-sized for its
     largest (retina) slot and compressed (about 2.2 MB for the page), so
     there is no transformation quota to run into. The `sizes` props are
     kept so switching the optimizer on later yields correct srcsets. */
  images: { unoptimized: true },
  /* The light version used to live at /light; keep shared links working. */
  async redirects() {
    return [{ source: "/light", destination: "/", permanent: true }];
  },
};

export default nextConfig;
