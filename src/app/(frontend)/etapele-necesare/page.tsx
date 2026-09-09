import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { steps, stepsIntro } from "@/lib/info";

export const metadata: Metadata = {
  title: "Etapele necesare | ALMEK",
  description:
    "De la discuția inițială până la recepție: pașii construcției unei case din lemn masiv.",
};

export default function EtapelePage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="Etapele necesare"
        intro="Planificarea construcției casei, pas cu pas."
      />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          <div className="max-w-3xl space-y-4">
            {stepsIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ol className="border-outline-variant mt-16 flex flex-col border-t">
            {steps.map((step) => (
              <li
                key={step.nr}
                className="border-outline-variant grid grid-cols-12 gap-gutter border-b py-8"
              >
                <span className="font-technical-data text-technical-data text-primary col-span-12 tracking-widest md:col-span-1">
                  {step.nr}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface col-span-12 md:col-span-4">
                  {step.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant col-span-12 md:col-span-7">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="font-body-md text-body-md text-on-surface-variant mt-12">
            {"Ai rămas cu întrebări? Vezi "}
            <Link
              href="/intrebari-frecvente"
              className="text-primary underline underline-offset-4"
            >
              {"întrebările frecvente"}
            </Link>
            {" sau scrie-ne direct din "}
            <Link href="/#contact" className="text-primary underline underline-offset-4">
              {"formularul de contact"}
            </Link>
            {"."}
          </p>
        </div>
      </section>
    </>
  );
}
