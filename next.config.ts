import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Top‑level Turbopack configuration (required for Next 16)
  // The `root` points to the project directory so Turbopack can locate the Next.js package.
  turbopack: {
    root: process.cwd(),
  },
  // (any other existing config can be added here in the future)
};

export default nextConfig;

