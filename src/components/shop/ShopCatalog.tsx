"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { FilterDropdown } from "@/components/portfolio/FilterDropdown";
import { OrderModal } from "@/components/shop/OrderModal";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  availabilityOptions,
  priceRanges,
  productCategories,
  products,
  type Product,
} from "@/lib/shop";

const SORTS = {
  "pret-asc": { label: "Preț crescător", compare: (a: Product, b: Product) => a.priceMinor - b.priceMinor },
  "pret-desc": { label: "Preț descrescător", compare: (a: Product, b: Product) => b.priceMinor - a.priceMinor },
  nume: { label: "Alfabetic", compare: (a: Product, b: Product) => a.name.localeCompare(b.name, "ro") },
} as const;

type SortId = keyof typeof SORTS;
const DEFAULT_SORT: SortId = "pret-asc";

const readList = (raw: string | null) =>
  raw ? raw.split(",").filter(Boolean) : [];

export function ShopCatalog() {
  const router = useRouter();
  const params = useSearchParams();

  /* Produsul pentru care e deschis modalul. `null` = niciun modal. */
  const [ordering, setOrdering] = useState<Product | null>(null);

  const categorie = readList(params.get("categorie"));
  const disponibilitate = readList(params.get("disponibilitate"));
  const pret = readList(params.get("pret"));
  const q = params.get("q") ?? "";
  const rawSort = params.get("sort");
  const sort: SortId = rawSort && rawSort in SORTS ? (rawSort as SortId) : DEFAULT_SORT;

  const setParam = (key: string, value: string | null) => {
    const usp = new URLSearchParams(params.toString());
    if (!value) usp.delete(key);
    else usp.set(key, value);
    const query = usp.toString();
    router.replace(query ? `/magazin?${query}` : "/magazin", { scroll: false });
  };

  const toggle = (key: string, id: string) => {
    const current = readList(params.get(key));
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];
    setParam(key, next.join(","));
  };

  /* Fara `useMemo`: `readList` produce array-uri noi la fiecare randare, deci
     React Compiler nu ar putea pastra memoizarea si ar renunta sa optimizeze
     tot componentul. La 26 de produse filtrarea e neglijabila. */
  const needle = q.trim().toLowerCase();
  const ranges = priceRanges.filter((r) => pret.includes(r.id));

  const filtered = products
    .filter((p) => {
      if (categorie.length && !categorie.includes(p.category)) return false;
      if (disponibilitate.length) {
        const id = p.inStock ? "pe-stoc" : "la-comanda";
        if (!disponibilitate.includes(id)) return false;
      }
      if (ranges.length && !ranges.some((r) => p.priceMinor >= r.min && p.priceMinor < r.max))
        return false;
      if (needle && !p.name.toLowerCase().includes(needle)) return false;
      return true;
    })
    .sort(SORTS[sort].compare);

  const active = [
    ...categorie.map((v) => ({ key: "categorie", value: v, label: v })),
    ...disponibilitate.map((v) => ({
      key: "disponibilitate",
      value: v,
      label: availabilityOptions.find((o) => o.id === v)?.label ?? v,
    })),
    ...pret.map((v) => ({
      key: "pret",
      value: v,
      label: priceRanges.find((r) => r.id === v)?.label ?? v,
    })),
  ];

  return (
    <div className="shell relative z-10 pb-32">
      <div className="border-outline-variant divide-outline-variant flex flex-col divide-y border lg:flex-row lg:divide-x lg:divide-y-0">
        <FilterDropdown
          label="Categorie"
          options={productCategories.map((c) => ({ id: c, label: c }))}
          selected={categorie}
          onToggle={(id) => toggle("categorie", id)}
        />
        <FilterDropdown
          label="Disponibilitate"
          options={availabilityOptions.map((o) => ({ id: o.id, label: o.label }))}
          selected={disponibilitate}
          onToggle={(id) => toggle("disponibilitate", id)}
        />
        <FilterDropdown
          label="Preț"
          options={priceRanges.map((r) => ({ id: r.id, label: r.label }))}
          selected={pret}
          onToggle={(id) => toggle("pret", id)}
        />

        <label className="flex flex-1 items-center gap-3 px-5 py-4 lg:justify-end">
          <span className="sr-only">{"Caută după numele produsului"}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Caută după nume"
            className="font-technical-data text-technical-data text-on-surface placeholder:text-on-surface-variant/60 w-full border-0 bg-transparent focus:outline-none lg:max-w-56 lg:text-right"
          />
          <Search size={16} strokeWidth={1.5} aria-hidden className="text-on-surface-variant shrink-0" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body-md text-body-md text-on-surface-variant">
          {"Am găsit "}
          <span className="text-on-surface">{filtered.length}</span>
          {filtered.length === 1 ? " produs" : " produse"}
        </p>

        <label className="flex items-center gap-3">
          <span className="sr-only">{"Sortare"}</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="border-outline-variant focus:border-primary text-on-surface font-technical-data text-technical-data cursor-pointer border bg-transparent px-4 py-3 focus:outline-none"
          >
            {Object.entries(SORTS).map(([id, s]) => (
              <option key={id} value={id} className="bg-surface text-on-surface">
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {active.length > 0 || q ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {active.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => toggle(chip.key, chip.value)}
              className="border-outline-variant text-on-surface hover:border-primary hover:text-primary font-technical-data text-technical-data flex cursor-pointer items-center gap-2 border px-4 py-2 transition-colors"
            >
              {chip.label}
              <X size={14} strokeWidth={1.5} aria-hidden />
              <span className="sr-only">{"Elimină filtrul"}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => router.replace("/magazin", { scroll: false })}
            className="font-technical-data text-technical-data text-primary cursor-pointer underline underline-offset-4"
          >
            {"Șterge selecțiile"}
          </button>
        </div>
      ) : null}

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant border-outline-variant border p-12 text-center">
            {"Niciun produs nu corespunde filtrelor alese."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onOrder={setOrdering}
              />
            ))}
          </ul>
        )}
      </div>

      {ordering ? (
        <OrderModal product={ordering} onClose={() => setOrdering(null)} />
      ) : null}
    </div>
  );
}
