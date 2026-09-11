/* Bordura este mereu 2px si isi schimba doar culoarea la focus: cu 1px -> 2px
   randul ar sari cu un pixel. `focus:ring-0` din mockup elimina complet
   indicatorul de focus, deci a fost inlocuit. */
const fieldClass =
  "bg-transparent appearance-none border-0 border-b-2 border-outline/60 focus:border-primary focus-visible:border-primary focus:outline-none text-on-surface font-body-md text-body-md py-2 px-0 placeholder:text-on-surface-variant/30 transition-colors";

const labelClass =
  "font-technical-data text-xs uppercase tracking-widest text-on-surface-variant";

/**
 * Cardul cu formularul de cerere de oferta, folosit si pe homepage si pe
 * /contact. Cele doua nu apar niciodata pe aceeasi pagina, deci id-urile fixe
 * ale campurilor nu se ciocnesc.
 */
export function ContactForm() {
  return (
    <div className="bg-surface border-outline-variant border p-6 shadow-2xl backdrop-blur-sm sm:p-10">
      {/* TODO(backend): formularul este deocamdata doar UI. Butonul este
          `type="button"` intentionat — un submit real pe un <form> fara
          action ar face GET si ar reincarca pagina. La cablare: Server
          Action in src/app/actions/contact.ts + useActionState. */}
      <p className="font-technical-data text-technical-data text-on-surface-variant border-outline-variant mb-8 border-b pb-6">
        {
          "Completați formularul de mai jos pentru a cere o oferta. Promitem sa vă contactăm în cel mai scurt timp."
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
            {"Detaliile cererii dumneavoastra"}
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
          className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data hover:bg-primary/90 w-full py-4 tracking-widest uppercase transition-all"
        >
          {"Trimitere formular"}
        </button>
      </form>
    </div>
  );
}
