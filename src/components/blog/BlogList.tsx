"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { FilterDropdown } from "@/components/portfolio/FilterDropdown";
import type { ArticleView } from "@/lib/cms";
import { articleCategories, categoryLabel, formatArticleDate } from "@/lib/blog";

/** Aceeasi conventie ca la celelalte cataloage: lista separata prin virgula. */
const readList = (raw: string | null) =>
  raw ? raw.split(",").filter(Boolean) : [];

export function BlogList({ articles }: { articles: ArticleView[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const categorie = readList(params.get("categorie"));
  const q = params.get("q") ?? "";

  const setParam = (key: string, value: string | null) => {
    const usp = new URLSearchParams(params.toString());
    if (!value) usp.delete(key);
    else usp.set(key, value);
    const query = usp.toString();
    router.replace(query ? `/blog?${query}` : "/blog", { scroll: false });
  };

  const toggle = (id: string) => {
    const next = categorie.includes(id)
      ? categorie.filter((v) => v !== id)
      : [...categorie, id];
    setParam("categorie", next.join(","));
  };

  /* Fara `useMemo`: `readList` produce array-uri noi la fiecare randare, deci
     React Compiler nu ar putea pastra memoizarea si ar renunta sa optimizeze
     tot componentul. */
  const needle = q.trim().toLowerCase();
  const filtered = articles.filter((a) => {
    if (categorie.length && !categorie.includes(a.category)) return false;
    if (needle && !a.title.toLowerCase().includes(needle)) return false;
    return true;
  });

  return (
    <div className="shell relative z-10 pb-32">
      <div className="border-outline-variant divide-outline-variant flex flex-col divide-y border lg:flex-row lg:divide-x lg:divide-y-0">
        <FilterDropdown
          label="Categorie"
          options={articleCategories.map((c) => ({ id: c.id, label: c.label }))}
          selected={categorie}
          onToggle={toggle}
        />

        <label className="flex flex-1 items-center gap-3 px-5 py-4 lg:justify-end">
          <span className="sr-only">{"Caută după titlu"}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Caută după titlu"
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
          {filtered.length === 1 ? " articol" : " articole"}
        </p>
        {categorie.length > 0 || q ? (
          <button
            type="button"
            onClick={() => router.replace("/blog", { scroll: false })}
            className="font-technical-data text-technical-data text-primary cursor-pointer underline underline-offset-4"
          >
            {"Șterge selecțiile"}
          </button>
        ) : null}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant border-outline-variant border p-12 text-center">
            {articles.length === 0
              ? "Nu există încă articole publicate."
              : "Niciun articol nu corespunde filtrelor alese."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => {
              const date = formatArticleDate(article.publishedAt);
              return (
                <li key={article.slug} className="group flex flex-col">
                  <Link href={`/blog/${article.slug}`} className="flex h-full flex-col">
                    <div className="border-outline-variant group-hover:border-primary relative aspect-[4/3] w-full overflow-hidden border transition-colors">
                      <Image
                        src={article.cover.url}
                        alt={article.cover.alt}
                        width={article.cover.width}
                        height={article.cover.height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <p className="font-technical-data text-technical-data text-primary mt-5 tracking-widest uppercase">
                      {categoryLabel(article.category)}
                    </p>
                    <h2 className="font-headline-md text-headline-md text-on-surface mt-2">
                      {article.title}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-3">
                      {article.excerpt}
                    </p>
                    {date ? (
                      <p className="font-technical-data text-on-surface-variant/70 mt-4 text-xs">
                        {date}
                      </p>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
