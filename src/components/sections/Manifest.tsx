import Image from "next/image";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { ecosiaNote, features, images, stats } from "@/lib/content";

export function Manifest() {
  return (
    <section
      id="despre"
      /* pb suplimentar: imaginea decalata (-bottom-12) iese din sectiune si ar
         calca peste continutul sectiunii urmatoare. */
      className="section-timeline relative overflow-hidden py-32 md:pb-44"
    >
      <SectionRule />

      <div className="shell grid grid-cols-12 gap-gutter">

      <div className="relative z-10 col-span-12 md:col-span-5">
        <TechLabel className="mb-2">{"Reconectează-te cu natura"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
          {"O reîntoarcere la simplitate."}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
          {
            "Privită ca pe o reîntoarcere la natură, casa din lemn are intenția de a-i face pe oameni să abordeze un stil de viață simplu și sănătos, menit să le prelungească durata de viață."
          }
        </p>
        <ul className="mb-12 flex flex-wrap gap-x-6 gap-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-2"
            >
              <span aria-hidden className="bg-primary size-[2px] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <dl className="border-outline-variant grid grid-cols-2 gap-8 border-t pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dd className="font-display-lg text-primary text-[48px] leading-none">
                {stat.value}
              </dd>
              <dt className="font-technical-data text-technical-data text-on-surface-variant uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="font-technical-data text-technical-data text-on-surface-variant border-outline-variant mt-8 border-t pt-6">
          {ecosiaNote}
        </p>
      </div>

      <div className="relative col-span-12 md:col-span-7">
        <div className="border-outline-variant bg-surface-container-low relative z-10 aspect-[4/3] w-full overflow-hidden border p-2 shadow-2xl">
          <div className="relative h-full w-full">
            <span className="font-technical-data text-technical-data text-on-surface bg-surface-container-highest/90 absolute top-4 right-4 z-20 px-2 py-1">
              {"DET_JOINERY_01.A"}
            </span>
            <Image
              src={images.joineryDetail}
              alt="Detaliu de îmbinare a grinzilor din lemn masiv, execuție ALMEK"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
            />
          </div>
        </div>
        <div className="border-outline-variant bg-surface-container-high absolute -bottom-12 -left-12 z-20 hidden aspect-square w-1/2 border p-2 shadow-2xl md:block">
          <div className="relative h-full w-full">
            <Image
              src={images.timberMacro}
              alt="Macro cu fibra lemnului de rășinoase folosit în construcție"
              fill
              sizes="29vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
