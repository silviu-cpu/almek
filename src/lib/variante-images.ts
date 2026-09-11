/* ---------------------------------------------------------------------------
   Imaginile paginii „Variante și costuri", preluate de pe almekwoodarch.ro.

   Stau aici, nu in info.ts, fiindca sunt 35: importurile ar ingropa textul.
   Galeriile de la foisoare erau pe live intr-un slider; fisierele de aici sunt
   originalele de 1200x900, nu miniaturile din cache-ul lui.
   --------------------------------------------------------------------------- */

import type { StaticImageData } from "next/image";

import caseARender from "../../public/images/variante-si-costuri/case/perete-din-lemn-prefabricat-60-mm-grosime.jpg";
import caseASectiune from "../../public/images/variante-si-costuri/case/sectiune-perete-lemn-masiv-cabana.jpg";
import caseBRender from "../../public/images/variante-si-costuri/case/perete-casa-lemn-prefabricata-izolata-finisaj-lambriu.jpg";
import caseBSectiune from "../../public/images/variante-si-costuri/case/sectiune-perete-lemn-masiv-izolat-si-lambrisat-interior.jpg";
import caseCRender from "../../public/images/variante-si-costuri/case/perete-cabana-din-lemn-pereti-dubli-izolatie-eficienta.jpg";
import caseCSectiune from "../../public/images/variante-si-costuri/case/sectiune-perete-casa-din-lemn-dublu-chertat.jpg";
import casute40 from "../../public/images/variante-si-costuri/casute/case-din-dulapi-lemn-chertat-40-mm.png";
import casute60 from "../../public/images/variante-si-costuri/casute/pereti-din-lemn-chertat-60-mm-grosime.png";
import mobilierTerasa from "../../public/images/variante-si-costuri/mobilier/mobilier-amenajare-terasa.png";
import t1FaraParapet from "../../public/images/variante-si-costuri/terase/foisor-din-lemn-fara-parapet.jpg";
import t2Rustica from "../../public/images/variante-si-costuri/terase/balustrada-din-lemn-rustica.jpg";
import t2Traditional from "../../public/images/variante-si-costuri/terase/balustrada-lemn-foisor-traditional.jpg";
import t2TraditionalaFoisor from "../../public/images/variante-si-costuri/terase/balustrada-traditionala-foisor-lemn.jpg";
import t2GardComanda from "../../public/images/variante-si-costuri/terase/model-gard-foisor-din-lemn-la-comanda.jpg";
import t2StelajRustic from "../../public/images/variante-si-costuri/terase/panou-din-lemn-stelaj-rustic.jpg";
import t2ParapetGradina from "../../public/images/variante-si-costuri/terase/parapet-din-lemn-pentru-foisor-gradina.jpg";
import t2ParapeteRustic from "../../public/images/variante-si-costuri/terase/parapete-din-lemn-foisor-rustic.jpg";
import t2ParapetStelaj from "../../public/images/variante-si-costuri/terase/parapet-stelaj-din-lemn-pentru-terase-foisoare.jpg";
import t2StructuraGard from "../../public/images/variante-si-costuri/terase/structura-gard-foisor-lemn.jpg";
import t3Jaluzea from "../../public/images/variante-si-costuri/terase/balustrada-din-lemn-panou-jaluzea.jpg";
import t3GardJaluzea from "../../public/images/variante-si-costuri/terase/gard-foisor-din-lemn-masiv-panou-jaluzea.jpg";
import t3ModelGradina from "../../public/images/variante-si-costuri/terase/model-balustrada-traditionala-foisor-gradina.jpg";
import t3Pensiune from "../../public/images/variante-si-costuri/terase/parapet-lemn-terasa-pensiune.jpg";
import t4PanouGard from "../../public/images/variante-si-costuri/terase/panou-gard-foisor-din-lemn-masiv.jpg";
import t4FinisajNuc from "../../public/images/variante-si-costuri/terase/model-balustrada-din-lemn-finisaj-nuc.jpg";
import t4Eleganta from "../../public/images/variante-si-costuri/terase/balustrada-eleganta-din-lemn-masiv-comanda-valcea.jpg";
import t4Nefinisata from "../../public/images/variante-si-costuri/terase/balustrada-din-lemn-masiv-nefinisata.jpg";
import t5Bucuresti from "../../public/images/variante-si-costuri/terase/amenajare-terasa-din-lemn-masiv-bucuresti.jpg";
import t5Jaluzea from "../../public/images/variante-si-costuri/terase/balustrada-din-lemn-panou-tip-jaluzea.jpg";
import t5Inchis from "../../public/images/variante-si-costuri/terase/gard-foisor-din-lemn-inchis.jpg";
import t5PanouJaluzea from "../../public/images/variante-si-costuri/terase/panou-din-lemn-tip-jaluzea.jpg";
import t5Stelaj from "../../public/images/variante-si-costuri/terase/panou-stelaj-din-lemn-foisoare.jpg";
import t5Perete from "../../public/images/variante-si-costuri/terase/perete-foisor-din-lemn-panou-jaluzea.jpg";
import t6Sticla from "../../public/images/variante-si-costuri/terase/foisor-din-lemn-inchis-panouri-sticla-culisanta.jpg";
import t6Interior from "../../public/images/variante-si-costuri/terase/foisor-inchis-interior.jpg";

