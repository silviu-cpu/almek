"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCartEntries } from "@/components/shop/useCart";
import { clear, removeItem, setQuantity } from "@/lib/cart-store";
import type { ProductView } from "@/lib/cms";
import { formatPrice } from "@/lib/shop";

export function CartView({ products }: { products: ProductView[] }) {
  const { entries, total } = useCartEntries(products);

  if (entries.length === 0) {
    return (
      <div className="shell relative z-10 pb-32">
        <div className="border-outline-variant flex flex-col items-start gap-6 border p-12">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {"Coșul este gol."}
          </p>
          <Link
            href="/magazin"
            className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data px-10 py-4 tracking-widest uppercase"
          >
            {"Vezi produsele"}
          </Link>
        </div>
      </div>
    );
  }

  const stepper =
    "border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-9 w-9 cursor-pointer items-center justify-center border transition-colors";

  return (
    <div className="shell relative z-10 pb-32">
      <ul className="border-outline-variant flex flex-col border-t">
        {entries.map(({ product, quantity, lineTotal }) => (
          <li
            key={product.slug}
            className="border-outline-variant flex flex-col gap-6 border-b py-6 sm:flex-row sm:items-center"
          >
            <div className="border-outline-variant relative aspect-[4/3] w-full shrink-0 overflow-hidden border sm:w-40">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                sizes="160px"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {product.name}
              </h2>
              <p className="font-technical-data text-technical-data text-on-surface-variant">
                {`${product.category} · ${formatPrice(product.priceMinor)} / buc`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(product.slug, quantity - 1)}
                aria-label={`Scade cantitatea pentru ${product.name}`}
                className={stepper}
              >
                <Minus size={16} strokeWidth={1.5} aria-hidden />
              </button>
              <span
                aria-live="polite"
                className="font-technical-data text-technical-data text-on-surface w-8 text-center"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(product.slug, quantity + 1)}
                aria-label={`Crește cantitatea pentru ${product.name}`}
                className={stepper}
              >
                <Plus size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <p className="font-headline-md text-headline-md text-primary tabular-nums sm:w-40 sm:text-right">
              {formatPrice(lineTotal)}
            </p>

            <button
              type="button"
              onClick={() => removeItem(product.slug)}
              aria-label={`Elimină ${product.name} din coș`}
              className={stepper}
            >
              <Trash2 size={16} strokeWidth={1.5} aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <button
          type="button"
          onClick={clear}
          className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary cursor-pointer self-start tracking-widest uppercase underline underline-offset-4 transition-colors"
        >
          {"Golește coșul"}
        </button>

        <div className="border-outline-variant flex w-full flex-col gap-6 border p-8 md:max-w-md">
          <div className="flex items-baseline justify-between gap-6">
            <span className="font-technical-data text-technical-data text-on-surface-variant tracking-widest uppercase">
              {"Total"}
            </span>
            {/* `text-display-lg` urca pana la 72px si iesea din chenar la
                sume de patru cifre. */}
            <span className="font-headline-md text-headline-md text-on-surface tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          <p className="font-technical-data text-technical-data text-on-surface-variant">
            {"Transportul se calculează separat, în funcție de adresa de livrare."}
          </p>

          {/* TODO(stripe): butonul este inert. La cablare, un Server Action
              primeste doar {slug, quantity}[], recalculeaza pretul pe server din
              shop.ts si creeaza Checkout Session. Suma NU se trimite din browser
              — vezi sectiunea Stripe din CLAUDE.md. */}
          <button
            type="button"
            className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data w-full py-4 tracking-widest uppercase"
          >
            {"Finalizează comanda"}
          </button>
          <p className="font-technical-data text-on-surface-variant/70 text-xs">
            {"Plata online nu este încă activă."}
          </p>
        </div>
      </div>
    </div>
  );
}
