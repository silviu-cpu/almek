import Image from "next/image";
import Link from "next/link";

import { anpcLinks, company, footerServices, navGroups, socialLinks } from "@/lib/content";

export function SiteFooter() {
  /* Fara border-t: linia de deasupra vine din `SectionRule` al sectiunii
     Parteneri, ultima din <main>. */
  return (
    <footer className="bg-secondary-container relative z-10 overflow-hidden py-16">
      {/* Ca si la Interioare: fundalul opac ascunde axa fixa, deci footer-ul isi
          deseneaza propriul segment pe aceeasi coordonata. */}
      <div
        aria-hidden
        className="bg-on-secondary-container/20 pointer-events-none absolute top-0 left-1/2 z-0 h-full w-px"
      />

      <div className="shell relative z-10 grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="flex flex-col gap-8 md:col-span-6 lg:col-span-3">
          <div className="font-headline-lg text-on-surface text-[24px] tracking-tighter">
            {company.name}
          </div>
          <p className="font-technical-data text-technical-data text-on-surface-variant">
            {company.tagline}
          </p>
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

        {/* Linkurile din submeniurile barii apar in DOM abia dupa deschidere,
            deci nu sunt in HTML-ul initial. Aici sunt server-randate: raman
            gasibile pentru motoarele de cautare si ofera o a doua cale spre ele.
            Cate o coloana pe grup, cu aceleasi etichete ca in bara. */}
        {navGroups.map((group) => (
          <div key={group.label} className="md:col-span-3 lg:col-span-2">
            <h2 className="font-technical-data text-primary mb-6 text-xs tracking-widest uppercase">
              {group.label}
            </h2>
            <ul className="font-technical-data text-technical-data text-on-surface-variant space-y-4">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="font-technical-data text-primary mb-6 text-xs tracking-widest uppercase">
            {"Produse și servicii"}
          </h2>
          <ul className="font-technical-data text-technical-data text-on-surface-variant space-y-4">
            {footerServices.map((item) => (
              <li key={item}>
                <a href="#servicii" className="hover:text-primary transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 lg:col-span-3">
          <h2 className="font-technical-data text-primary mb-6 text-xs tracking-widest uppercase">
            {"Informații fiscale"}
          </h2>
          <address className="font-technical-data text-technical-data text-on-surface-variant leading-relaxed not-italic">
            {company.legalName}
            <br />
            {company.registration}
            <br />
            {company.vat}
            <br />
            <span className="text-on-surface-variant/70">
              {"Adresă sediu social:"}
            </span>
            <br />
            {company.legalAddress}
          </address>
        </div>

        <div className="border-outline-variant/30 flex flex-col gap-6 border-t pt-10 md:col-span-12 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-3">
            {anpcLinks.map((badge) => (
              <li key={badge.src}>
                <a
                  href={badge.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block opacity-80 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    width={130}
                    height={32}
                    className="h-8 w-auto"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-technical-data text-on-surface-variant text-xs uppercase md:text-right">
            {`© ${new Date().getFullYear()} ALMEK STRUCTURAL SYSTEMS`}
            <br />
            {`// ${company.coordinates.label}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
