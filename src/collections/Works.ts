import type { CollectionConfig } from "payload";

import { slugField, statusField } from "./fields";
import { revalidateFor } from "./revalidate";

/** Lucrarile duse la capat, afisate pe /portofoliu-almek. */
export const Works: CollectionConfig = {
  slug: "works",
  labels: { singular: "Lucrare", plural: "Lucrări" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status"],
  },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
  },
  hooks: revalidateFor(() => ["/portofoliu-almek"]),
  fields: [
    { name: "name", type: "text", required: true, label: "Denumire" },
    slugField,
    statusField,
    {
      name: "category",
      type: "select",
      required: true,
      label: "Categorie",
      options: [
        { label: "Case", value: "Case" },
        { label: "Căsuțe de grădină", value: "Căsuțe de grădină" },
        { label: "Foișoare și terase", value: "Foișoare și terase" },
        { label: "Mobilier pentru grădină", value: "Mobilier pentru grădină" },
        { label: "Amenajări interioare", value: "Amenajări interioare" },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Imagine" },
  ],
};
