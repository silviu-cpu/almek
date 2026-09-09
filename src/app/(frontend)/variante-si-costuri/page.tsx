import type { Metadata } from "next";
import Link from "next/link";

import { PriceCard, PriceDisclaimer } from "@/components/info/InfoBlocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { priceGroups } from "@/lib/info";

export const metadata: Metadata = {
  title: "Variante și costuri | ALMEK",
  description:
    "Costuri orientative pentru case din lemn, căsuțe de grădină, terase, foișoare și mobilier din lemn masiv.",
};

export default function VarianteSiCosturiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="Variante și costuri"
        intro="Costuri orientative pe metru pătrat, în funcție de varianta constructivă aleasă."
      >
        <nav aria-label="Categorii" className="mt-10 flex flex-wrap gap-3">
          {priceGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="border-outline-variant text-on-surface hover:border-primary hover:text-primary font-technical-data text-technical-data border px-4 py-2 tracking-widest uppercase transition-colors"
            >
              {group.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10 flex flex-col gap-24">
          {priceGroups.map((group) => (
            <article
              key={group.id}
              id={group.id}
              className="flex scroll-mt-32 flex-col gap-6"
            >
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {group.title}
              </h2>

              <div className="max-w-3xl space-y-4">
                {group.intro.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="font-body-lg text-body-lg text-on-surface-variant"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {group.options.length > 0 ? (
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                  {group.options.map((option) => (
                    <PriceCard
                      key={option.title}
                      title={option.title}
                      price={option.price}
                    >
                      <p>{option.description}</p>
                    </PriceCard>
                  ))}
                </div>
              ) : null}

              {/* Mentiunea sta imediat sub preturi, nu la finalul paginii. */}
              {group.disclaimer ? (
                <PriceDisclaimer>{group.disclaimer}</PriceDisclaimer>
              ) : null}

              {group.included ? (
                <div className="border-outline-variant border-t pt-8">
                  <h3 className="font-technical-data text-technical-data text-on-surface-variant tracking-widest uppercase">
                    {group.included.title}
                  </h3>
                  <ul className="mt-6 grid grid-cols-1 gap-x-gutter gap-y-3 md:grid-cols-2">
                    {group.included.items.map((item) => (
                      <li
                        key={item.slice(0, 32)}
                        className="font-body-md text-body-md text-on-surface-variant flex gap-3"
                      >
                        <span aria-hidden className="bg-primary mt-3 size-[2px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}

          <p className="font-body-lg text-body-lg text-on-surface-variant border-outline-variant border-t pt-12">
            {"Pentru o ofertă adaptată proiectului tău, "}
            <Link href="/#contact" className="text-primary underline underline-offset-4">
              {"scrie-ne"}
            </Link>
            {" — doar așa putem identifica soluțiile potrivite."}
          </p>
        </div>
      </section>
    </>
  );
}
