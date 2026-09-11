import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

import { HeroSceneLoader } from "@/components/hero/HeroSceneLoader";
import { ScrollCue } from "@/components/hero/ScrollCue";
import { SectionRule } from "@/components/ui/TextureOverlays";

import almekLogo from "../../../public/images/almek_logo.png";

/*
 * Modelul real, exportat din SketchUp ca GLB. Verificarea ruleaza la build
 * (pagina e statica): pui fisierul aici, refaci build-ul si scena il foloseste.
 * Pana atunci arata casa din dulapi generata in `HeroScene`.
 */
const MODEL_URL = "/models/structura.glb";
const hasModel = fs.existsSync(path.join(process.cwd(), "public", MODEL_URL));

export function Hero() {
  return (
    /* Pista de derulare: 400vh, din care ecranul de sus sta fixat (sticky) cat
       timp se deruleaza — progresul prin pista conduce constructia casei, care
       se termina la `BUILD_END` (85%); restul pistei tine casa gata pe ecran,
       asa ca pagina merge mai departe abia dupa ce constructia s-a incheiat.
       Lungimea da viteza: ~225vh de derulare pentru toata casa, lent, la cerere.
       `overflow-hidden` sta pe containerul fixat, NU pe sectiune: pe un parinte
       al elementului sticky l-ar transforma in container de scroll si fixarea
       n-ar mai functiona. */
    <section id="top" className="section-timeline relative h-[400vh]">
      <SectionRule />

      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden pb-24">
        <div className="absolute inset-0 z-0">
          <HeroSceneLoader trackId="top" modelUrl={hasModel ? MODEL_URL : null} />
        </div>
        <div className="from-background via-background/40 pointer-events-none absolute inset-0 z-0 bg-gradient-to-t to-transparent" />
        {/* Pe ecrane late, o umbrire discreta sub text: piesele in zbor trec
            si prin stanga, iar titlul trebuie sa ramana lizibil peste ele. */}
        <div className="from-background/85 via-background/40 pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-3/5 bg-gradient-to-r to-transparent md:block" />

        <div className="shell relative z-10">
          <div className="max-w-4xl">
            {/* Logo decupat (PNG transparent). Haloul deschis din jur e invizibil
                pe tema deschisa; pe cea inchisa ridica „ALMEK" maro (#603223),
                care direct pe fundalul aproape negru ar avea ~1.75:1. */}
            <Image
              src={almekLogo}
              alt="ALMEK — Născuți pentru a crea"
              priority
              sizes="(min-width: 768px) 160px, 112px"
              className="mb-8 h-auto w-28 [filter:drop-shadow(0_0_1px_rgba(247,247,247,0.9))_drop-shadow(0_0_16px_rgba(247,247,247,0.35))] md:w-40"
            />
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
              <ScrollCue trackId="top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
