import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /* Serve images as-is: every asset in public/img is already exported at its
     display size (1.9 MB in total), so there is nothing for the optimizer to
     win and no transformation quota to run into. */
  images: { unoptimized: true },
  /* The light version used to live at /light; keep shared links working. */
  async redirects() {
    return [{ source: "/light", destination: "/", permanent: true }];
  },
};

export default nextConfig;
