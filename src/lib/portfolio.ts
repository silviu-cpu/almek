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
import type { Project } from "@/payload-types";

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

export type PortfolioCategory =
  | "Case"
  | "Căsuțe de grădină"
  | "Foișoare și terase"
  | "Mobilier pentru grădină"
  | "Amenajări interioare";

export type PortfolioItem = {
  slug: string;
  name: string;
  category: PortfolioCategory;
};

export const portfolioCategories: PortfolioCategory[] = [
  "Case",
  "Căsuțe de grădină",
  "Foișoare și terase",
  "Mobilier pentru grădină",
  "Amenajări interioare",
];

/**
 * Miniaturile sunt toate 800×600, deci nu are rost cate un import static
 * pentru fiecare: calea se compune din slug, iar dimensiunea e constanta.
 */
export const WORK_IMAGE = { width: 800, height: 600 };
export const workImageSrc = (slug: string) => `/images/portofoliu/${slug}.png`;

export const portfolioItems: PortfolioItem[] = [
  { slug: "casa-din-lemn-morilor", name: "Casă din lemn Morilor", category: "Case" },
  { slug: "casa-din-lemn-lunca", name: "Casă din lemn Lunca", category: "Case" },
  { slug: "casa-din-lemn-vladesti", name: "Casă din lemn Vlădești", category: "Case" },
  { slug: "casa-din-lemn-scandinavica", name: "Casă din lemn Scandinavica", category: "Case" },
  { slug: "casa-din-lemn-priporu", name: "Casă din lemn Râureni", category: "Case" },
  { slug: "casa-din-lemn-aranghel", name: "Casă din lemn Aranghel", category: "Case" },
  { slug: "casa-din-lemn-polovragi", name: "Casă din lemn Polovragi", category: "Case" },
  { slug: "casa-din-lemn-poenari", name: "Casă din lemn Poenari", category: "Case" },
  { slug: "casa-din-lemn-pausesti", name: "Casă din lemn Vărzaru", category: "Case" },
  { slug: "casa-din-lemn-paunesti", name: "Casă din lemn Păunești", category: "Case" },
  { slug: "casa-din-lemn-olanu", name: "Casă din lemn Olanu", category: "Case" },
  { slug: "casa-din-lemn-ocnita", name: "Casă din lemn Ocnița", category: "Case" },
  { slug: "casa-din-lemn-jiblea-veche", name: "Casă din lemn Șerbănești", category: "Case" },
  { slug: "casa-din-lemn-franta", name: "Casă din lemn Franța", category: "Case" },
  { slug: "casa-din-lemn-feteni", name: "Casă din lemn Fețeni", category: "Case" },
  { slug: "casa-din-meri", name: "Casa din Pădure", category: "Case" },
  { slug: "7354", name: "Casă din lemn Dănicei", category: "Case" },
  { slug: "casa-din-lemn-cu-mansarda", name: "Casă din lemn cu Mansardă", category: "Case" },
  { slug: "7339", name: "Casă din lemn cu garaj", category: "Case" },
  { slug: "casa-din-lemn-craiova", name: "Casă din lemn Craiova", category: "Case" },
  { slug: "magazie-din-lemn", name: "Magazie din lemn", category: "Căsuțe de grădină" },
  { slug: "casuta-de-gradina-anexa", name: "Căsuța de gradină Anexă", category: "Căsuțe de grădină" },
  { slug: "casuta-din-gradina", name: "Căsuța din gradină", category: "Căsuțe de grădină" },
  { slug: "casuta-camping-double", name: "Căsuța Camping Double", category: "Căsuțe de grădină" },
  { slug: "casuta-de-lemn-taraba", name: "Căsuțe de lemn Tarabă", category: "Căsuțe de grădină" },
  { slug: "casuta-de-lemn-comert", name: "Căsuța de lemn Comerț", category: "Căsuțe de grădină" },
  { slug: "casuta-de-rugaciune", name: "Căsuța de Rugaciune", category: "Căsuțe de grădină" },
  { slug: "casuta-comert-02", name: "Căsuță Comerț Craciun", category: "Căsuțe de grădină" },
  { slug: "casuta-comert-01", name: "Căsuță Comerț Stradal", category: "Căsuțe de grădină" },
  { slug: "casuta-de-gradina-02", name: "Căsuță din lemn Studio", category: "Căsuțe de grădină" },
  { slug: "casuta-de-gradina-01", name: "Căsuță de grădină Poiană", category: "Căsuțe de grădină" },
  { slug: "casuta-magazie-din-lemn", name: "Căsuța Magazie din lemn", category: "Căsuțe de grădină" },
  { slug: "terasa-din-lemn-cofetarie", name: "Terasă din lemn Cofetărie", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-crama", name: "Terasă din lemn Cramă", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-velux", name: "Terasă din lemn Velux", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-balcon", name: "Terasă din lemn Balcon", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-veranda", name: "Terasă din lemn Verandă", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-pub", name: "Terasă din lemn Pub", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-garaj", name: "Terasă din lemn Garaj", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-eleganta", name: "Terasă din lemn Elegantă", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-comerciala", name: "Terasă din lemn Comercială", category: "Foișoare și terase" },
  { slug: "terasa-din-lemn-rustic", name: "Terasă din lemn – Rustic", category: "Foișoare și terase" },
  { slug: "foisorul-din-livada", name: "Foișorul din Livadă", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-hexagon", name: "Foișor din lemn Hexagon", category: "Foișoare și terase" },
  { slug: "pergola-din-lemn-decor-gratar", name: "Pergolă din lemn Decor Grătar", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-cerbul", name: "Foișor din lemn Cerbul", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-codrul", name: "Foișor din lemn Codrul", category: "Foișoare și terase" },
  { slug: "foisorul-vanatorului", name: "Foișorul Vânătorului", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-scoica", name: "Foișor din lemn Scoică", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-armonia", name: "Foișor din lemn Armonia", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-cetate", name: "Foișor din lemn Cetate", category: "Foișoare și terase" },
  { slug: "foisor-din-lemn-rural", name: "Foișor din lemn Rural", category: "Foișoare și terase" },
  { slug: "foisor-hexagon-din-lemn", name: "Foisor Hexagon din Lemn", category: "Mobilier pentru grădină" },
  { slug: "terasa-lemn-masiv", name: "Terasă Lemn Masiv", category: "Mobilier pentru grădină" },
  { slug: "terasa-pergola-din-lemn", name: "Terasă Pergolă din Lemn", category: "Mobilier pentru grădină" },
  { slug: "amenajare-bar-exterior-lemn", name: "Amenajare Bar Exterior Lemn", category: "Mobilier pentru grădină" },
  { slug: "mobilier-lemn-pentru-terasa", name: "Mobilier Lemn pentru Terasă", category: "Mobilier pentru grădină" },
  { slug: "cusca-pentru-caine", name: "Cușca pentru câine", category: "Mobilier pentru grădină" },
  { slug: "scaun-de-gradina", name: "Scaun de gradină", category: "Mobilier pentru grădină" },
  { slug: "masa-pentru-foisor", name: "Masă pentru foișor", category: "Mobilier pentru grădină" },
  { slug: "set-mobilier-terasa", name: "Set Mobilier Terasă", category: "Mobilier pentru grădină" },
  { slug: "bancuta-din-lemn", name: "Băncuță din lemn", category: "Mobilier pentru grădină" },
  { slug: "masa-cu-bancute-acoperite", name: "Masă cu băncuțe acoperite", category: "Mobilier pentru grădină" },
  { slug: "jardiniere-din-lemn", name: "Jardiniere din Lemn", category: "Mobilier pentru grădină" },
  { slug: "poarta-din-lemn-model-lamelar", name: "Poartă din Lemn Model Lamelar", category: "Mobilier pentru grădină" },
  { slug: "balustrada-din-lemn-model-x", name: "Balustradă din Lemn Model X", category: "Mobilier pentru grădină" },
  { slug: "balustrada-din-lemn-model-w", name: "Balustradă din Lemn Model W", category: "Mobilier pentru grădină" },
  { slug: "gard-din-lemn-rustic", name: "Balustradă din Lemn Rustică", category: "Mobilier pentru grădină" },
  { slug: "gard-lamele-lemn", name: "Gard din Lemn – Model Lamelar", category: "Mobilier pentru grădină" },
  { slug: "gard-lemn-panou-jaluzea", name: "Gard din lemn – Model Jaluzea", category: "Mobilier pentru grădină" },
  { slug: "loc-de-joaca-pentru-copii", name: "Loc de joacă pentru copii", category: "Mobilier pentru grădină" },
  { slug: "set-masa-cu-bancute-rustice", name: "Set masă cu băncuțe rustice", category: "Mobilier pentru grădină" },
  { slug: "usi-din-lemn-masiv", name: "Uși din Lemn Masiv", category: "Amenajări interioare" },
  { slug: "scara-lemn-cu-vang-central", name: "Scară Lemn cu Vang Central", category: "Amenajări interioare" },
  { slug: "scara-lemn-pe-vanguri", name: "Scară Lemn pe Vanguri", category: "Amenajări interioare" },
  { slug: "trepte-din-lemn-masiv", name: "Trepte din lemn masiv", category: "Amenajări interioare" },
  { slug: "scara-din-lemn-rustic", name: "Scară din lemn Rustic", category: "Amenajări interioare" },
  { slug: "amenajare-lemn-stand-spa", name: "Amenajare Lemn Stand Spa", category: "Amenajări interioare" },
  { slug: "set-mobilier-interior-rustic", name: "Set Mobilier Interior Rustic", category: "Amenajări interioare" },
  { slug: "7989", name: "Riflaj Decorativ Lemn", category: "Amenajări interioare" },
  { slug: "patut-copil-montessori", name: "Pătuț Copil Montessori", category: "Amenajări interioare" },
  { slug: "pat-casuta-montessori", name: "Pat Căsuță Montessori", category: "Amenajări interioare" },
  { slug: "masa-din-lemn-masiv", name: "Masă din lemn masiv", category: "Amenajări interioare" },
  { slug: "dulap-din-lemn", name: "Dulap din lemn", category: "Amenajări interioare" },
  { slug: "pat-din-lemn-molid-pin", name: "Pat din lemn Molid/Pin", category: "Amenajări interioare" },
  { slug: "scara-din-lemn-mahon", name: "Scară din lemn Vlădești", category: "Amenajări interioare" },
  { slug: "amenajare-fatada-lemn", name: "Amenajare Fațadă Fast-Food", category: "Amenajări interioare" },
  { slug: "bar-din-lemn", name: "Amenajare Bar Lemn Cafenea", category: "Amenajări interioare" },
  { slug: "amenajari-interioare", name: "Amenajare Restaurant Valencia", category: "Amenajări interioare" },
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
