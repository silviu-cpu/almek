import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogList } from "@/components/blog/BlogList";
import { PageHeader } from "@/components/ui/PageHeader";
import { getArticles } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog | ALMEK",
  description:
    "Articole despre construcția din lemn masiv: materiale, etape, amenajări și sfaturi din atelierul ALMEK.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Din atelier"
        intro="Ce am învățat construind case din lemn masiv — materiale, etape și detalii care fac diferența."
      />

      {/* `BlogList` citeste filtrele cu `useSearchParams`, ceea ce cere o granita
          Suspense intr-o pagina care nu e randata dinamic. */}
      <Suspense
        fallback={
          <div className="shell relative z-10 pb-32">
            <p className="font-technical-data text-technical-data text-on-surface-variant">
              {"Se încarcă articolele…"}
            </p>
          </div>
        }
      >
        <BlogList articles={articles} />
      </Suspense>
    </>
  );
}
