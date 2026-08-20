"use client";

import { useSyncExternalStore } from "react";

import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  type CartLine,
} from "@/lib/cart-store";
import { findProduct, type Product } from "@/lib/shop";

export type CartEntry = { product: Product; quantity: number; lineTotal: number };

/** Liniile brute din cos (slug + cantitate). */
export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Numarul total de bucati — pentru indicatorul din navbar. */
export function useCartCount(): number {
  return useCartLines().reduce((sum, line) => sum + line.quantity, 0);
}

/**
 * Liniile imbogatite cu produsul si totalul. Pretul vine intotdeauna din
 * `shop.ts`, nu din ce s-a salvat in localStorage — altfel un pret vechi (sau
 * modificat manual) ar ajunge in total.
 *
 * Liniile al caror slug nu mai exista in catalog sunt ignorate: produsul poate
 * fi scos din oferta dupa ce cineva l-a pus in cos.
 */
export function useCartEntries(): { entries: CartEntry[]; total: number } {
  const lines = useCartLines();

  const entries = lines.flatMap((line): CartEntry[] => {
    const product = findProduct(line.slug);
    if (!product) return [];
    return [
      {
        product,
        quantity: line.quantity,
        lineTotal: product.priceMinor * line.quantity,
      },
    ];
  });

  return {
    entries,
    total: entries.reduce((sum, e) => sum + e.lineTotal, 0),
  };
}
