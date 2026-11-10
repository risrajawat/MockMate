
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration
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

  // Include FFmpeg and FFprobe binaries in the serverless function
  outputFileTracingIncludes: {
    "/api/voice/transcribe": [
      "./node_modules/ffmpeg-static/**/*",
      "./node_modules/ffprobe-static/**/*",
    ],
  },
};

export default nextConfig;
