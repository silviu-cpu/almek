import type { CollectionConfig } from "payload";

import { slugField, statusField } from "./fields";
import { revalidateFor } from "./revalidate";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Articol", plural: "Articole" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
  },
  access: {
    // Vizitatorii vad doar articolele publicate; ciornele raman in admin.
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
  },
  hooks: revalidateFor((doc) => ["/blog", `/blog/${doc.slug}`]),
  fields: [
    { name: "title", type: "text", required: true, label: "Titlu" },
    slugField,
    statusField,
    {
      name: "publishedAt",
      type: "date",
      label: "Data publicării",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Categorie",
      options: [
        { label: "Construcție", value: "constructie" },
        { label: "Materiale", value: "materiale" },
        { label: "Amenajări", value: "amenajari" },
        { label: "Sfaturi", value: "sfaturi" },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      label: "Rezumat",
      admin: { description: "2–3 rânduri. Apar în listă și în rezultatele căutării." },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Imagine principală",
    },
    { name: "body", type: "richText", required: true, label: "Conținut" },
  ],
};
