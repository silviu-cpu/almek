/* ---------------------------------------------------------------------------
   Catalogul magazinului.

   Numele produselor sunt lucrari reale ALMEK, preluate din lista de portofoliu.
   PRETURILE SUNT INVENTATE si trebuie inlocuite inainte de orice lansare — nu
   exista nicio sursa reala pentru ele.

   Miniaturile refolosesc placeholder-ele generate din public/images/portofoliu/,
   toate 800×600.
   --------------------------------------------------------------------------- */

export type ProductCategory = "Mobilier pentru grădină" | "Mobilier interior";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /**
   * Pretul in bani (RON × 100), intreg. Niciodata in lei ca numar cu virgula:
   * Stripe lucreaza tot in cea mai mica unitate, iar aritmetica pe float ar
   * introduce erori de rotunjire tocmai la calculul totalului.
   */
  priceMinor: number;
  /**
   * Produsele fara stoc nu se adauga in cos — deschid modalul de comanda.
   * ATENTIE: este un flag static in cod. Stocul real cere baza de date; asa cum
   * e acum, doi cumparatori pot lua simultan ultimul exemplar.
   */
  inStock: boolean;
  image: string;
};

export const PRODUCT_IMAGE = { width: 800, height: 600 };

const img = (slug: string) => `/images/portofoliu/${slug}.png`;

export const productCategories: ProductCategory[] = [
  "Mobilier pentru grădină",
  "Mobilier interior",
];

export const products: Product[] = [
  // --- Mobilier pentru grădină -------------------------------------------
  { slug: "scaun-de-gradina", name: "Scaun de grădină", category: "Mobilier pentru grădină", priceMinor: 45000, inStock: true, image: img("scaun-de-gradina") },
  { slug: "bancuta-din-lemn", name: "Băncuță din lemn", category: "Mobilier pentru grădină", priceMinor: 68000, inStock: true, image: img("bancuta-din-lemn") },
  { slug: "jardiniere-din-lemn", name: "Jardiniere din lemn", category: "Mobilier pentru grădină", priceMinor: 32000, inStock: true, image: img("jardiniere-din-lemn") },
  { slug: "masa-pentru-foisor", name: "Masă pentru foișor", category: "Mobilier pentru grădină", priceMinor: 129000, inStock: true, image: img("masa-pentru-foisor") },
  { slug: "masa-cu-bancute-acoperite", name: "Masă cu băncuțe acoperite", category: "Mobilier pentru grădină", priceMinor: 245000, inStock: true, image: img("masa-cu-bancute-acoperite") },
  { slug: "set-masa-cu-bancute-rustice", name: "Set masă cu băncuțe rustice", category: "Mobilier pentru grădină", priceMinor: 198000, inStock: true, image: img("set-masa-cu-bancute-rustice") },
  { slug: "set-mobilier-terasa", name: "Set mobilier terasă", category: "Mobilier pentru grădină", priceMinor: 329000, inStock: false, image: img("set-mobilier-terasa") },
  { slug: "mobilier-lemn-pentru-terasa", name: "Mobilier din lemn pentru terasă", category: "Mobilier pentru grădină", priceMinor: 275000, inStock: true, image: img("mobilier-lemn-pentru-terasa") },
  { slug: "cusca-pentru-caine", name: "Cușcă pentru câine", category: "Mobilier pentru grădină", priceMinor: 89000, inStock: true, image: img("cusca-pentru-caine") },
  { slug: "loc-de-joaca-pentru-copii", name: "Loc de joacă pentru copii", category: "Mobilier pentru grădină", priceMinor: 480000, inStock: false, image: img("loc-de-joaca-pentru-copii") },
  { slug: "balustrada-model-x", name: "Balustradă din lemn, model X", category: "Mobilier pentru grădină", priceMinor: 41000, inStock: true, image: img("balustrada-din-lemn-model-x") },
  { slug: "balustrada-model-w", name: "Balustradă din lemn, model W", category: "Mobilier pentru grădină", priceMinor: 41000, inStock: true, image: img("balustrada-din-lemn-model-w") },
  { slug: "gard-model-lamelar", name: "Gard din lemn, model lamelar", category: "Mobilier pentru grădină", priceMinor: 38000, inStock: true, image: img("gard-lamele-lemn") },
  { slug: "gard-model-jaluzea", name: "Gard din lemn, model jaluzea", category: "Mobilier pentru grădină", priceMinor: 39500, inStock: false, image: img("gard-lemn-panou-jaluzea") },
  { slug: "poarta-model-lamelar", name: "Poartă din lemn, model lamelar", category: "Mobilier pentru grădină", priceMinor: 156000, inStock: true, image: img("poarta-din-lemn-model-lamelar") },

  // --- Mobilier interior --------------------------------------------------
  { slug: "masa-din-lemn-masiv", name: "Masă din lemn masiv", category: "Mobilier interior", priceMinor: 189000, inStock: true, image: img("masa-din-lemn-masiv") },
  { slug: "dulap-din-lemn", name: "Dulap din lemn", category: "Mobilier interior", priceMinor: 235000, inStock: true, image: img("dulap-din-lemn") },
  { slug: "pat-din-lemn-molid-pin", name: "Pat din lemn molid/pin", category: "Mobilier interior", priceMinor: 168000, inStock: true, image: img("pat-din-lemn-molid-pin") },
  { slug: "patut-copil-montessori", name: "Pătuț copil Montessori", category: "Mobilier interior", priceMinor: 94000, inStock: true, image: img("patut-copil-montessori") },
  { slug: "pat-casuta-montessori", name: "Pat căsuță Montessori", category: "Mobilier interior", priceMinor: 112000, inStock: false, image: img("pat-casuta-montessori") },
  { slug: "usa-din-lemn-masiv", name: "Ușă din lemn masiv", category: "Mobilier interior", priceMinor: 145000, inStock: true, image: img("usi-din-lemn-masiv") },
  { slug: "trepte-din-lemn-masiv", name: "Trepte din lemn masiv", category: "Mobilier interior", priceMinor: 52000, inStock: true, image: img("trepte-din-lemn-masiv") },
  { slug: "riflaj-decorativ-lemn", name: "Riflaj decorativ din lemn", category: "Mobilier interior", priceMinor: 28000, inStock: true, image: img("7989") },
  { slug: "scara-vang-central", name: "Scară cu vang central", category: "Mobilier interior", priceMinor: 890000, inStock: false, image: img("scara-lemn-cu-vang-central") },
  { slug: "scara-rustica", name: "Scară din lemn, rustică", category: "Mobilier interior", priceMinor: 720000, inStock: true, image: img("scara-din-lemn-rustic") },
  { slug: "set-mobilier-interior-rustic", name: "Set mobilier interior rustic", category: "Mobilier interior", priceMinor: 640000, inStock: false, image: img("set-mobilier-interior-rustic") },
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

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** 45000 -> "450,00 lei". Formatarea sta intr-un singur loc. */
export function formatPrice(priceMinor: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  }).format(priceMinor / 100);
}
