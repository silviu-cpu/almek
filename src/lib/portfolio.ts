/* ---------------------------------------------------------------------------
   Lucrarile de portofoliu si filmarile. Textele sunt preluate de pe
   almekwoodarch.ro; imaginile sunt placeholder-e generate.

   Aceste doua colectii NU au trecut in CMS: sunt liste stabile, fara editare
   frecventa. Proiectele si produsele, in schimb, se administreaza din /admin.
   --------------------------------------------------------------------------- */

/* Proiectele au trecut in CMS: se citesc cu `getProjects()` din `cms.ts`, iar
   forma lor este `ProjectView`. Aici raman doar optiunile de filtrare si
   functia care deduce nivelul — lucruri pure, folosite si de componentele
   client, care nu au voie sa atinga baza de date. */
import type { Project, Work } from "@/payload-types";

export type BuildingType = Project["buildingType"];
export type Levels = "Parter" | "Parter + supantă";

/** Se deduce din prezenta supantei; tinut ca doua campuri s-ar putea contrazice. */
export function levelsOf(project: { usableLoft?: number | null }): Levels {
  return project.usableLoft ? "Parter + supantă" : "Parter";
}

export const buildingTypes: BuildingType[] = [
  "Case Log House",
  "Case A-frame",
];

export const levelOptions: Levels[] = ["Parter", "Parter + supantă"];

/** Intervale de suprafata construita, pentru filtrul din pagina Proiecte. */
export const areaRanges = [
  { id: "sub-60", label: "sub 60 m²", min: 0, max: 60 },
  { id: "60-90", label: "60 – 90 m²", min: 60, max: 90 },
  { id: "peste-90", label: "peste 90 m²", min: 90, max: Infinity },
] as const;

/* Lucrarile au trecut in CMS: se citesc cu `getWorks()` din `cms.ts`, iar forma
   lor este `WorkView`. Aici raman doar categoriile, folosite de bara de filtre
   din componenta client. */
export type PortfolioCategory = Work["category"];

export const portfolioCategories: PortfolioCategory[] = [
  "Case",
  "Căsuțe de grădină",
  "Foișoare și terase",
  "Mobilier pentru grădină",
  "Amenajări interioare",
];

export type FieldVideo = {
  youtubeId: string;
  title: string;
  description: string;
};

/* Pe site-ul live toate cele sase clipuri poarta acelasi titlu si aceeasi
   descriere — continut neterminat, preluat ca atare. */
export const fieldVideos: FieldVideo[] = [
  { youtubeId: "2jOAEb42OgI", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
  { youtubeId: "Gj2qsdiQvqs", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
  { youtubeId: "RhkXIMHcEuo", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
  { youtubeId: "dsEWpy5xHGc", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
  { youtubeId: "hzv_6MRvklg", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
  { youtubeId: "w0J72bco9IU", title: "Casa pentru gradina construita intr-o zi", description: "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice." },
];
