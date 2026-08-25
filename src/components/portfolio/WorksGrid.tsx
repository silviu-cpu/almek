"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import type { WorkView } from "@/lib/cms";
import { portfolioCategories } from "@/lib/portfolio";

/** Aceeasi conventie ca la Proiecte: selectie multipla, lista separata prin virgula. */
const readList = (raw: string | null) =>
  raw ? raw.split(",").filter(Boolean) : [];

export function WorksGrid({ works }: { works: WorkView[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const categorii = readList(params.get("categorie"));
  const q = params.get("q") ?? "";

  const setParam = (key: string, value: string | null) => {
    const usp = new URLSearchParams(params.toString());
    if (!value) usp.delete(key);
    else usp.set(key, value);
    const query = usp.toString();
    router.replace(query ? `/portofoliu-almek?${query}` : "/portofoliu-almek", {
      scroll: false,
    });
  };

  const toggleCategory = (id: string) => {
    const next = categorii.includes(id)
      ? categorii.filter((v) => v !== id)
      : [...categorii, id];
    setParam("categorie", next.join(","));
  };

  /* Fara `useMemo`: `readList` produce un array nou la fiecare randare, deci
     React Compiler nu putea pastra memoizarea manuala si renunta sa optimizeze
     tot componentul. Lista e mica, deci filtrarea e oricum neglijabila, iar
     compilatorul memoizeaza singur. */
  const needle = q.trim().toLowerCase();
  const filtered = works.filter((item) => {
    if (categorii.length && !categorii.includes(item.category)) return false;
    if (needle && !item.name.toLowerCase().includes(needle)) return false;
    return true;
  });

  /* Categoriile sunt putine si scurte, deci stau deschise in bara ca optiuni de
     meniu — un dropdown ar fi ascuns tot ce se poate alege. Selectia e multipla:
     "Toate" inseamna pur si simplu nicio categorie bifata. */
  const cell = (active: boolean) =>
    [
      "font-technical-data text-technical-data cursor-pointer px-5 py-4 tracking-widest uppercase transition-colors",
      active
        ? "bg-primary text-on-primary"
        : "text-on-surface hover:text-primary",
    ].join(" ");

  return (
    <div className="shell relative z-10 pb-32">
      <div className="border-outline-variant divide-outline-variant flex flex-col divide-y border lg:flex-row lg:flex-wrap lg:items-stretch lg:divide-x lg:divide-y-0">
        <button
          type="button"
          aria-pressed={categorii.length === 0}
          onClick={() => setParam("categorie", null)}
          className={cell(categorii.length === 0)}
        >
          {"Toate"}
        </button>

        {portfolioCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={categorii.includes(category)}
            onClick={() => toggleCategory(category)}
            className={cell(categorii.includes(category))}
          >
            {category}
          </button>
        ))}

        <label className="flex flex-1 items-center gap-3 px-5 py-4 lg:justify-end">
          <span className="sr-only">{"Caută după numele lucrării"}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Caută după nume"
            className="font-technical-data text-technical-data text-on-surface placeholder:text-on-surface-variant/60 w-full border-0 bg-transparent focus:outline-none lg:max-w-56 lg:text-right"
          />
          <Search
            size={16}
            strokeWidth={1.5}
            aria-hidden
            className="text-on-surface-variant shrink-0"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <p className="font-body-md text-body-md text-on-surface-variant">
          {"Am găsit "}
          <span className="text-on-surface">{filtered.length}</span>
          {filtered.length === 1 ? " lucrare" : " lucrări"}
        </p>
        {categorii.length > 0 || q ? (
          <button
            type="button"
            onClick={() => router.replace("/portofoliu-almek", { scroll: false })}
            className="font-technical-data text-technical-data text-primary cursor-pointer underline underline-offset-4"
          >
            {"Șterge selecțiile"}
          </button>
        ) : null}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant border-outline-variant border p-12 text-center">
            {works.length === 0
              ? "Nu există încă lucrări publicate."
              : "Nicio lucrare nu corespunde filtrelor alese."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.slug} className="group flex flex-col">
                <div className="border-outline-variant group-hover:border-primary relative aspect-[4/3] w-full overflow-hidden border transition-colors">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-5">
                  {item.name}
                </h2>
                <p className="font-technical-data text-technical-data text-on-surface-variant mt-2">
                  {item.category}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
