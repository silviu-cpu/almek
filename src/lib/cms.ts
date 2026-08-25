import "server-only";

import config from "@payload-config";
import { connection } from "next/server";
import { getPayload } from "payload";

import type { Article, Media, Product, Project } from "@/payload-types";

/**
 * Accesul la continutul din CMS.
 *
 * Se foloseste Local API (`getPayload`), nu HTTP: ruleaza in acelasi proces, deci
 * fara un salt de retea in plus. Se apeleaza doar la cerere, niciodata la build —
 * asa build-ul nu are nevoie de acces la baza de date.
 *
 * `server-only` este importat intentionat: daca vreun component client ajunge sa
 * importe din fisierul asta, build-ul cade cu un mesaj clar in loc sa incerce sa
 * trimita conexiunea la baza de date in browser.
 */
const payloadPromise = getPayload({ config });

/**
 * Opreste pregenerarea si amana pana la o cerere reala.
 *
 * Fara asta, Next incearca sa randeze paginile de CMS la build, ceea ce
 * inseamna ca build-ul ar avea nevoie de acces la baza de date — exact ce am
 * decis sa evitam, ca sa nu ducem credentiale de Postgres in CI.
 *
 * Consecinta: paginile care citesc din CMS se randeaza la fiecare cerere.
 * Interogarile merg prin Local API direct in Postgres, deci sunt ieftine; daca
 * traficul o cere, peste ele se poate pune un strat de cache separat.
 */
async function client() {
  await connection();
  return payloadPromise;
}

/**
 * ATENTIE: Local API ruleaza implicit cu `overrideAccess: true`, adica
 * OCOLESTE regulile de acces din colectii. Regula "vizitatorii vad doar
 * `published`" nu se aplica singura aici, deci filtrul de status trebuie scris
 * explicit in fiecare interogare — altfel ciornele ar ajunge pe site.
 */
const publishedOnly = { status: { equals: "published" } } as const;

/** Forma pe care o consuma componentele: URL si dimensiuni gata rezolvate. */
export type ImageView = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductView = {
  slug: string;
  name: string;
  category: Product["category"];
  priceMinor: number;
  inStock: boolean;
  image: ImageView;
};

export type ProjectView = {
  slug: string;
  name: string;
  buildingType: Project["buildingType"];
  builtArea: number;
  dimensions: string;
  usableGroundFloor: number;
  usableLoft?: number;
  image: ImageView;
};

export type ArticleView = {
  slug: string;
  title: string;
  excerpt: string;
  category: Article["category"];
  publishedAt?: string;
  cover: ImageView;
};

/**
 * Campurile de tip upload vin fie ca id (numar), fie ca document, in functie de
 * `depth`. Cu `depth: 1` sunt documente; verificarea ramane pentru ca tipul
 * generat nu poate sti asta, iar o imagine lipsa nu trebuie sa arunce.
 */
function toImage(value: number | Media | null | undefined): ImageView | null {
  if (!value || typeof value === "number") return null;
  if (!value.url) return null;
  return {
    url: value.url,
    alt: value.alt,
    width: value.width ?? 800,
    height: value.height ?? 600,
  };
}

export async function getArticles(): Promise<ArticleView[]> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "articles",
    where: publishedOnly,
    sort: "-publishedAt",
    depth: 1,
    limit: 200,
  });

  return docs.flatMap((doc) => {
    const cover = toImage(doc.cover);
    /* Fara imagine cardul ar fi rupt; sarim intrarea in loc sa randam o gaura. */
    if (!cover) return [];
    return [
      {
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        category: doc.category,
        publishedAt: doc.publishedAt ?? undefined,
        cover,
      },
    ];
  });
}

export async function getArticle(slug: string) {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "articles",
    where: { ...publishedOnly, slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function getProducts(): Promise<ProductView[]> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "products",
    where: publishedOnly,
    sort: "name",
    depth: 1,
    limit: 500,
  });

  return docs.flatMap((doc) => {
    const image = toImage(doc.image);
    if (!image) return [];
    return [
      {
        slug: doc.slug,
        name: doc.name,
        category: doc.category,
        priceMinor: doc.priceMinor,
        inStock: Boolean(doc.inStock),
        image,
      },
    ];
  });
}

export async function getProjects(): Promise<ProjectView[]> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "projects",
    where: publishedOnly,
    sort: "-builtArea",
    depth: 1,
    limit: 500,
  });

  return docs.flatMap((doc) => {
    const image = toImage(doc.image);
    if (!image) return [];
    return [
      {
        slug: doc.slug,
        name: doc.name,
        buildingType: doc.buildingType,
        builtArea: doc.builtArea,
        dimensions: doc.dimensions,
        usableGroundFloor: doc.usableGroundFloor,
        usableLoft: doc.usableLoft ?? undefined,
        image,
      },
    ];
  });
}

export async function getProject(slug: string): Promise<ProjectView | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}
