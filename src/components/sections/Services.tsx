import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { Carousel_003 } from "@/components/ui/skiper-ui/skiper49";
import { services } from "@/lib/content";

export function Services() {
  const slides = services.map((service) => ({
    src: service.image,
    alt: `${service.title} — realizat de ALMEK`,
    title: service.title,
    description: service.description,
  }));

  return (
    <section
      id="servicii"
      className="section-timeline relative overflow-hidden py-32"
    >
      <SectionRule />

      <div className="shell">
        <div className="relative z-10 mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TechLabel className="mb-2">{"Serviciile noastre"}</TechLabel>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              {"Ce putem să construim"}
            </h2>
          </div>
          <span className="font-technical-data text-technical-data text-on-surface-variant">
            {"[ CATEG_01 - 05 ]"}
          </span>
        </div>
      </div>

      {/* Caruselul iese intentionat din `shell`: efectul coverflow are nevoie de
          toata latimea ca slide-urile laterale sa se vada rotite. */}
      <div className="text-primary relative z-10 flex justify-center">
        <Carousel_003
          images={slides}
          className="max-w-6xl"
          showPagination
          showNavigation
          loop
        />
      </div>
    </section>
  );
}
