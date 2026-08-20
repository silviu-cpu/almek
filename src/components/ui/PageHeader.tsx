import type { ReactNode } from "react";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";

/** Antetul comun al paginilor interioare, sub header-ul fix. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="section-timeline relative overflow-hidden pt-40 pb-16">
      <SectionRule />

      <div className="shell relative z-10">
        <TechLabel className="mb-2">{eyebrow}</TechLabel>
        <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl">
          {title}
        </h1>
        {intro ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-2xl">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
