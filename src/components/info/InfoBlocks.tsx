import type { InfoSection } from "@/lib/info";

/** Un bloc de text cu titlu, folosit de mai multe pagini din „Informații". */
export function TextSection({ section }: { section: InfoSection }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-headline-md text-headline-md text-on-surface">
        {section.title}
      </h2>
      {section.body.map((paragraph) => (
        <p
          key={paragraph.slice(0, 32)}
          className="font-body-md text-body-md text-on-surface-variant"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

/** Cardul de preț: suma iese în evidență, descrierea o explică. */
export function PriceCard({
  title,
  price,
  children,
}: {
  title: string;
  price: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-outline-variant flex flex-col border p-6">
      <h3 className="font-technical-data text-technical-data text-on-surface-variant tracking-widest uppercase">
        {title}
      </h3>
      <p className="font-headline-md text-headline-md text-primary mt-3">
        {price}
      </p>
      <div className="font-body-md text-body-md text-on-surface-variant mt-4 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

/**
 * Mențiunea despre ce NU intră în preț. Stă lângă prețuri, nu îngropată la
 * finalul paginii — acolo o citește altfel nimeni.
 */
export function PriceDisclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-primary text-on-surface font-body-md text-body-md border-l-2 py-2 pl-6">
      {children}
    </p>
  );
}
