import type { Metadata } from "next";
import Image from "next/image";

import { PriceCard, PriceDisclaimer, TextSection } from "@/components/info/InfoBlocks";
import { FramedImage } from "@/components/ui/FramedImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { processIntro, processNotes, wallTypes, type WallType } from "@/lib/info";

export const metadata: Metadata = {
  title: "Procesul tehnologic | ALMEK",
  description:
    "Cele trei variante de perete — simplu, lambrisat și dublu — cu grosimi, coeficienți de transfer termic și prețuri orientative.",
};

/** Panoul unui tip de perete: preturile si straturile in stanga, randarile in dreapta. */
function WallPanel({ wall }: { wall: WallType }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{wall.name}</h2>
        <p className="font-headline-md text-headline-md text-on-surface-variant mt-2">
          {wall.title}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-gutter gap-y-10">
        <div className="col-span-12 flex flex-col gap-6 md:col-span-7">
          {wall.variants.map((variant) => (
            <PriceCard key={variant.price} title={variant.summary} price={variant.price}>
              <ul className="flex flex-col gap-1">
                {variant.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </PriceCard>
          ))}

          {wall.layers ? (
            <div>
              <h3 className="font-technical-data text-technical-data text-on-surface-variant tracking-widest uppercase">
                {"Straturile peretelui"}
              </h3>
              <ol className="font-body-md text-body-md text-on-surface-variant mt-4 flex flex-col gap-2">
                {wall.layers.map((layer, i) => (
                  <li key={layer + i} className="flex gap-3">
                    <span className="font-technical-data text-primary shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {layer}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {wall.note ? <PriceDisclaimer>{wall.note}</PriceDisclaimer> : null}
        </div>

        <div className="col-span-12 flex flex-col gap-gutter md:col-span-5">
          {wall.images.map((img) => (
            <FramedImage
              key={img.alt}
              src={img.image}
              alt={img.alt}
              sizes="(min-width: 1200px) 440px, (min-width: 768px) 38vw, 100vw"
              aspect="aspect-[7/6]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcesulTehnologicPage() {
  return (
    <>
      <PageHeader eyebrow="Informații" title="Procesul tehnologic" intro={processIntro} />

      <section className="section-timeline relative overflow-hidden py-24">
        <SectionRule />

        <div className="shell relative z-10">
          {/* Cate un tab pe tip de perete, ca pe live: iconita cu randarea
              peretelui deasupra etichetei, iar sub ele panoul variantei. */}
          <Tabs
            label="Variante de perete"
            orientation="horizontal"
            items={wallTypes.map((wall) => ({
              id: wall.id,
              tab: (
                <>
                  {/* alt gol: eticheta de dedesubt numeste deja tabul. */}
                  <Image
                    src={wall.images[0].image}
                    alt=""
                    sizes="96px"
                    className="h-16 w-auto object-contain sm:h-20"
                  />
                  {wall.label}
                </>
              ),
              panel: <WallPanel wall={wall} />,
            }))}
          />
        </div>
      </section>

      <section className="section-timeline relative overflow-hidden pb-32 pt-24">
        <SectionRule />

        {/* Una sub alta, fiecare cu textul in stanga si imaginea in dreapta.
            Detaliul decalat iese cu -bottom-12 sub rama; `gap-24` dintre
            randuri si `pb-32` ii fac loc. */}
        <div className="shell relative z-10 flex flex-col gap-24 md:gap-32">
          {processNotes.map((note) => {
            const [main, detail] = note.images;
            return (
              <div
                key={note.title}
                className="grid grid-cols-12 items-center gap-gutter gap-y-10"
              >
                <div className="col-span-12 md:col-span-6">
                  <TextSection section={note} />
                </div>

                <div className="relative col-span-12 md:col-span-5 md:col-start-8">
                  <FramedImage
                    src={main.image}
                    alt={main.alt}
                    sizes="(min-width: 1200px) 500px, (min-width: 768px) 42vw, 100vw"
                    className="relative z-10"
                  />
                  {detail ? (
                    <FramedImage
                      src={detail.image}
                      alt={detail.alt}
                      sizes="(min-width: 1200px) 210px, 18vw"
                      aspect="aspect-square"
                      className="bg-surface-container-high absolute -bottom-12 -left-12 z-20 hidden w-5/12 md:block"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
