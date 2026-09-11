/*
 * Progresul prin pista de derulare a hero-ului, comun scenei 3D si indicatorului
 * "scroll to explore" — ca bara de progres sa arate exact cat s-a construit.
 */

/**
 * Cat din pista ocupa constructia. Restul tine casa terminata pe ecran, ca
 * pagina sa porneasca mai departe abia dupa ce ultima piesa a aterizat — fara
 * rezerva, cu amortizarea, ultimele piese ar fi cazut in timp ce hero-ul pleca.
 * Pista are 400vh, deci cei 15% ramasi inseamna tot ~45vh de pauza.
 */
export const BUILD_END = 0.85;

/** 0 cand pista incepe sa fie derulata, 1 cand ecranul fixat se elibereaza. */
export function trackProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const range = rect.height - window.innerHeight;
  if (range <= 0) return 0;
  return Math.min(Math.max(-rect.top / range, 0), 1);
}

/** Progresul constructiei: ajunge la 1 la `BUILD_END` din pista, nu la capatul ei. */
export function buildProgress(track: number): number {
  return Math.min(track / BUILD_END, 1);
}
