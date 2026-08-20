import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { projects, projectsIntro } from "@/lib/content";

export function Projects() {
  return (
    <section
      id="proiecte"
      className="section-timeline relative overflow-hidden py-32"
    >
      <SectionRule />

      <div className="shell">

      <div className="relative z-10 mb-16">
        <TechLabel className="mb-2">{"Proiectele nostre"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 max-w-3xl">
          {"Cauți inspiratie ? Descoperă proiectele noastre gata de realizat !"}
        </h2>
        <div className="max-w-3xl space-y-4">
          {projectsIntro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-body-lg text-body-lg text-on-surface-variant"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <ul className="relative z-10 grid grid-cols-1 gap-gutter sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            /* A doua coloana e decalata vertical doar pe desktop, ca sa pastreze
               compozitia editoriala asimetrica din design system. */
            className={`flex flex-col gap-6 ${index === 1 ? "md:pt-24" : ""}`}
          >
            <div className="border-outline-variant group relative aspect-[4/5] overflow-hidden border shadow-lg">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(min-width: 768px) 31vw, (min-width: 640px) 47vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="font-technical-data text-technical-data text-on-primary bg-primary absolute bottom-4 left-4 px-3 py-1">
                {project.location}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {project.name}
              </h3>
              <dl className="border-outline-variant flex flex-col gap-1 border-t pt-4">
                <div className="font-technical-data text-technical-data flex justify-between gap-4">
                  <dt className="text-on-surface-variant">{"Tip constructie:"}</dt>
                  <dd className="text-on-surface text-right">{project.buildingType}</dd>
                </div>
                <div className="font-technical-data text-technical-data flex justify-between">
                  <dt className="text-on-surface-variant">{"Suprafata construita:"}</dt>
                  <dd className="text-on-surface">{project.area}</dd>
                </div>
                <div className="font-technical-data text-technical-data flex justify-between">
                  <dt className="text-on-surface-variant">{"Pret:"}</dt>
                  <dd className="text-primary">{project.budget}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-16">
        <a
          href="#contact"
          className="group shine shine-edge border-primary text-primary hover:bg-primary hover:text-on-primary font-technical-data text-technical-data inline-flex items-center gap-3 border px-8 py-4 tracking-widest uppercase transition-colors"
        >
          {"Descoperă Proiectele Noastre"}
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
      </div>
    </section>
  );
}
