import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Subfolder where your app is hosted
  //   basePath: "/prabinxfitness",
  // assetPrefix: "/prabinxfitness/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;