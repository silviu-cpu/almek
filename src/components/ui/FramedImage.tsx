import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

/**
 * Imagine in rama cu bordura si umbra — acelasi tratament ca in sectiunile
 * Manifest si Interioare de pe homepage. `aspect` fixeaza proportia ramei;
 * imaginea o umple cu `object-cover`.
 */
export function FramedImage({
  src,
  alt,
  sizes,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  aspect?: string;
  className?: string;
}) {
  return (
    /* `cn`, nu concatenare: un apelant care trimite alt `bg-*` trebuie sa-l
       inlocuiasca pe cel implicit, altfel castiga ordinea din CSS. */
    <div
      className={cn(
        "border-outline-variant bg-surface-container-low border p-2 shadow-2xl",
        className,
      )}
    >
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
        />
      </div>
    </div>
  );
}
