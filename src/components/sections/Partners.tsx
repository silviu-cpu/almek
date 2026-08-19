import Image from "next/image";
import type { CSSProperties } from "react";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { partners, type Partner } from "@/lib/content";

/** Secunde de parcurgere per partener — tine viteza constanta cand lista creste. */
const SECONDS_PER_PARTNER = 4.5;

/**
 * Decalajele pe verticala, in px, ca banda sa nu fie o linie dreapta. Lungimea
 * tiparului nu trebuie sa se potriveasca cu numarul de parteneri: ambele copii
 * ale listei parcurg aceleasi indici, deci primesc aceleasi decalaje si cusatura
 * buclei ramane invizibila oricate elemente ar fi.
 */
const OFFSETS = [0, 38, 14, 54, 24];

/** "Interio Arhitecture" -> "IA"; "IKO" ramane "IKO". */
function monogram(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function PartnerItem({ partner, index }: { partner: Partner; index: number }) {
  return (
    <li
      className="partner-item group flex shrink-0 items-center justify-center px-8 sm:px-12"
      style={
        {
          "--partner-offset": `${OFFSETS[index % OFFSETS.length]}px`,
        } as CSSProperties
      }
    >
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          sizes="160px"
          className="partner-logo h-auto w-[120px] object-contain sm:w-[150px]"
        />
      ) : (
        /* Placeholder cat timp lipseste fisierul din public/images/parteneri/. */
        <span className="font-technical-data text-technical-data text-on-surface-variant border-outline-variant flex h-14 w-[120px] items-center justify-center border tracking-widest sm:w-[150px]">
          {monogram(partner.name)}
        </span>
      )}
    </li>
  );
}

function PartnerRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex items-start ${duplicate ? "marquee-copy-duplicate" : ""}`}
    >
      {partners.map((partner, index) => (
        <PartnerItem key={partner.name} partner={partner} index={index} />
      ))}
    </ul>
  );
}

export function Partners() {
  return (
    <section
      id="parteneri"
      className="section-timeline relative overflow-hidden py-24"
    >
      <SectionRule />

      <div className="shell relative z-10">
        <TechLabel className="mb-2">{"Parteneri"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-14 max-w-3xl">
          {"Parteneriate cu furnizori de prestigiu pentru case durabile"}
        </h2>

        {/* Banda sta in `shell`, deci respecta aceeasi latime de 1200px ca restul
            paginii; `overflow: hidden` de pe `marquee` o taie la marginile ei. */}
        <div
          className="marquee pb-4"
          style={
            {
              "--marquee-duration": `${partners.length * SECONDS_PER_PARTNER}s`,
            } as CSSProperties
          }
        >
          <div className="marquee-track">
            <PartnerRow />
            <PartnerRow duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
