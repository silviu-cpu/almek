"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { FilterDropdown } from "@/components/portfolio/FilterDropdown";
import {
  areaRanges,
  buildingTypes,
  levelOptions,
  levelsOf,
  projects,
  type Project,
} from "@/lib/portfolio";

const SORTS = {
  "suprafata-desc": {
    label: "Suprafață descrescător",
    compare: (a: Project, b: Project) => b.builtArea - a.builtArea,
  },
  "suprafata-asc": {
    label: "Suprafață crescător",
    compare: (a: Project, b: Project) => a.builtArea - b.builtArea,
  },
  nume: {
    label: "Alfabetic",
    compare: (a: Project, b: Project) => a.name.localeCompare(b.name, "ro"),
  },
} as const;

type SortId = keyof typeof SORTS;
const DEFAULT_SORT: SortId = "suprafata-desc";

/** Filtrele sunt multiple, deci in URL stau ca lista separata prin virgula. */
const readList = (raw: string | null) =>
  raw ? raw.split(",").filter(Boolean) : [];

export function ProjectsCatalog() {
  const router = useRouter();
  const params = useSearchParams();

  const tip = readList(params.get("tip"));
  const nivel = readList(params.get("nivel"));
  const suprafata = readList(params.get("suprafata"));
  const q = params.get("q") ?? "";
  const rawSort = params.get("sort");
  const sort: SortId = rawSort && rawSort in SORTS ? (rawSort as SortId) : DEFAULT_SORT;

  /* `replace`, nu `push`: altfel fiecare bifa ar adauga o intrare in istoric si
     butonul Back ar trebui apasat de zece ori ca sa iasa din pagina. */
  const commit = (usp: URLSearchParams) => {
    const query = usp.toString();
    router.replace(query ? `/proiecte?${query}` : "/proiecte", { scroll: false });
  };

  const setParam = (key: string, value: string | null) => {
    const usp = new URLSearchParams(params.toString());
    if (!value) usp.delete(key);
    else usp.set(key, value);
    commit(usp);
  };

  const toggle = (key: string, id: string) => {
    const current = readList(params.get(key));
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];
    setParam(key, next.join(","));
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const ranges = areaRanges.filter((r) => suprafata.includes(r.id));

    return projects
      .filter((p) => {
        if (tip.length && !tip.includes(p.buildingType)) return false;
        if (nivel.length && !nivel.includes(levelsOf(p))) return false;
        if (
          ranges.length &&
          !ranges.some((r) => p.builtArea >= r.min && p.builtArea < r.max)
        )
          return false;
        if (needle && !p.name.toLowerCase().includes(needle)) return false;
        return true;
      })
      .sort(SORTS[sort].compare);
  }, [tip, nivel, suprafata, q, sort]);

  /* Chipsurile de sub bara: fiecare selectie activa, cu × care o scoate. */
  const active = [
    ...tip.map((v) => ({ key: "tip", value: v, label: v })),
    ...nivel.map((v) => ({ key: "nivel", value: v, label: v })),
    ...suprafata.map((v) => ({
      key: "suprafata",
      value: v,
      label: areaRanges.find((r) => r.id === v)?.label ?? v,
    })),
  ];

  return (
    <div className="shell relative z-10 pb-32">
      {/* Bara de filtre: celule despartite de linii verticale, cu cautarea in
          capatul din dreapta. */}
      <div className="border-outline-variant divide-outline-variant flex flex-col divide-y border lg:flex-row lg:divide-x lg:divide-y-0">
        <FilterDropdown
          label="Tip construcție"
          options={buildingTypes.map((t) => ({ id: t, label: t }))}
          selected={tip}
          onToggle={(id) => toggle("tip", id)}
        />
        <FilterDropdown
          label="Nivel"
          options={levelOptions.map((l) => ({ id: l, label: l }))}
          selected={nivel}
          onToggle={(id) => toggle("nivel", id)}
        />
        <FilterDropdown
          label="Suprafață"
          options={areaRanges.map((r) => ({ id: r.id, label: r.label }))}
          selected={suprafata}
          onToggle={(id) => toggle("suprafata", id)}
        />

        <label className="flex flex-1 items-center gap-3 px-5 py-4 lg:justify-end">
          <span className="sr-only">{"Caută după numele proiectului"}</span>
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
          {filtered.length === 1 ? " proiect" : " proiecte"}
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
            onClick={() => router.replace("/proiecte", { scroll: false })}
            className="font-technical-data text-technical-data text-primary cursor-pointer underline underline-offset-4"
          >
            {"Șterge selecțiile"}
          </button>
        </div>
      ) : null}

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant border-outline-variant border p-12 text-center">
            {"Niciun proiect nu corespunde filtrelor alese."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/proiecte/${project.slug}`}
                  className="group flex h-full flex-col"
                >
                  <div className="border-outline-variant group-hover:border-primary relative aspect-[4/3] w-full overflow-hidden border transition-colors">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mt-5">
                    {project.name}
                  </h2>
                  <p className="font-technical-data text-technical-data text-on-surface-variant mt-2">
                    {`Suprafață: ${project.builtArea} m² · ${levelsOf(project)}`}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
