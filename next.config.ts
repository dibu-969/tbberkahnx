import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Menonaktifkan Source Maps di sisi browser.
  // Ini sering menjadi solusi cepat untuk Source Map Error yang persisten
  // di Next.js 13/14, terutama saat menggunakan Turbopack.
  productionBrowserSourceMaps: false,
};

export default nextConfig;