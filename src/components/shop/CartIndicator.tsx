"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { useCartCount } from "@/components/shop/useCart";

/**
 * Indicatorul din header. Numarul vine din store prin `useSyncExternalStore`,
 * al carui `getServerSnapshot` intoarce cos gol — deci la prima randare arata 0
 * si se corecteaza dupa hidratare. Fara asta, un cos salvat in localStorage ar
 * produce nepotrivire intre serverul care randeaza 0 si clientul care stie N.
 */
export function CartIndicator() {
  const count = useCartCount();

  return (
    <Link
      href="/cos"
      aria-label={
        count === 0 ? "Coșul este gol" : `Coș: ${count} produse`
      }
      className="border-outline-variant text-on-surface hover:border-primary hover:text-primary relative flex h-10 w-10 shrink-0 items-center justify-center border transition-colors"
    >
      <ShoppingBag size={18} strokeWidth={1.5} aria-hidden />
      {count > 0 ? (
        <span
          aria-hidden
          className="bg-primary text-on-primary font-technical-data absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center px-1 text-[10px]"
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
