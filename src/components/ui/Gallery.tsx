"use client";

import Image from "next/image";
import { useState } from "react";

import { FramedImage } from "@/components/ui/FramedImage";
import type { InfoImage } from "@/lib/variante-images";
import { cn } from "@/lib/utils";

/**
 * O imagine mare si miniaturile de sub ea; clickul pe o miniatura o aduce in
 * rama mare. Inlocuieste sliderul de pe live fara autoplay si fara biblioteca.
 *
 * Miniaturile sunt butoane cu `aria-pressed`, nu un tablist: aici nu exista
 * panouri de text, doar o singura imagine care se schimba.
 */
export function Gallery({ images, sizes }: { images: InfoImage[]; sizes: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-3">
      <FramedImage src={current.image} alt={current.alt} sizes={sizes} />

      <ul className="grid grid-cols-5 gap-2">
        {images.map((img, i) => {
          const selected = i === active;
          return (
            <li key={img.alt}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                aria-label={`Imaginea ${i + 1} din ${images.length}: ${img.alt}`}
                className={cn(
                  "relative block aspect-[4/3] w-full cursor-pointer overflow-hidden border transition-opacity",
                  selected
                    ? "border-primary opacity-100"
                    : "border-outline-variant opacity-60 hover:opacity-100",
                )}
              >
                <Image src={img.image} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
