import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Articles } from "./collections/Articles";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * S3 se activeaza DOAR daca exista configuratia. Fara ea, Payload scrie in
 * `public/media`, deci dezvoltarea locala nu cere credentiale AWS si nu risca
 * sa incarce fisiere de test in bucketul de productie.
 */
const s3Configured = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_REGION &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },

  collections: [Articles, Products, Projects, Media, Users],

  editor: lexicalEditor(),

  /* Semneaza sesiunile din admin. Fara el nimeni nu se poate autentifica, deci
     esuam din pornire in loc sa mergem cu o valoare implicita nesigura. */
  secret: process.env.PAYLOAD_SECRET || "",

  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    /* In productie schema se schimba doar prin migrari comise, ca sa existe
       urma in istoric. Local se poate impinge direct, ca sa nu generam o
       migrare la fiecare ajustare de camp. */
    push: process.env.NODE_ENV !== "production",
  }),

  /* `sharp` este necesar pentru dimensiunile generate din colectia Media. */
  sharp,

  plugins: s3Configured
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET!,
          config: {
            region: process.env.S3_REGION!,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
          },
        }),
      ]
    : [],
});
