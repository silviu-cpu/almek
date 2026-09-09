import type { Metadata } from "next";

import { TextSection } from "@/components/info/InfoBlocks";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { aboutIntro, aboutLead, aboutSections } from "@/lib/info";

export const metadata: Metadata = {
  title: "Despre noi | ALMEK",
  description:
    "Tâmplărie și dulgherie din lemn: case de locuit, căsuțe de vacanță și de grădină, mobilier și amenajări interioare.",
};

export default function DespreNoiPage() {
  return (
    <>
      <PageHeader eyebrow="Informații" title="Despre noi" intro={aboutLead} />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          <div className="max-w-3xl space-y-4">
            {aboutIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-gutter gap-y-14 md:grid-cols-2">
            {aboutSections.map((section) => (
              <TextSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
