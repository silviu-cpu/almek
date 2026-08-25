import type { CollectionConfig } from "payload";

/**
 * Biblioteca de imagini. Fisierele ajung in S3 daca exista `S3_BUCKET`; altfel
 * in `public/media`, ca dezvoltarea locala sa nu ceara credentiale AWS — vezi
 * `payload.config.ts`.
 *
 * `alt` este obligatoriu, nu optional: o imagine fara text alternativ e o
 * imagine pe care cititoarele de ecran nu o pot descrie, iar odata publicata
 * nimeni nu se mai intoarce sa o completeze.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Imagine", plural: "Imagini" },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1600, height: 1200, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Text alternativ",
      admin: {
        description:
          "Ce se vede în imagine, pe scurt. Este citit de cititoarele de ecran și apare dacă imaginea nu se încarcă.",
      },
    },
  ],
};
