import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

type Doc = { slug?: string | null };

/**
 * Hook-uri care invalideaza cache-ul paginilor atinse de un document.
 *
 * Paginile de CMS se genereaza la prima cerere si raman cachate; fara asta, o
 * publicare din admin nu s-ar vedea pe site pana la urmatorul deploy.
 *
 * `paths` primeste documentul, ca sa poata compune si adresa lui proprie. La
 * stergere si la schimbarea slug-ului trebuie invalidata si adresa VECHE —
 * altfel ar ramane servita din cache o pagina care nu mai exista.
 */
export function revalidateFor(
  paths: (doc: Doc) => string[],
): CollectionConfig["hooks"] {
  const purge = (doc: Doc | undefined) => {
    if (!doc) return;
    for (const path of paths(doc)) revalidatePath(path);
  };

  return {
    afterChange: [
      ({ doc, previousDoc }) => {
        purge(doc as Doc);
        if ((previousDoc as Doc)?.slug !== (doc as Doc)?.slug) {
          purge(previousDoc as Doc);
        }
      },
    ],
    afterDelete: [({ doc }) => purge(doc as Doc)],
  };
}
