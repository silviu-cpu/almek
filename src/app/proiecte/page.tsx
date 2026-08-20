import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectsCatalog } from "@/components/portfolio/ProjectsCatalog";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Proiecte case din lemn | ALMEK",
  description:
    "Catalogul de proiecte ALMEK: case log house și A-frame din lemn masiv, cu suprafețe, dimensiuni și niveluri.",
};

export default function ProiectePage() {
  return (
    <>
      <PageHeader
        eyebrow="Portofoliu"
        title="Proiecte"
        intro={`Cele ${projects.length} proiecte ale noastre, gata de realizat. Orice model se poate adapta la dimensiunile, finisajele și funcționalitatea de care ai nevoie.`}
      />

      {/* `ProjectsCatalog` citeste filtrele cu `useSearchParams`, ceea ce
          intr-o pagina prerandata static cere obligatoriu o granita Suspense —
          fara ea build-ul se opreste cu eroare. */}
      <Suspense fallback={<CatalogSkeleton />}>
        <ProjectsCatalog />
      </Suspense>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="shell relative z-10 pb-32">
      <p className="font-technical-data text-technical-data text-on-surface-variant">
        {"Se încarcă proiectele…"}
      </p>
    </div>
  );
}
