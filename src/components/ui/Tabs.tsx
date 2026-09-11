"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  /** Continutul butonului: text, sau imagine + text. */
  tab: ReactNode;
  /** Panoul, randat de pagina (Server Component) si trimis gata facut. */
  panel: ReactNode;
};

/*
 * Doua asezari, aceeasi mecanica:
 * - vertical: lista in stanga, continutul in dreapta; pe mobil lista devine un
 *   rand orizontal derulabil deasupra continutului.
 * - horizontal: butoane mari (cu imagine) pe un rand, peste un panou incadrat.
 */
const STYLES = {
  vertical: {
    root: "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-gutter",
    list: "border-outline-variant flex overflow-x-auto border-b [scrollbar-width:none] md:col-span-4 md:flex-col md:self-start md:overflow-visible md:border-r md:border-b-0",
    /* Bara activa: jos pe mobil, in dreapta pe desktop. `-mr-px` o aseaza
       peste linia listei. */
    tab: "font-body-md text-body-md w-56 shrink-0 cursor-pointer border-b-2 px-4 py-3 text-left transition-colors md:-mr-px md:w-auto md:border-r-2 md:border-b md:border-b-outline-variant md:py-4",
    active: "border-primary text-on-surface font-bold",
    idle: "text-on-surface-variant hover:text-on-surface border-transparent",
    panels: "md:col-span-8",
  },
  horizontal: {
    root: "flex flex-col",
    list: "border-primary flex justify-start gap-1 overflow-x-auto border-b-2 [scrollbar-width:none] sm:justify-center",
    tab: "font-technical-data text-technical-data flex w-32 shrink-0 cursor-pointer flex-col items-center gap-3 px-3 pt-4 pb-3 tracking-widest uppercase transition-colors sm:w-44",
    active: "bg-primary-container text-on-primary-container",
    idle: "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low",
    panels:
      "border-outline-variant bg-surface-container-low/80 border border-t-0 p-6 md:p-10",
  },
} as const;

/**
 * Taburi accesibile, dupa modelul ARIA: `role="tablist"`/`tab`/`tabpanel`,
 * `tabIndex` itinerant (doar tabul activ e in ordinea Tab-ului), sagetile pe
 * ambele axe — lista verticala devine orizontala pe mobil —, Home si End.
 *
 * Toate panourile sunt randate si doar ascunse cu `hidden`, deci tot textul
 * ajunge in HTML-ul initial.
 */
export function Tabs({
  items,
  label,
  orientation = "vertical",
}: {
  items: TabItem[];
  label: string;
  orientation?: keyof typeof STYLES;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const s = STYLES[orientation];

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(e.key in targets)) return;
    e.preventDefault();
    select(targets[e.key]);
  };

  return (
    <div className={s.root}>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={s.list}>
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(s.tab, selected ? s.active : s.idle)}
            >
              {item.tab}
            </button>
          );
        })}
      </div>

      <div className={s.panels}>
        {items.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
          >
            {item.panel}
          </div>
        ))}
      </div>
    </div>
  );
}
