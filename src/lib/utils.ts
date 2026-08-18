import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Scara noastra tipografica foloseste `text-*` pentru DIMENSIUNE
 * (`text-technical-data`, `text-headline-lg`, ...), iar Tailwind foloseste
 * acelasi prefix pentru CULOARE (`text-primary`). tailwind-merge implicit le
 * considera acelasi grup si ar pastra doar ultima clasa — adica
 * `cn("text-technical-data", "text-primary")` ar pierde dimensiunea.
 * Inregistram explicit numele noastre ca font-size / font-family.
 */
const TOKENS = [
  "display-lg",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "body-lg",
  "body-md",
  "technical-data",
  "label-caps",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TOKENS] }],
      "font-family": [{ font: [...TOKENS] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
