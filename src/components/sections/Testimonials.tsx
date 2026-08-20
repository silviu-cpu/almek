import { TechLabel } from "@/components/ui/TechLabel";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="recenzii"
      className="section-timeline relative overflow-hidden py-32"
    >
      <SectionRule />

      <div className="shell">
        <div className="relative z-10 mb-14 max-w-2xl">
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

        <TestimonialCarousel items={testimonials} />
      </div>
    </section>
  );
}
