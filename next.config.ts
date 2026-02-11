import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // remover
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hdnpkmnrnfkiuadpbeac.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ]
  }
};

export default nextConfig;
