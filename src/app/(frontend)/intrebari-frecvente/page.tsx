import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { faqs } from "@/lib/info";

export const metadata: Metadata = {
  title: "Întrebări frecvente | ALMEK",
  description:
    "Costuri, fundație, durata construcției, autorizații, garanție, comportament la foc și rezistență la cutremur — răspunsuri la întrebările frecvente despre casele din lemn masiv.",
};

export default function IntrebariFrecventePage() {
  return (
    <>
      <PageHeader
        eyebrow="Informații"
        title="Întrebări frecvente"
        intro="Răspunsurile la lucrurile pe care ni le întrebați cel mai des, înainte de a începe un proiect."
      />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          {/* Acordeon pe `<details>` nativ: deschiderea, tastatura si cautarea
              din browser (Ctrl+F deschide sectiunea gasita) vin din platforma.
              Un `role`/`aria-expanded` scris de mana ar reimplementa prost
              exact asta si ar cere un client component. */}
          <div className="border-outline-variant max-w-4xl border-t">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                name="faq"
                className="border-outline-variant group border-b"
              >
                <summary className="hover:text-primary text-on-surface flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors [&::-webkit-details-marker]:hidden">
                  <h2 className="font-headline-md text-headline-md">
                    {faq.question}
                  </h2>
                  <Plus
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-primary mt-1 shrink-0 transition-transform group-open:rotate-45"
                  />
                </summary>
                <div className="font-body-md text-body-md text-on-surface-variant flex max-w-3xl flex-col gap-3 pb-8">
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant mt-12 max-w-3xl">
            {"Nu ai găsit răspunsul? "}
            <Link href="/contact" className="text-primary underline underline-offset-4">
              {"Scrie-ne"}
            </Link>
            {" și revenim cu detalii pentru proiectul tău."}
          </p>
        </div>
      </section>
    </>
  );
}
