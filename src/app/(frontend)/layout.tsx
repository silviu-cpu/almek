import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BlueprintBackdrop, GrainOverlay } from "@/components/ui/TextureOverlays";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
/* globals.css ramane in src/app/, ca sa fie folosit si de grupul (payload). */
import "../globals.css";

// `latin-ext` este obligatoriu: diacriticele romanesti (ă, â, î, ș, ț) nu
// sunt in subsetul `latin`, iar fara el fiecare cuvant cu diacritice cade pe
// fontul de fallback.
// O singura familie sans pentru titluri si text. Hanken Grotesk este variabila
// (100-900), deci `bold` este o greutate reala din font, nu ingrosare sintetica
// facuta de browser — motiv pentru care Metrophobic, care exista doar in 400, a
// trebuit inlocuit, nu doar completat.
const sans = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALMEK | Arhitectură în echilibru cu esența materiei prime",
  description:
    "Case din lemn masiv, CLT și timber frame, foișoare, terase și mobilier custom. Peste 18 ani de experiență în construcții din lemn, în Vlădești, județul Vâlcea.",
  openGraph: {
    title: "ALMEK | Arhitectură în echilibru cu esența materiei prime",
    description:
      "Case din lemn masiv, CLT și timber frame, foișoare, terase și mobilier custom. Vlădești, județul Vâlcea.",
    locale: "ro_RO",
    type: "website",
    siteName: "ALMEK",
  },
};

/* Ruleaza sincron la parsarea HTML-ului, inainte de primul paint, deci tema
   salvata se aplica fara flash. Fara valoare salvata nu setam nimic si CSS-ul
   cade pe `prefers-color-scheme`. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/* In Next 16 `themeColor` traieste in export-ul `viewport`, nu in `metadata`. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#121412" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      suppressHydrationWarning
      className={`${sans.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensiile de browser (ColorZilla, Grammarly etc.) injecteaza atribute
          pe <body> inainte de hidratare — ex. `cz-shortcut-listen`. Suprimarea
          se aplica doar atributelor acestui element, nu si copiilor. */}
      <body
        suppressHydrationWarning
        className="font-body-md text-body-md bg-background text-on-surface min-h-full antialiased"
      >
        {/* Shell-ul este comun tuturor rutelor. A stat in page.tsx cat timp
            exista o singura pagina; cu cele din Portofoliu s-ar fi dublat. */}
        <GrainOverlay />
        <BlueprintBackdrop />
        <SiteHeader />
        <main className="relative z-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
