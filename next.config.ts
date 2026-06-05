import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle in .next/standalone so the Docker image
  // can run with just node + the bundle (no node_modules in the final layer).
  output: "standalone",
};

export default nextConfig;
