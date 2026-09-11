import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { company, socialLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact | ALMEK",
  description: `Cereți o ofertă pentru casa, căsuța de grădină sau terasa din lemn masiv. ${company.visitAddress} — ${company.phones.join(" / ")}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cereți ofertă"
        title="Contact"
        intro="Vă putem ajuta. Doar completați formularul alăturat cu cât mai multe detalii și promitem să vă contactăm în cel mai scurt timp."
      />

      <section className="section-timeline relative overflow-hidden py-24 pb-32">
        <SectionRule />

        <div className="shell relative z-10 grid grid-cols-12 gap-gutter gap-y-14">
          <div className="col-span-12 flex flex-col gap-12 md:col-span-5">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {"Aveți o idee de casă ideală? Sau poate grădina are nevoie de o terasă nouă?"}
            </h2>

            <ContactDetails mapLink />

            <div className="border-outline-variant border-t pt-8">
              <h3 className="font-technical-data text-technical-data text-on-surface-variant mb-4 text-xs tracking-widest uppercase">
                {"Urmăriți-ne"}
              </h3>
              <ul className="flex gap-4">
                {socialLinks.map((social) => (
                  <li key={social.short}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary font-technical-data flex h-10 w-10 items-center justify-center border transition-colors"
                    >
                      {social.short}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
