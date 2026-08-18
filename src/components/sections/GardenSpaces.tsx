import { ArrowUpRight } from "lucide-react";

import { TechLabel } from "@/components/ui/TechLabel";
import { gardenCategories, gardenIntro } from "@/lib/content";

export function GardenSpaces() {
  return (
    <section
      id="gradina"
      className="border-outline-variant section-gradient relative overflow-hidden border-t py-32"
    >
      <div className="shell">
      <div className="relative z-10 mb-16 max-w-3xl">
        <TechLabel className="mb-2">{"Amenajări grădină"}</TechLabel>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
          {"Un loc de relaxare la tine acasă"}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {gardenIntro}
        </p>
      </div>

      <ul className="relative z-10 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {gardenCategories.map((category) => (
          <li key={category.name}>
            <a
              href={category.href}
              className="group border-outline-variant hover:border-primary focus-visible:border-primary bg-surface/60 flex items-center justify-between border p-6 backdrop-blur-sm transition-colors"
            >
              <span className="font-headline-md text-headline-md text-on-surface">
                {category.name}
              </span>
              <span className="flex items-center gap-3">
                <span className="font-technical-data text-technical-data text-primary tracking-widest uppercase">
                  {"Descoperă"}
                </span>
                <ArrowUpRight
                  className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
