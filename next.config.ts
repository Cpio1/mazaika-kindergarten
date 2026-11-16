import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/kk", destination: "/", permanent: true }];
  },
  async rewrites() {
    return [{ source: "/", destination: "/kk" }];
  },
};

export default nextConfig;
