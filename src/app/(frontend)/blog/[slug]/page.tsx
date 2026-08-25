import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TechLabel } from "@/components/ui/TechLabel";
import { SectionRule } from "@/components/ui/TextureOverlays";
import { categoryLabel, formatArticleDate } from "@/lib/blog";
import { getArticle } from "@/lib/cms";
import type { Media } from "@/payload-types";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | ALMEK`,
    description: article.excerpt,
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) notFound();

  /* Cu `depth: 1` `cover` vine ca document; verificarea ramane pentru ca tipul
     generat admite si id-ul brut. */
  const cover = typeof article.cover === "number" ? null : (article.cover as Media);
  const date = formatArticleDate(article.publishedAt ?? undefined);

  return (
    <section className="section-timeline relative overflow-hidden pt-40 pb-32">
      <SectionRule />

      <div className="shell relative z-10">
        <Link
          href="/blog"
          className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary mb-8 inline-block tracking-widest uppercase transition-colors"
        >
          {"← Toate articolele"}
        </Link>

        <TechLabel className="mb-2">{categoryLabel(article.category)}</TechLabel>
        <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl">
          {article.title}
        </h1>
        {date ? (
          <p className="font-technical-data text-technical-data text-on-surface-variant mt-4">
            {date}
          </p>
        ) : null}

        {cover?.url ? (
          <div className="border-outline-variant relative mt-12 aspect-[16/9] w-full overflow-hidden border">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        {/* `prose` nu exista in proiect (fara plugin de typography), asa ca
            spatierea vine din stilurile de mai jos, pe elementele randate. */}
        <div className="article-body font-body-lg text-body-lg text-on-surface-variant mt-12 max-w-3xl">
          <RichText data={article.body} />
        </div>
      </div>
    </section>
  );
}
