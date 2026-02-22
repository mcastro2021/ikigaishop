import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Esto permite que FastAPI sirva la web
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  // Nota: rewrites solo funciona en 'next dev', no en 'next export'
  // Pero ayuda mucho durante el desarrollo
};

export default nextConfig;
