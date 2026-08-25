import type { Metadata } from "next";

import { CartView } from "@/components/shop/CartView";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Coș | ALMEK",
  description: "Produsele alese din magazinul ALMEK.",
};

export default async function CosPage() {
  /* Cosul retine doar slug + cantitate. Preturile se incarca aici, de pe
     server, ca nimic legat de bani sa nu vina din localStorage. */
  const products = await getProducts();

  return (
    <>
      <PageHeader eyebrow="Magazin" title="Coșul tău" />
      <CartView products={products} />
    </>
  );
}
