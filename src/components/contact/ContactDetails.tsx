import { MapPin, Smartphone } from "lucide-react";

import { company } from "@/lib/content";

/*
 * Link catre Google Maps dupa adresa, nu dupa `company.coordinates`: acelea sunt
 * rotunjite la trei zecimale (~100 m), prea putin pentru indicatii rutiere.
 * Link, nu harta incorporata — un iframe Google Maps seteaza cookie-uri de la
 * prima incarcare, adica exact ce cere consimtamant.
 */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.visitAddress,
)}`;

/** Adresa si telefoanele, din `company` — aceeasi sursa ca footer-ul. */
export function ContactDetails({ mapLink = false }: { mapLink?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <MapPin className="text-primary shrink-0" size={24} strokeWidth={1.5} aria-hidden />
        <div className="font-technical-data text-technical-data">
          <div className="text-on-surface-variant text-xs uppercase">{"Adresă"}</div>
          <address className="text-on-surface not-italic">{company.visitAddress}</address>
          {mapLink ? (
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary mt-2 inline-block text-xs tracking-widest uppercase underline-offset-4 hover:underline"
            >
              {"Deschide în Google Maps"}
            </a>
          ) : null}
        </div>
      </div>
      <div className="flex gap-4">
        <Smartphone className="text-primary shrink-0" size={24} strokeWidth={1.5} aria-hidden />
        <div className="font-technical-data text-technical-data">
          <div className="text-on-surface-variant text-xs uppercase">{"Telefon"}</div>
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
  );
}
