import { Check } from "lucide-react";
import type { Metadata } from "next";

import { InfoTabs } from "@/components/info/InfoTabs";
import { FramedImage } from "@/components/ui/FramedImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import {
  woodBenefits,
  woodBenefitsLead,
  woodIntro,
  woodIntroImages,
  woodTabs,
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

      <section className="section-timeline relative overflow-hidden py-24">
        <SectionRule />

        <div className="shell relative z-10">
          {/* Textul in stanga, imaginile in dreapta — aceeasi compozitie ca la
              deschiderea din „Despre noi". Detaliul iese cu -bottom-12 sub rama
              mare; `mt-16` de la titlul urmator ii face loc. */}
          <div className="grid grid-cols-12 items-center gap-gutter">
            <div className="col-span-12 space-y-4 md:col-span-6">
              {woodIntro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-body-lg text-body-lg text-on-surface-variant"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative col-span-12 md:col-span-5 md:col-start-8">
              <FramedImage
                src={woodIntroImages.main.image}
                alt={woodIntroImages.main.alt}
                sizes="(min-width: 1200px) 500px, (min-width: 768px) 42vw, 100vw"
                className="relative z-10"
              />
              <FramedImage
                src={woodIntroImages.detail.image}
                alt={woodIntroImages.detail.alt}
                sizes="(min-width: 1200px) 210px, 18vw"
                aspect="aspect-square"
                className="bg-surface-container-high absolute -bottom-12 -left-12 z-20 hidden w-5/12 md:block"
              />
            </div>
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
        </div>
      </section>

      {/* Taburile, ca pe live: lista de avantaje in stanga, textul in dreapta.
          In locul grilei de sapte blocuri de text, care se citea ca un zid. */}
      <section className="section-timeline relative overflow-hidden py-24 pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          <h2 className="sr-only">{"Avantajele în detaliu"}</h2>
          <InfoTabs tabs={woodTabs} label="Avantajele în detaliu" />
        </div>
      </section>
    </>
  );
}
