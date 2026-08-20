import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { images } from "@/lib/content";

export function Interiors() {
  return (
    <section
      id="interioare"
      className="section-timeline bg-secondary-container relative overflow-hidden py-32"
    >
      <SectionRule />

      {/* Fundalul verde acopera axa fixa din spatele paginii (`main` este z-10,
          axa z-0), asa ca sectiunea isi deseneaza propriul segment pe aceeasi
          coordonata. Fara el coloana s-ar rupe in dreptul blocului verde. */}
      <div
        aria-hidden
        className="bg-on-secondary-container/20 pointer-events-none absolute top-0 left-1/2 z-0 h-full w-px"
      />

      <div className="shell grid grid-cols-12 items-center gap-gutter">

      <div className="order-2 col-span-12 md:order-1 md:col-span-7">
        <div className="border-outline-variant bg-surface-container relative border p-2 shadow-2xl">
          <div className="relative aspect-video w-full">
            <Image
              src={images.interior44}
              alt="Amenajare interioară din lemn realizată de ALMEK"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover grayscale-[0.1] transition-all duration-1000 hover:grayscale-0"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 order-1 col-span-12 flex flex-col justify-center md:order-2 md:col-span-5">
        <TechLabel className="mb-4">{"Amenajări interioare"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 leading-tight">
          {"Totul făcut din pasiune"}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          {
            "La noi, amenajările interioare sunt artă, și fiecare spațiu este o pagină într-o carte de poveste. Aducem calitatea și eleganța în fiecare cameră a casei tale, iar fiecare detaliu este pus la punct ca la carte."
          }
        </p>
        {/* Era un `<div>` cu cursor-pointer — inaccesibil la tastatura. */}
        <a
          href="#proiecte"
          className="group flex w-fit items-center gap-4"
        >
          <span className="border-primary text-primary group-hover:bg-primary group-hover:text-on-primary flex h-12 w-12 items-center justify-center rounded-full border transition-all">
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="font-technical-data text-technical-data text-primary tracking-widest uppercase">
            {"Explorează galeria"}
          </span>
        </a>
      </div>
      </div>
    </section>
  );
}
