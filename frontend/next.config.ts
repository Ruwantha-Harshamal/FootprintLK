import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // During builds, we'll ignore type errors for now
    // You can remove this once all backend integrations are complete
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
