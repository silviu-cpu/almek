import { ArrowUpRight, Handshake, Leaf, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FramedImage } from "@/components/ui/FramedImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { stats } from "@/lib/content";
import {
  aboutIntro,
  aboutIntroImages,
  aboutLead,
  aboutStory,
  aboutValues,
} from "@/lib/info";

export const metadata: Metadata = {
  title: "Despre noi | ALMEK",
  description:
    "Tâmplărie și dulgherie din lemn: case de locuit, căsuțe de vacanță și de grădină, mobilier și amenajări interioare.",
};

/* Iconul sta aici, nu in info.ts: acolo traieste strict textul. Cheile trebuie
   sa fie identice cu titlurile din `aboutValues`. */
const VALUE_ICONS: Record<string, typeof Leaf> = {
  "Grijă față de mediul înconjurător": Leaf,
  "Profesionalism în relația cu furnizorii": Handshake,
  "Țintă spre rezultate excelente": Target,
  "Respectul față de angajați": Users,
};

/* Shell-ul se opreste la 1200px, deci peste latimea aceea imaginile nu mai cresc. */
const STORY_SIZES = "(min-width: 1200px) 500px, (min-width: 768px) 42vw, 100vw";

export default function DespreNoiPage() {
  const [firstIntro, ...restIntro] = aboutIntro;

  return (
    <>
      <PageHeader eyebrow="Informații" title="Despre noi" intro={aboutLead} />

      {/* pb suplimentar: detaliul decalat (-bottom-12) iese din rama mare si ar
          calca peste sectiunea urmatoare. */}
      <section className="section-timeline relative overflow-hidden py-24 md:pb-40">
        <SectionRule />

        <div className="shell relative z-10 grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 flex flex-col gap-6 md:col-span-5">
            <p className="font-headline-md text-headline-md text-on-surface">
              {firstIntro}
            </p>
            {restIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative col-span-12 md:col-span-7">
            <FramedImage
              src={aboutIntroImages.main.image}
              alt={aboutIntroImages.main.alt}
              sizes="(min-width: 1200px) 700px, (min-width: 768px) 58vw, 100vw"
              className="relative z-10"
            />
            <FramedImage
              src={aboutIntroImages.detail.image}
              alt={aboutIntroImages.detail.alt}
              sizes="(min-width: 1200px) 300px, 25vw"
              aspect="aspect-square"
              className="bg-surface-container-high absolute -bottom-12 -left-12 z-20 hidden w-5/12 md:block"
            />
          </div>
        </div>
      </section>

      <section className="section-timeline relative overflow-hidden py-24">
        <SectionRule />

        <div className="shell relative z-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            {"Angajamentul nostru"}
          </h2>

          {/* Zigzag: imaginea alterneaza dreapta / stanga. Pe mobil fiecare bloc
              ramane text-apoi-imagine; `order` schimba doar desktopul. Coloana
              goala dintre text si imagine vine din `col-start`, nu din gap. */}
          <div className="mt-16 flex flex-col gap-24 md:gap-32">
            {aboutStory.map((block, i) => {
              const imageLeft = i % 2 === 1;
              const [lead, ...rest] = block.body;
              const isQuote = i === 0;

              return (
                <div
                  key={block.alt}
                  className="grid grid-cols-12 items-center gap-gutter"
                >
                  <div
                    className={`col-span-12 flex flex-col gap-5 md:col-span-6 ${
                      imageLeft ? "md:order-2 md:col-start-7" : ""
                    }`}
                  >
                    {isQuote ? (
                      <blockquote className="border-primary font-headline-md text-headline-md text-on-surface border-l-2 pl-6">
                        {lead}
                      </blockquote>
                    ) : (
                      <p className="font-body-lg text-body-lg text-on-surface-variant">
                        {lead}
                      </p>
                    )}
                    {rest.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="font-body-lg text-body-lg text-on-surface-variant"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div
                    className={`col-span-12 md:col-span-5 ${
                      imageLeft ? "md:order-1" : "md:col-start-8"
                    }`}
                  >
                    <FramedImage
                      src={block.image}
                      alt={block.alt}
                      sizes={STORY_SIZES}
                      aspect="aspect-[4/5]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-timeline relative overflow-hidden py-24 pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          {/* Aceleasi cifre ca in banda de pe homepage, dar statice: sunt doar
              patru si incap pe un rand. */}
          <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-outline-variant flex flex-col gap-2 border-l pl-6"
              >
                <dt className="font-technical-data text-technical-data text-on-surface-variant order-2 uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display-lg text-primary order-1 text-[48px] leading-none">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <TechLabel className="mt-24 mb-8">{"Valorile noastre"}</TechLabel>
          {/* Toate patru sunt de o fraza, deci in grila ies la aceeasi inaltime —
              in vechea asezare stateau langa cele opt paragrafe ale
              angajamentului si pareau ramase pe dinafara. */}
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value) => {
              const Icon = VALUE_ICONS[value.title] ?? Leaf;
              return (
                <li
                  key={value.title}
                  className="border-outline-variant bg-surface-container-low/80 flex flex-col gap-4 border p-6"
                >
                  <span className="border-outline-variant text-primary flex h-11 w-11 shrink-0 items-center justify-center border">
                    <Icon size={20} strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-headline-md text-on-surface text-[20px] leading-snug">
                    {value.title}
                  </h3>
                  {value.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="font-body-md text-body-md text-on-surface-variant"
                    >
                      {paragraph}
                    </p>
                  ))}
                </li>
              );
            })}
          </ul>

          <div className="mt-20 flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="shine shine-edge bg-primary-container text-on-primary-container font-technical-data text-technical-data hover:bg-primary hover:text-on-primary px-6 py-3 tracking-widest uppercase transition-all"
            >
              {"Cereți ofertă"}
            </Link>
            <Link href="/proiecte" className="group flex w-fit items-center gap-4">
              <span className="border-primary text-primary group-hover:bg-primary group-hover:text-on-primary flex h-12 w-12 items-center justify-center rounded-full border transition-all">
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <span className="font-technical-data text-technical-data text-primary tracking-widest uppercase">
                {"Vezi proiectele"}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
