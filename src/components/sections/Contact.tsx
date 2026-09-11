import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionRule } from "@/components/ui/TextureOverlays";

/** Sectiunea de contact de pe homepage. Pagina /contact foloseste aceleasi piese. */
export function Contact() {
  return (
    <section id="contact" className="section-timeline relative overflow-hidden py-32">
      <SectionRule />

      <div className="shell relative z-10 grid grid-cols-12 gap-gutter">
        <div className="col-span-12 md:col-span-5">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
            {"Aveți o idee de casă ideală ? Sau poate grădina are nevoie de o terasă nouă ?"}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            {
              "Vă putem ajuta. Doar completați formularul alăturat cu cât mai multe detalii și promitem să vă contactăm în cel mai scurt timp"
            }
          </p>
          <ContactDetails />
        </div>

        <div className="col-span-12 md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
