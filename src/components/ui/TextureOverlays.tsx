/**
 * Straturile globale de textura. Granulatia sta peste tot (z-9999), plansa de
 * desen tehnic sub continut (z-0) — `main` este z-10, header-ul z-100.
 */
export function GrainOverlay() {
  return <div aria-hidden className="grain-overlay" />;
}

/**
 * Axa verticala din spatele intregii pagini. Este `fixed`, deci ramane o
 * singura linie neintrerupta pe toata inaltimea viewportului, indiferent de
 * scroll. Orizontala NU sta aici — ea apartine fiecarei sectiuni, vezi
 * `SectionRule`.
 *
 * Peste linia stinsa stau doua straturi conduse de progresul de scroll al
 * paginii: portiunea aprinsa, care creste de sus in jos, si capul luminos din
 * varful ei. Amandoua sunt invizibile pana cand CSS-ul le aprinde — vezi
 * `axis-progress` / `axis-head` in globals.css.
 */
export function BlueprintBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="bg-tertiary/20 absolute top-0 left-1/2 h-full w-px" />
      <div className="axis-progress bg-primary/40 absolute top-0 left-1/2 h-full w-px" />
      <div className="axis-head bg-primary absolute top-0 left-1/2 h-20 w-px" />
    </div>
  );
}

/**
 * Linia orizontala care inchide o sectiune. Sta exact pe muchia de jos, deci
 * cade intre sectiuni si nu peste continut, si se deruleaza odata cu sectiunea
 * (spre deosebire de axa verticala, care e fixata in viewport). Sectiunea
 * gazda trebuie sa fie `relative` — toate sunt.
 *
 * Nu este un `border-b` pe <section> ca sa ramana la fel de subtire si de
 * aceeasi culoare cu axa verticala, indiferent de tema.
 *
 * Culoarea este `/40` la `opacity: .5`, adica exact `/20` in repaus; cat timp
 * sectiunea traverseaza ecranul, `section-rule-glow` urca opacitatea la 1. Ca
 * sa functioneze, sectiunea gazda trebuie sa poarte si `section-timeline`.
 */
export function SectionRule() {
  return (
    <div
      aria-hidden
      className="section-rule bg-tertiary/40 pointer-events-none absolute bottom-0 left-0 z-0 h-px w-full opacity-50"
    />
  );
}
