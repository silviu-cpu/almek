import type { Metadata } from "next";

import { CartView } from "@/components/shop/CartView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Coș | ALMEK",
  description: "Produsele alese din magazinul ALMEK.",
};

export default function CosPage() {
  return (
    <>
      <PageHeader eyebrow="Magazin" title="Coșul tău" />
      <CartView />
    </>
  );
}
