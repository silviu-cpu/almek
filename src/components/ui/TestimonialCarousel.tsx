"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/lib/content";

/**
 * Carusel de recenzii pe scroll-snap nativ, nu pe Swiper.
 *
 * Pentru sapte slide-uri de text, containerul care se deruleaza face aproape
 * tot: derularea din tastatura, din touch si din trackpad vin din browser, iar
 * daca JS nu porneste banda ramane parcurgabila. Swiper ne-a costat deja o zi
 * cu initializarea buclei, si aici nu ar aduce nimic in plus.
 *
 * Slide-urile sunt intr-un rand flex, deci toate primesc inaltimea celui mai
 * inalt — de aici si motivul pentru care caruselul rezolva problema initiala:
 * recenziile au lungimi foarte diferite, iar in grila cartonasele ieseau
 * inegale.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  /* Indexul activ se afla din pozitia reala de scroll, nu dintr-un contor
     propriu: altfel derularea cu degetul sau cu trackpad-ul ar desincroniza
     punctele de sub carusel. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isFinite(index)) setActive(index);
        }
      },
      { root: track, threshold: 0.6 },
    );

    for (const slide of track.children) observer.observe(slide);
    return () => observer.disconnect();
  }, [items.length]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;

    /* Blocul global `prefers-reduced-motion` din globals.css nu atinge
       `scrollTo`, deci verificarea se face aici. */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const arrow =
    "border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div
      className="relative z-10"
      aria-roledescription="carusel"
      aria-label="Recenzii de la clienți"
    >
      <ul
        ref={trackRef}
        /* `tabIndex` face regiunea derulabila accesibila din tastatura — fara
           el, cine navigheaza cu Tab nu poate ajunge la continutul ascuns. */
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-gutter overflow-x-auto focus-visible:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <li
            key={item.author}
            data-index={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} din ${items.length}`}
            className="w-full shrink-0 snap-start md:w-[calc(50%-var(--spacing-gutter)/2)]"
          >
            <figure className="border-outline-variant flex h-full flex-col justify-between border p-8 sm:p-10">
              <Quote
                size={28}
                strokeWidth={1.5}
                aria-hidden
                className="text-primary mb-6 shrink-0"
              />
              <blockquote className="font-body-lg text-body-lg text-on-surface mb-8 flex-1 italic">
                {`„${item.quote}”`}
              </blockquote>
              <figcaption className="border-outline-variant border-t pt-5">
                <span className="font-technical-data text-technical-data text-primary block tracking-widest uppercase">
                  {item.author}
                </span>
                <span className="font-technical-data text-on-surface-variant mt-1 block text-xs">
                  {item.role}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Recenzia anterioară"
            className={arrow}
          >
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active >= items.length - 1}
            aria-label="Recenzia următoare"
            className={arrow}
          >
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.author}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Mergi la recenzia ${index + 1}`}
              aria-current={index === active || undefined}
              className={`h-1 cursor-pointer transition-all ${
                index === active
                  ? "bg-primary w-8"
                  : "bg-outline-variant hover:bg-primary w-4"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
