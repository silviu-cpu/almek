import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { levelsOf, projects } from "@/lib/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/proiecte/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} | ALMEK`,
    description: `${project.buildingType}, ${project.builtArea} m² suprafață construită, ${project.dimensions}.`,
  };
}

export default async function ProiectPage(props: PageProps<"/proiecte/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const specs = [
    { label: "Tip construcție", value: project.buildingType },
    { label: "Suprafață construită", value: `${project.builtArea} m²` },
    { label: "Dimensiuni", value: project.dimensions },
    { label: "Suprafață utilă parter", value: `${project.usableGroundFloor} m²` },
    ...(project.usableLoft
      ? [{ label: "Suprafață utilă supantă", value: `${project.usableLoft} m²` }]
      : []),
    { label: "Nivel", value: levelsOf(project) },
  ];

  return (
    <section className="section-timeline relative overflow-hidden pt-40 pb-32">
      <SectionRule />

      <div className="shell relative z-10">
        <Link
          href="/proiecte"
          className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary mb-8 inline-block tracking-widest uppercase transition-colors"
        >
          {"← Toate proiectele"}
        </Link>

        <TechLabel className="mb-2">{project.buildingType}</TechLabel>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-12 max-w-4xl">
          {project.name}
        </h1>

        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-7">
            <div className="border-outline-variant relative aspect-[4/3] w-full overflow-hidden border">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <dl className="border-outline-variant flex flex-col border-t">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="border-outline-variant font-technical-data text-technical-data flex justify-between gap-4 border-b py-4"
                >
                  <dt className="text-on-surface-variant">{spec.label}</dt>
                  <dd className="text-on-surface text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/#contact"
              className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data mt-10 inline-block px-10 py-4 tracking-widest uppercase"
            >
              {"Cereți ofertă"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
