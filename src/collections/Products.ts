import type { CollectionConfig } from "payload";

import { slugField, statusField } from "./fields";
import { revalidateFor } from "./revalidate";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Produs", plural: "Produse" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "priceMinor", "inStock", "status"],
  },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
  },
  hooks: revalidateFor(() => ["/magazin", "/cos"]),
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
        { label: "Mobilier pentru grădină", value: "Mobilier pentru grădină" },
        { label: "Mobilier interior", value: "Mobilier interior" },
      ],
    },
    {
      name: "priceMinor",
      type: "number",
      required: true,
      min: 0,
      label: "Preț (bani)",
      admin: {
        description:
          "În bani, ca număr întreg: 450 lei se scrie 45000. Niciodată cu virgulă — aritmetica pe zecimale pierde precizie exact la calculul totalului.",
      },
    },
    {
      name: "inStock",
      type: "checkbox",
      defaultValue: true,
      label: "Pe stoc",
      admin: {
        description:
          "Debifat, produsul nu se adaugă în coș, ci deschide modalul de comandă.",
      },
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Imagine" },
  ],
};
