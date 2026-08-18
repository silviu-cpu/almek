import Image, { type StaticImageData } from "next/image";

/**
 * Fotografie de fundal foarte estompata, in blend `overlay`. In mockup era un
 * `background-image` inline; aici e `next/image` ca sa treaca prin optimizator.
 */
export function ArchitecturalBackdrop({
  image,
  opacity = 0.05,
  position = "center",
}: {
  image: StaticImageData;
  opacity?: number;
  position?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        style={{ objectPosition: position }}
        className="object-cover mix-blend-overlay"
      />
    </div>
  );
}
