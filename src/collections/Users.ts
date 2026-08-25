import type { CollectionConfig } from "payload";

/** Conturile care pot intra in /admin. Primul se creeaza la prima deschidere. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilizator", plural: "Utilizatori" },
  auth: true,
  admin: { useAsTitle: "email" },
  access: {
    // Fara asta, oricine ar putea citi lista de utilizatori prin API.
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "name", type: "text", label: "Nume" }],
};
