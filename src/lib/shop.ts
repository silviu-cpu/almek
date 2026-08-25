/* ---------------------------------------------------------------------------
   Ce a mai ramas din magazin dupa mutarea in CMS: doar functii pure si liste de
   optiuni pentru filtre.

   Produsele traiesc acum in Payload si se citesc prin `getProducts()` din
   `cms.ts`. Forma lor este `ProductView`, nu un tip definit aici — o singura
   sursa de adevar.
   --------------------------------------------------------------------------- */

import type { Product } from "@/payload-types";

export type ProductCategory = Product["category"];

export const productCategories: ProductCategory[] = [
  "Mobilier pentru grădină",
  "Mobilier interior",
];

/** Intervale de pret pentru filtru, in bani ca sa nu amestecam unitatile. */
export const priceRanges = [
  { id: "sub-500", label: "sub 500 lei", min: 0, max: 50000 },
  { id: "500-2000", label: "500 – 2.000 lei", min: 50000, max: 200000 },
  { id: "peste-2000", label: "peste 2.000 lei", min: 200000, max: Infinity },
] as const;

export const availabilityOptions = [
  { id: "pe-stoc", label: "Pe stoc" },
  { id: "la-comanda", label: "La comandă" },
] as const;

/** 45000 -> "450,00 RON". Formatarea sumelor sta intr-un singur loc. */
export function formatPrice(priceMinor: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  }).format(priceMinor / 100);
}
