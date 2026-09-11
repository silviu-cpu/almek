"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

/*
 * three.js + React Three Fiber cantaresc cateva sute de KB. Incarcate dinamic si
 * fara SSR, nu intra in bundle-ul initial si nu intarzie primul ecran: textul
 * hero-ului apare imediat, iar scena se aprinde in spate cand e gata.
 * `ssr: false` e permis doar intr-un Client Component — de aceea exista acest fisier.
 */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Fara WebGL (browsere vechi, GPU blocat) scena pur si simplu lipseste; hero-ul ramane intact. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroSceneLoader(props: { trackId: string; modelUrl: string | null }) {
  return (
    <SceneBoundary>
      <HeroScene {...props} />
    </SceneBoundary>
  );
}
