import type { CollectionConfig } from "payload";

import { slugField, statusField } from "./fields";
import { revalidateFor } from "./revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Proiect", plural: "Proiecte" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "buildingType", "builtArea", "status"],
  },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
  },
  hooks: revalidateFor((doc) => ["/proiecte", `/proiecte/${doc.slug}`]),
  fields: [
    { name: "name", type: "text", required: true, label: "Denumire" },
    slugField,
    statusField,
    {
      name: "buildingType",
      type: "select",
      required: true,
      label: "Tip construcție",
      options: [
        { label: "Case Log House", value: "Case Log House" },
        { label: "Case A-frame", value: "Case A-frame" },
      ],
    },
    {
      name: "builtArea",
      type: "number",
      required: true,
      min: 0,
      label: "Suprafață construită (m²)",
      admin: { description: "Număr, ca să se poată filtra și sorta după el." },
    },
    {
      name: "dimensions",
      type: "text",
      required: true,
      label: "Dimensiuni",
      admin: { description: "Ex: 10,5 x 11 metri" },
    },
    {
      name: "usableGroundFloor",
      type: "number",
      required: true,
      min: 0,
      label: "Suprafață utilă parter (m²)",
    },
    {
      name: "usableLoft",
      type: "number",
      min: 0,
      label: "Suprafață utilă supantă (m²)",
      admin: {
        description:
          "Lasă gol dacă nu are supantă. De aici se deduce nivelul (Parter / Parter + supantă) — nu se ține separat, ca să nu se poată contrazice.",
      },
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Imagine" },
  ],
};
