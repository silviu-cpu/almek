import type { Article } from "@/payload-types";

export type ArticleCategory = Article["category"];

/** Valorile stocate sunt fara diacritice; etichetele afisate nu. */
export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: "constructie", label: "Construcție" },
  { id: "materiale", label: "Materiale" },
  { id: "amenajari", label: "Amenajări" },
  { id: "sfaturi", label: "Sfaturi" },
];

export function categoryLabel(id: ArticleCategory): string {
  return articleCategories.find((c) => c.id === id)?.label ?? id;
}

/** Data afisata; lipseste la articolele fara `publishedAt`. */
export function formatArticleDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
