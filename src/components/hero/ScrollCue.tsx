"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import { buildProgress, trackProgress } from "./track";

/**
 * Indicatorul de derulare din hero: text in culoarea de accent, sageata care
 * sare (doar fara `prefers-reduced-motion`) si o bara care se umple pe masura ce
 * se construieste casa — plina inseamna constructie terminata.
 *
 * Umplerea se scrie direct pe stil printr-un ref, nu prin state: un re-render la
 * fiecare eveniment de scroll ar fi risipa pentru o singura proprietate CSS. Se
 * scrie `scale`, nu `transform` — `scale-x-0` din Tailwind v4 foloseste
 * proprietatea `scale`, iar un `transform` adaugat s-ar inmulti cu ea (tot 0).
 */
export function ScrollCue({ trackId }: { trackId: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = document.getElementById(trackId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (fillRef.current) fillRef.current.style.scale = `${buildProgress(trackProgress(el))} 1`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [trackId]);

  return (
    <div className="flex items-center gap-4">
      <span aria-hidden className="bg-outline-variant relative hidden h-0.5 w-40 overflow-hidden sm:block">
        <span ref={fillRef} className="bg-primary absolute inset-0 origin-left scale-x-0" />
      </span>
      <span className="font-technical-data text-technical-data text-primary flex items-center gap-2 font-bold tracking-widest">
        {"SCROLL TO EXPLORE_"}
        <ChevronDown size={18} strokeWidth={2} aria-hidden className="motion-safe:animate-bounce" />
      </span>
    </div>
  );
}
