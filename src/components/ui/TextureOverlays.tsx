/**
 * Straturile globale de textura. Granulatia sta peste tot (z-9999), textura de
 * lemn sub continut (z-1) — `main` este z-10.
 */
export function GrainOverlay() {
  return <div aria-hidden className="grain-overlay" />;
}

export function WoodOverlay() {
  return <div aria-hidden className="wood-overlay" />;
}
