import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Modo estrito para melhor depuração
  images: {
    domains: ["cdn-icons-png.flaticon.com", 'laisschulz.com',"encrypted-tbn0.gstatic.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0", // Evita cache no navegador para refletir mudanças imediatamente
          },
        ],
      },
    ];
  },
};

export default nextConfig;
