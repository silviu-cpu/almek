import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Magazin | ALMEK",
  description:
    "Mobilier din lemn masiv pentru grădină și interior, executat în atelierul ALMEK. Produse pe stoc și la comandă.",
};

export default async function MagazinPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        eyebrow="Magazin"
        title="Mobilier din lemn masiv"
        intro="Mobilier lucrat în atelierul nostru. Cele pe stoc se comandă direct; restul le executăm la cerere, pe dimensiunile tale."
      />

      {/* `ShopCatalog` citeste filtrele cu `useSearchParams`, ceea ce intr-o
          pagina prerandata static cere obligatoriu o granita Suspense. */}
      <Suspense
        fallback={
          <div className="shell relative z-10 pb-32">
            <p className="font-technical-data text-technical-data text-on-surface-variant">
              {"Se încarcă produsele…"}
            </p>
          </div>
        }
      >
        <ShopCatalog products={products} />
      </Suspense>
    </>
  );
}
