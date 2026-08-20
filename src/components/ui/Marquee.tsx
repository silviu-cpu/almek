import type { CSSProperties, ReactNode } from "react";

/**
 * Banda care se deruleaza continuu, pe aceeasi mecanica folosita si la logo-urile
 * de parteneri: continutul este randat de doua ori si pista se deplaseaza cu
 * exact -50%, deci in momentul in care prima copie iese, a doua este in pozitia
 * de start si bucla nu are cusatura. A doua copie este `aria-hidden`, altfel
 * cititoarele de ecran ar enumera totul de doua ori.
 *
 * Regulile de miscare stau in globals.css (`marquee`, `marquee-track`), inclusiv
 * oprirea la `prefers-reduced-motion`.
 *
 * ATENTIE: o copie trebuie sa fie mai lata decat containerul, altfel intre cele
 * doua se vede un gol. Cine are putine elemente le repeta inainte sa le trimita
 * aici — vezi `repeatToFill`.
 */
export function Marquee({
  seconds,
  className = "",
  children,
}: {
  seconds: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ "--marquee-duration": `${seconds}s` } as CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex items-stretch">{children}</div>
        <div aria-hidden className="marquee-copy-duplicate flex items-stretch">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Repeta lista pana cand o copie depaseste latimea continutului (1200px), ca
 * bucla sa nu lase spatiu gol. `itemWidth` este latimea aproximativa a unui
 * element, in px.
 */
export function repeatToFill<T>(items: T[], itemWidth: number): T[] {
  if (items.length === 0) return items;
  const cycles = Math.max(1, Math.ceil(1200 / (items.length * itemWidth)));
  return Array.from({ length: cycles }, () => items).flat();
}
