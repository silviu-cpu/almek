import Image from "next/image";

import { SectionRule } from "@/components/ui/TextureOverlays";

import heroImage from "../../../public/images/hero.png";

export function Hero() {
  return (
    <section
      id="top"
      className="section-timeline relative flex min-h-screen flex-col justify-end overflow-hidden pb-24"
    >
      <SectionRule />

      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Structură din lemn masiv realizată de ALMEK, detaliu arhitectural"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-40 grayscale-[0.3]"
        />
        <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <div className="shell relative z-10">
        <div className="max-w-4xl">
        <p className="font-technical-data text-technical-data text-primary bg-background/20 mb-4 inline-block px-2 tracking-widest backdrop-blur-sm">
          {"EST. 1993 // CASE DIN LEMN MASIV"}
        </p>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-8 drop-shadow-lg">
          {"Case din lemn masiv"}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl">
          {
            "Casele din lemn masiv prezintă un grad mare de rezistență la testul timpului, devenind un adăpost terapeutic pentru multe generații."
          }
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#contact"
            className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data px-10 py-4 tracking-widest uppercase transition-transform hover:scale-[1.02]"
          >
            {"Contact"}
          </a>
          <div className="bg-outline-variant hidden h-px w-24 sm:block" />
          <span className="font-technical-data text-technical-data text-on-surface-variant">
            {"SCROLL TO EXPLORE_"}
          </span>
        </div>
        </div>
      </div>
    </section>
  );
}
