import { Check } from "lucide-react";
import type { Metadata } from "next";

import { TextSection } from "@/components/info/InfoBlocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import {
  woodBenefits,
  woodBenefitsLead,
  woodClosingIntro,
  woodClosingPoints,
  woodIntro,
  woodSections,
} from "@/lib/info";

export const metadata: Metadata = {
  title: "De ce casă din lemn | ALMEK",
  description:
    "Eficiență energetică, rezistență la cutremur, aer curat și amprentă de carbon redusă — de ce lemnul masiv este un material ideal de construcție.",
};

export default function DeCeCasaDinLemnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="De ce casă din lemn?"
        intro="Lemnul este, dintre toate materialele de construcții, unicul natural — regenerabil, versatil și potrivit pentru orice tip de construcție."
      />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          <div className="max-w-3xl space-y-4">
            {woodIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface mt-16">
            {"Avantajele caselor prefabricate din lemn"}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-3xl">
            {woodBenefitsLead}
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-x-gutter gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {woodBenefits.map((benefit) => (
              <li
                key={benefit}
                className="font-body-md text-body-md text-on-surface-variant flex items-start gap-3"
              >
                <Check
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden
                  className="text-primary mt-1 shrink-0"
                />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-20 grid grid-cols-1 gap-x-gutter gap-y-14 md:grid-cols-2">
            {woodSections.map((section) => (
              <TextSection key={section.title} section={section} />
            ))}
          </div>

          <div className="border-outline-variant mt-20 max-w-3xl border-t pt-12">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {woodClosingIntro}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {woodClosingPoints.map((point) => (
                <li
                  key={point.slice(0, 32)}
                  className="font-body-md text-body-md text-on-surface-variant flex gap-3"
                >
                  <span aria-hidden className="bg-primary mt-3 size-[2px] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
