import type { Metadata } from "next";

import { PriceCard, TextSection } from "@/components/info/InfoBlocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { processIntro, processNotes, wallTypes } from "@/lib/info";

export const metadata: Metadata = {
  title: "Procesul tehnologic | ALMEK",
  description:
    "Cele trei variante de perete — simplu, lambrisat și dublu — cu grosimi, coeficienți de transfer termic și prețuri orientative.",
};

export default function ProcesulTehnologicPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="Procesul tehnologic"
        intro={processIntro}
      />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10 flex flex-col gap-20">
          {wallTypes.map((wall) => (
            <article key={wall.id} id={wall.id} className="flex flex-col gap-6">
              <div>
                <span className="font-technical-data text-technical-data text-primary tracking-widest uppercase">
                  {wall.label}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-2 max-w-3xl">
                  {wall.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                {wall.variants.map((variant) => (
                  <PriceCard
                    key={variant.price}
                    title={variant.summary}
                    price={variant.price}
                  >
                    <ul className="flex flex-col gap-1">
                      {variant.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </PriceCard>
                ))}
              </div>

              {wall.layers ? (
                <div className="border-outline-variant border-t pt-6">
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

              {wall.note ? (
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  {wall.note}
                </p>
              ) : null}
            </article>
          ))}

          <div className="border-outline-variant grid grid-cols-1 gap-x-gutter gap-y-14 border-t pt-14 md:grid-cols-2">
            {processNotes.map((section) => (
              <TextSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
