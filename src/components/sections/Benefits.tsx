import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { benefits } from "@/lib/content";

export function Benefits() {
  return (
    <section
      id="beneficii"
      className="section-timeline relative overflow-hidden py-32"
    >
      <SectionRule />

      <div className="shell relative z-10 grid grid-cols-12 gap-gutter">
        <div className="col-span-12 md:col-span-4">
          <TechLabel className="mb-2">{"De ce lemn"}</TechLabel>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            {"Casa din lemn aduce mai multe beneficii:"}
          </h2>
        </div>

        {/* Bullet patrat de 2px, conform design system-ului. */}
        <ul className="col-span-12 md:col-span-8 md:columns-2 md:gap-gutter">
          {benefits.map((benefit, i) => (
            <li
              key={benefit}
              className="border-outline-variant flex items-start gap-4 border-b py-5 break-inside-avoid first:border-t md:first:border-t-0"
            >
              <span className="font-technical-data text-technical-data text-primary shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body-lg text-body-lg text-on-surface-variant">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