export type InfoImage = { image: StaticImageData; alt: string };

export const variantImages = {
  caseA: [
    { image: caseARender, alt: "Perete simplu din dulapi masivi de lemn — randare 3D" },
    { image: caseASectiune, alt: "Secțiune prin peretele simplu din lemn masiv" },
  ],
  caseB: [
    { image: caseBRender, alt: "Perete exterior lambrisat, cu izolație și lambriu interior — randare 3D" },
    { image: caseBSectiune, alt: "Secțiune prin peretele izolat și lambrisat pe interior" },
  ],
  caseC: [
    { image: caseCRender, alt: "Perete exterior dublu din lemn masiv, cu izolație între rânduri — randare 3D" },
    { image: caseCSectiune, alt: "Secțiune prin peretele dublu, chertat la colțuri" },
  ],
  casute: [
    { image: casute40, alt: "Căsuță din dulapi de lemn chertați de 40 mm — randare 3D" },
    { image: casute60, alt: "Pereți din lemn chertați, de 60 mm grosime — randare 3D" },
  ],
  terase1: [{ image: t1FaraParapet, alt: "Foișor din lemn deschis, fără parapet" }],
  terase2: [
    { image: t2Rustica, alt: "Balustradă rustică din lemn" },
    { image: t2Traditional, alt: "Balustradă tradițională la un foișor din lemn" },
    { image: t2TraditionalaFoisor, alt: "Foișor din lemn cu balustradă tradițională" },
    { image: t2GardComanda, alt: "Gard de foișor din lemn, realizat la comandă" },
    { image: t2StelajRustic, alt: "Panou rustic din lemn, tip stelaj" },
    { image: t2ParapetGradina, alt: "Parapet din lemn pentru un foișor de grădină" },
    { image: t2ParapeteRustic, alt: "Parapete din lemn la un foișor rustic" },
    { image: t2ParapetStelaj, alt: "Parapet tip stelaj din lemn pentru terase și foișoare" },
    { image: t2StructuraGard, alt: "Structura gardului unui foișor din lemn" },
  ],
  terase3: [
    { image: t3Jaluzea, alt: "Balustradă din lemn cu panou tip jaluzea" },
    { image: t3GardJaluzea, alt: "Gard de foișor din lemn masiv, cu panou tip jaluzea" },
    { image: t3ModelGradina, alt: "Balustradă din lamele de lemn la un foișor de grădină" },
    { image: t3Pensiune, alt: "Parapet din lemn la terasa unei pensiuni" },
  ],
  terase4: [
    { image: t4PanouGard, alt: "Panou de gard pentru foișor, din lemn masiv" },
    { image: t4FinisajNuc, alt: "Balustradă din lemn cu finisaj nuc" },
    { image: t4Eleganta, alt: "Balustradă elegantă din lemn masiv, realizată la comandă în Vâlcea" },
    { image: t4Nefinisata, alt: "Balustradă din lemn masiv, înainte de finisare" },
  ],
  terase5: [
    { image: t5Bucuresti, alt: "Terasă din lemn masiv amenajată în București" },
    { image: t5Jaluzea, alt: "Balustradă din lemn cu panouri tip jaluzea" },
    { image: t5Inchis, alt: "Foișor din lemn închis parțial cu panouri" },
    { image: t5PanouJaluzea, alt: "Panou din lemn tip jaluzea" },
    { image: t5Stelaj, alt: "Panou tip stelaj din lemn pentru foișoare" },
    { image: t5Perete, alt: "Perete de foișor din lemn, cu panou tip jaluzea" },
  ],
  terase6: [
    { image: t6Sticla, alt: "Foișor din lemn închis cu panouri de sticlă culisante" },
    { image: t6Interior, alt: "Interiorul unui foișor închis, cu pereți din lemn și ferestre mari" },
  ],
  mobilier: [
    { image: mobilierTerasa, alt: "Canapea și măsuță din lemn masiv pe o terasă" },
  ],
} satisfies Record<string, InfoImage[]>;
