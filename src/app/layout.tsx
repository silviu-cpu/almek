import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, JetBrains_Mono, Metrophobic } from "next/font/google";
import "./globals.css";

// `latin-ext` este obligatoriu: diacriticele romanesti (ă, â, î, ș, ț) nu
// sunt in subsetul `latin`, iar fara el fiecare cuvant cu diacritice cade pe
// fontul de fallback.
const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

// Metrophobic exista intr-o singura greutate (400, normal). Orice `font-bold`
// pe acest font ar fi bold sintetizat de browser, asa ca accentul vine din
// JetBrains Mono uppercase, nu din greutate.
const metrophobic = Metrophobic({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-metrophobic",
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
      className={`${bodoni.variable} ${metrophobic.variable} ${jetbrains.variable} h-full`}
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
        {children}
      </body>
    </html>
  );
}
