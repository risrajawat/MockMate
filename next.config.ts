import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Top-level Turbopack configuration (required for Next 16)
  turbopack: {
    root: process.cwd(),
  },

  // Allow external profile images from Google
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;