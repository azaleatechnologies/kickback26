import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle in .next/standalone so the Docker image
  // can run with just node + the bundle (no node_modules in the final layer).
  output: "standalone",
  // Make sure the generated Prisma client + its query-engine binary get traced
  // into the standalone output (otherwise DB calls fail at runtime in Docker).
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*"],
  },
};

export default nextConfig;
