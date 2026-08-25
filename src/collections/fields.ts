import type { Field } from "payload";

/**
 * Slug-ul apare in URL, deci nu poate fi schimbat fara sa rupa linkuri deja
 * date mai departe. Se completeaza o data si ramane vizibil in bara laterala.
 */
export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description:
      "Apare în adresa paginii. Doar litere mici, cifre și cratime. Odată publicat, schimbarea lui rupe linkurile existente.",
  },
  validate: (value: unknown) => {
    if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return "Doar litere mici, cifre și cratime (ex: casa-din-lemn-valcea).";
    }
    return true;
  },
};

/** Comuta intre ciorna si publicat. Ciornele nu apar pe site. */
export const statusField: Field = {
  name: "status",
  type: "select",
  required: true,
  defaultValue: "draft",
  options: [
    { label: "Ciornă", value: "draft" },
    { label: "Publicat", value: "published" },
  ],
  admin: { position: "sidebar" },
};
