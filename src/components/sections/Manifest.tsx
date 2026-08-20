import { Blocks, Factory, Handshake, Leaf, PencilRuler } from "lucide-react";
import Image from "next/image";

import { Marquee, repeatToFill } from "@/components/ui/Marquee";
import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { ecosiaNote, features, images, stats } from "@/lib/content";

/* Iconul sta aici, nu in content.ts: acolo traieste strict textul. Cheile
   trebuie sa fie identice cu intrarile din `features`. */
const FEATURE_ICONS: Record<string, typeof Leaf> = {
  "Materialele sunt fabricate în România": Factory,
  "Partener cu experienta": Handshake,
  "Materiale ecologice": Leaf,
  "Sistem 100% prefabricat": Blocks,
  "Modele personalizabile": PencilRuler,
};

/** Latimea aproximativa a unui element, folosita ca sa umplem o copie intreaga. */
const STAT_ITEM_WIDTH = 256;
const SECONDS_PER_STAT = 4.5;

/* Doar 4 statistici sunt mai inguste decat cei 1200px ai continutului, deci o
   singura copie ar lasa un gol in bucla. */
const statsTrack = repeatToFill(stats, STAT_ITEM_WIDTH);

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
        <TechLabel className="mb-2">{"Despre noi"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
          {"Reconectează-te cu natura"}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
          {
            "Privită ca pe o reîntoarcere la natură, casa din lemn are intenția de a-i face pe oameni să abordeze un stil de viață simplu și sănătos, menit să le prelungească durata de viață."
          }
        </p>
        <ul className="mb-12 flex flex-col gap-5">
          {features.map((feature) => {
            const Icon = FEATURE_ICONS[feature] ?? Leaf;
            return (
              <li
                key={feature}
                className="font-body-md text-body-md text-on-surface-variant flex items-center gap-4"
              >
                <span className="border-outline-variant text-primary flex h-11 w-11 shrink-0 items-center justify-center border">
                  <Icon size={20} strokeWidth={1.5} aria-hidden />
                </span>
                {feature}
              </li>
            );
          })}
        </ul>

        <p className="font-technical-data text-technical-data text-on-surface-variant border-outline-variant mt-8 border-t pt-6">
          {ecosiaNote}
        </p>
      </div>

      <div className="relative col-span-12 md:col-span-7">
        <div className="border-outline-variant bg-surface-container-low relative z-10 aspect-[4/3] w-full overflow-hidden border p-2 shadow-2xl">
          <div className="relative h-full w-full">
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

      {/* Cifrele au devenit o banda care se deruleaza, ca logo-urile de
          parteneri. Raman aliniate pe acelasi rand — decalajul in zigzag e
          potrivit pentru marci, dar pe perechi cifra/eticheta ar parea o
          greseala de asezare. */}
      <div className="shell relative z-10 mt-20">
        <Marquee seconds={statsTrack.length * SECONDS_PER_STAT}>
          {statsTrack.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="flex w-56 shrink-0 flex-col gap-1 px-8 sm:w-64"
            >
              <span className="font-display-lg text-primary text-[48px] leading-none">
                {stat.value}
              </span>
              <span className="font-technical-data text-technical-data text-on-surface-variant uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
