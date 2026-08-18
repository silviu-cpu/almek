import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exista un package-lock.json in directorul parinte, in afara repo-ului;
  // fara asta Turbopack avertizeaza si poate alege gresit radacina.
  turbopack: { root: __dirname },
  /* config options here */
};

export default nextConfig;
