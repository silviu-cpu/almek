import type { Metadata } from "next";

import { VideoCard } from "@/components/portfolio/VideoCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { fieldVideos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Filmări pe teren | ALMEK",
  description:
    "Filmări de pe șantierele ALMEK: montaj, structuri din lemn masiv și lucrări duse la capăt.",
};

export default function FilmariPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portofoliu"
        title="Filmări pe teren"
        intro="Montaj, structură și finisaj, filmate direct pe șantier. Fiecare clip arată o lucrare de la primul element pus în operă până la predare."
      />

      <section className="section-timeline relative overflow-hidden pb-32">
        <SectionRule />

        <div className="shell relative z-10">
          <ul className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {fieldVideos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
