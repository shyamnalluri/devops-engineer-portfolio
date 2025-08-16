import { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === "production" ? "/devops-engineer-portfolio" : "", // Repository name for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
    loader: 'default',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

const analyze = process.env.ANALYZE === 'true';
const withAnalyzer = withBundleAnalyzer({ enabled: analyze });

export default withAnalyzer(nextConfig);
