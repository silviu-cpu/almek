import { ArchitecturalBackdrop } from "@/components/ui/ArchitecturalBackdrop";
import { TechLabel } from "@/components/ui/TechLabel";
import { images, testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="recenzii"
      className="border-outline-variant relative overflow-hidden border-t py-32"
    >
      <ArchitecturalBackdrop image={images.backdropTestimonials} opacity={0.03} />

      <div className="shell grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="relative z-10 md:col-span-4">
          <TechLabel className="mb-2">{"Feedback"}</TechLabel>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            {"Voci din Atelier"}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-6">
            {
              "Profesionalismul și pasiunea de peste 20 de ani în construcții fac diferența."
            }
          </p>
        </div>

        <ul className="relative z-10 grid grid-cols-1 gap-8 md:col-span-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.author}
              className="border-outline-variant bg-surface-container-low/80 flex flex-col justify-between border p-8 backdrop-blur-md"
            >
              <figure className="flex h-full flex-col justify-between">
                <blockquote className="font-body-lg text-body-lg text-on-surface mb-8 italic">
                  {`„${t.quote}”`}
                </blockquote>
                <figcaption>
                  <span className="font-technical-data text-technical-data text-primary block">
                    {t.author}
                  </span>
                  <span className="font-technical-data text-on-surface-variant block text-xs">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
