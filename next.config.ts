import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const statsSiteUrl = process.env.YGO_STATS_SITE_URL?.replace(/\/+$/, '');
    if (!statsSiteUrl) return [];

    return [
      {
        source: '/estadisticas/:path*',
        destination: `${statsSiteUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
