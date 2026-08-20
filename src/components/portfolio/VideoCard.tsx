"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import type { FieldVideo } from "@/lib/portfolio";

/**
 * Cardul randeaza doar miniatura pana la click; abia atunci monteaza iframe-ul.
 * Sase iframe-uri YouTube incarcate din start ar aduce cateva sute de KB de
 * JavaScript tert si ar strica LCP-ul paginii.
 *
 * Miniatura vine de pe img.youtube.com si este servita prin `<img>`, nu prin
 * `next/image`: altfel ar trebui adaugat domeniul in `images.remotePatterns`
 * doar pentru sase fisiere.
 */
export function VideoCard({ video }: { video: FieldVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <li className="border-outline-variant flex flex-col border">
      <div className="bg-surface-container-lowest relative aspect-video w-full overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Redă: ${video.title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/20">
              <span className="border-primary bg-primary text-on-primary flex h-16 w-16 items-center justify-center border">
                <Play size={24} strokeWidth={1.5} aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 p-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {video.title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {video.description}
        </p>
      </div>
    </li>
  );
}
