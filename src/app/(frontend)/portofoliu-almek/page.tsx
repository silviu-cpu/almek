import type { Metadata } from "next";
import { Suspense } from "react";

import { WorksGrid } from "@/components/portfolio/WorksGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWorks } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Portofoliu realizări | ALMEK",
  description:
    "Lucrări ALMEK duse la capăt: case din lemn, căsuțe de grădină, foișoare și terase, mobilier și amenajări interioare.",
};

export default async function PortofoliuPage() {
  const works = await getWorks();

  return (
    <>
      <PageHeader
        eyebrow="Portofoliu"
        title="Lucrari de portofoliu"
        intro="Lucrări duse la capăt, de la case din lemn masiv până la mobilier și amenajări interioare."
      />

      <Suspense
        fallback={
          <div className="shell relative z-10 pb-32">
            <p className="font-technical-data text-technical-data text-on-surface-variant">
              {"Se încarcă lucrările…"}
            </p>
          </div>
        }
      >
        <WorksGrid works={works} />
      </Suspense>
    </>
  );
}
