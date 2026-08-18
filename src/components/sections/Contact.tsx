import { MapPin, Smartphone } from "lucide-react";

import { company } from "@/lib/content";

/* Bordura este mereu 2px si isi schimba doar culoarea la focus: cu 1px -> 2px
   randul ar sari cu un pixel. `focus:ring-0` din mockup elimina complet
   indicatorul de focus, deci a fost inlocuit. */
const fieldClass =
  "bg-transparent appearance-none border-0 border-b-2 border-outline/60 focus:border-primary focus-visible:border-primary focus:outline-none text-on-surface font-body-md text-body-md py-2 px-0 placeholder:text-on-surface-variant/30 transition-colors";

const labelClass =
  "font-technical-data text-xs uppercase tracking-widest text-on-surface-variant";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-outline-variant relative overflow-hidden border-t py-32"
    >
      <div aria-hidden className="blueprint-detail absolute inset-0 opacity-10" />

      <div className="shell relative z-10 grid grid-cols-12 gap-gutter">
        <div className="col-span-12 md:col-span-5">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
            {"Aveți o idee de casă ideală?"}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            {
              "Sau poate grădina are nevoie de o terasă nouă? Vă putem ajuta. Doar completați formularul alăturat cu cât mai multe detalii și promitem să vă contactăm în cel mai scurt timp."
            }
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <MapPin className="text-primary shrink-0" size={24} strokeWidth={1.5} aria-hidden />
              <div className="font-technical-data text-technical-data">
                <div className="text-on-surface-variant text-xs uppercase">{"Adresă"}</div>
                <address className="text-on-surface not-italic">
                  {company.visitAddress}
                </address>
              </div>
            </div>
            <div className="flex gap-4">
              <Smartphone className="text-primary shrink-0" size={24} strokeWidth={1.5} aria-hidden />
              <div className="font-technical-data text-technical-data">
                <div className="text-on-surface-variant text-xs uppercase">{"Contact"}</div>
                <div className="text-on-surface flex flex-wrap gap-x-2">
                  {company.phones.map((phone, i) => (
                    <span key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                      {i < company.phones.length - 1 ? " /" : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border-outline-variant col-span-12 border p-6 shadow-2xl backdrop-blur-sm sm:p-10 md:col-span-7">
          {/* TODO(backend): formularul este deocamdata doar UI. Butonul este
              `type="button"` intentionat — un submit real pe un <form> fara
              action ar face GET si ar reincarca pagina. La cablare: Server
              Action in src/app/actions/contact.ts + useActionState. */}
          <p className="font-technical-data text-technical-data text-on-surface-variant border-outline-variant mb-8 border-b pb-6">
            {
              "Completați formularul de mai jos pentru a cere o ofertă. Promitem să vă contactăm în cel mai scurt timp."
            }
          </p>
          <form className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  {"Nume complet"}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ion Popescu"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className={labelClass}>
                  {"Telefon"}
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+40 000 000 000"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={labelClass}>
                {"Email"}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email@provider.com"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={labelClass}>
                {"Detaliile cererii dumneavoastră"}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Descrieți proiectul visat..."
                className={`${fieldClass} resize-none`}
              />
            </div>
            <button
              type="button"
              className="bg-primary text-on-primary font-technical-data text-technical-data hover:bg-primary/90 w-full py-4 tracking-widest uppercase transition-all"
            >
              {"Trimitere formular"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
