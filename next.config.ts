import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  distDir: "out",
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Static optimization
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
