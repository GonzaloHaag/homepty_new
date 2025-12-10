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
      }
    ]
  }
};

export default nextConfig;
