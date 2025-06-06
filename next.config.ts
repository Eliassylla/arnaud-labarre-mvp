import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    // Disable file system caching in development
    if (dev) {
      config.cache = {
        type: 'memory'
      };
    }
    return config;
  },
};

export default nextConfig;
