
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  outputFileTracingIncludes: {
  "/api/voice/transcribe": [
    "./node_modules/@ffmpeg-installer/linux-x64/ffmpeg",
  ],
},
};

export default nextConfig;
