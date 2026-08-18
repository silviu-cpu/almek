import { TechLabel } from "@/components/ui/TechLabel";
import { partners } from "@/lib/content";

export function Partners() {
  return (
    <section
      id="parteneri"
      className="border-outline-variant bg-surface-container-lowest relative overflow-hidden border-t py-24"
    >
      <div aria-hidden className="blueprint-bg absolute inset-0 opacity-30" />

      <div className="shell relative z-10">
        <TechLabel className="mb-2">{"Parteneri"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 max-w-3xl">
          {"Parteneriate cu furnizori de prestigiu pentru case durabile"}
        </h2>

        {/* TODO(assets): logo-urile reale se pun in public/images/parteneri/ si
            inlocuiesc numele text de aici. */}
        <ul className="border-outline-variant grid grid-cols-2 border-t border-l sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <li
              key={partner}
              className="border-outline-variant flex min-h-24 items-center justify-center border-r border-b p-6"
            >
              <span className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary text-center tracking-widest uppercase transition-colors">
                {partner}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
