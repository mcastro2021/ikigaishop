import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Esto permite que FastAPI sirva la web
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
};

export default nextConfig;
