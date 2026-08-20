"use client";

import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { addItem } from "@/lib/cart-store";
import { PRODUCT_IMAGE, formatPrice, type Product } from "@/lib/shop";

const MAX_QUANTITY = 99;

const stepper =
  "border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Cardul isi tine propria cantitate, deci starea nu trebuie sa fie o mapa
 * slug -> numar in catalog. Dupa adaugare revine la 1: altfel urmatoarea
 * apasare ar adauga tacit aceeasi cantitate inca o data.
 */
export function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (product: Product) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.slug, quantity);
    setQuantity(1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <li className="group flex flex-col">
      <div className="border-outline-variant group-hover:border-primary relative aspect-[4/3] w-full overflow-hidden border transition-colors">
        <Image
          src={product.image}
          alt={product.name}
          width={PRODUCT_IMAGE.width}
          height={PRODUCT_IMAGE.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Eticheta face diferenta vizibila, nu doar textul butonului. */}
        {!product.inStock ? (
          <span className="bg-secondary-container text-on-secondary-container font-technical-data text-technical-data absolute top-0 left-0 px-3 py-1 tracking-widest uppercase">
            {"La comandă"}
          </span>
        ) : null}
      </div>

      <h2 className="font-headline-md text-headline-md text-on-surface mt-5">
        {product.name}
      </h2>
      <p className="font-technical-data text-technical-data text-on-surface-variant mt-2">
        {product.category}
      </p>
      <p className="font-headline-md text-headline-md text-primary mt-3 tabular-nums">
        {formatPrice(product.priceMinor)}
      </p>

      {product.inStock ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label={`Scade cantitatea pentru ${product.name}`}
              className={stepper}
            >
              <Minus size={16} strokeWidth={1.5} aria-hidden />
            </button>

            <label className="sr-only" htmlFor={`qty-${product.slug}`}>
              {`Cantitate pentru ${product.name}`}
            </label>
            <input
              id={`qty-${product.slug}`}
              type="number"
              min={1}
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => {
                /* Campul poate ramane gol in timpul editarii, iar `valueAsNumber`
                   da NaN — pastram 1 ca minim in loc sa scriem NaN in stare. */
                const next = Math.floor(e.target.valueAsNumber);
                setQuantity(
                  Number.isFinite(next) ? Math.min(Math.max(next, 1), MAX_QUANTITY) : 1,
                );
              }}
              className="border-outline-variant focus:border-primary text-on-surface font-technical-data text-technical-data h-10 w-14 border bg-transparent text-center tabular-nums focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              disabled={quantity >= MAX_QUANTITY}
              aria-label={`Crește cantitatea pentru ${product.name}`}
              className={stepper}
            >
              <Plus size={16} strokeWidth={1.5} aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="border-primary text-primary hover:bg-primary hover:text-on-primary font-technical-data text-technical-data flex flex-1 cursor-pointer items-center justify-center gap-2 border px-6 py-3 tracking-widest uppercase transition-colors"
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={1.5} aria-hidden />
                {"Adăugat"}
              </>
            ) : (
              "Adaugă în coș"
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOrder(product)}
          className="border-outline-variant text-on-surface hover:border-primary hover:text-primary font-technical-data text-technical-data mt-5 cursor-pointer border px-6 py-3 tracking-widest uppercase transition-colors"
        >
          {"Comandă la cerere"}
        </button>
      )}
    </li>
  );
}
