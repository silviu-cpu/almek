import type { Metadata } from "next";
import Link from "next/link";

import { PriceCard, PriceDisclaimer } from "@/components/info/InfoBlocks";
import { FramedImage } from "@/components/ui/FramedImage";
import { Gallery } from "@/components/ui/Gallery";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { priceGroups, type PriceBlock, type PriceGroup } from "@/lib/info";
import type { InfoImage } from "@/lib/variante-images";

export const metadata: Metadata = {
  title: "Variante și costuri | ALMEK",
  description:
    "Costuri orientative pentru case din lemn, căsuțe de grădină, terase, foișoare și mobilier din lemn masiv.",
};

/* Coloana de imagini ocupa 5/12 din panou, iar shell-ul se opreste la 1200px. */
const IMAGE_SIZES = "(min-width: 1200px) 440px, (min-width: 768px) 38vw, 100vw";

/**
 * Pana la doua imagini stau una sub alta (la case: randarea si sectiunea se
 * citesc impreuna). De la trei in sus devin galerie, altfel coloana ar fi mai
 * lunga decat textul de langa ea de cateva ori.
 */
function ImageColumn({ images }: { images: InfoImage[] }) {
  if (images.length > 2) return <Gallery images={images} sizes={IMAGE_SIZES} />;
  return (
    <div className="flex flex-col gap-gutter">
      {images.map((img) => (
        <FramedImage key={img.alt} src={img.image} alt={img.alt} sizes={IMAGE_SIZES} />
      ))}
    </div>
  );
}

function BlockRow({ block }: { block: PriceBlock }) {
  return (
    <div className="grid grid-cols-12 gap-gutter gap-y-8">
      <div className="col-span-12 flex flex-col gap-5 md:col-span-7">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">{block.title}</h3>
          {block.subtitle ? (
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              {block.subtitle}
            </p>
          ) : null}
        </div>

        <div
          className={
            block.options.length === 1 ? "grid gap-gutter" : "grid gap-gutter sm:grid-cols-2"
          }
        >
          {block.options.map((option) => (
            <PriceCard key={option.title + option.price} title={option.title} price={option.price}>
              <p>{option.description}</p>
            </PriceCard>
          ))}
        </div>

        {block.note ? (
          <p className="font-body-md text-body-md text-on-surface-variant">{block.note}</p>
        ) : null}
      </div>

      <div className="col-span-12 md:col-span-5">
        <ImageColumn images={block.images} />
      </div>
    </div>
  );
}

function GroupPanel({ group }: { group: PriceGroup }) {
  const intro = (
    <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface">{group.title}</h2>
      <div className="mt-4 max-w-3xl space-y-4">
        {group.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="font-body-lg text-body-lg text-on-surface-variant">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12">
      {group.introImages ? (
        <div className="grid grid-cols-12 items-center gap-gutter gap-y-8">
          <div className="col-span-12 md:col-span-7">{intro}</div>
          <div className="col-span-12 md:col-span-5">
            <ImageColumn images={group.introImages} />
          </div>
        </div>
      ) : (
        intro
      )}

      {group.blocks.map((block) => (
        <div key={block.title} className="border-outline-variant border-t pt-12">
          <BlockRow block={block} />
        </div>
      ))}

      {/* Mentiunea sta imediat sub preturi, nu la finalul paginii. */}
      {group.disclaimer ? <PriceDisclaimer>{group.disclaimer}</PriceDisclaimer> : null}

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
    </div>
  );
}

export default function VarianteSiCosturiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="Variante și costuri"
        intro="Costuri orientative pe metru pătrat, în funcție de varianta constructivă aleasă."
      />

      <section className="section-timeline relative overflow-hidden py-24 pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          {/* Un tab pe categorie, ca pe live. Inlocuieste bara de ancore de
              dinainte: patru categorii lungi una sub alta faceau pagina de
              cateva ecrane, iar vizitatorul cauta de obicei una singura. */}
          <Tabs
            label="Categorii"
            orientation="horizontal"
            items={priceGroups.map((group) => ({
              id: group.id,
              tab: group.tab,
              panel: <GroupPanel group={group} />,
            }))}
          />

          <p className="font-body-lg text-body-lg text-on-surface-variant mt-16">
            {"Pentru o ofertă adaptată proiectului tău, "}
            <Link href="/contact" className="text-primary underline underline-offset-4">
              {"scrie-ne"}
            </Link>
            {" — doar așa putem identifica soluțiile potrivite."}
          </p>
        </div>
      </section>
    </>
  );
}
