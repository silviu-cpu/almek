import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exista un package-lock.json in directorul parinte, in afara repo-ului;
  // fara asta Turbopack avertizeaza si poate alege gresit radacina.
  // `__dirname` nu exista in ESM; `import.meta.dirname` este echivalentul.
  turbopack: { root: import.meta.dirname },

  // Containerul de productie ruleaza serverul minimal scos de Next, nu tot
  // node_modules — vezi planul de hosting pe Elastic Beanstalk.
  output: "standalone",

  images: {
    // Media incarcata din CMS este servita de S3; fara asta `next/image` refuza
    // sa optimizeze imagini din alt domeniu.
    remotePatterns: process.env.S3_BUCKET
      ? [
          {
            protocol: "https",
            hostname: `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`,
          },
        ]
      : [],
  },
};

export default withPayload(nextConfig);
