import type { StaticImageData } from "next/image";

import interior44 from "../../public/images/interior-44.png";
import bencompLogo from "../../public/images/parteneri/bencomp.png";
import ikoLogo from "../../public/images/parteneri/iko.png";
import interioLogo from "../../public/images/parteneri/interio.png";
import kroncolorLogo from "../../public/images/parteneri/kroncolor.png";
import lindabLogo from "../../public/images/parteneri/lindab.png";
import rennerLogo from "../../public/images/parteneri/renner.png";
import rothoblaasLogo from "../../public/images/parteneri/rothoblaas.png";
import steicoLogo from "../../public/images/parteneri/steico.png";
import joineryDetail from "../../public/images/joinery-detail.png";
import projPolovragi from "../../public/images/proj-polovragi.png";
import projPriporu from "../../public/images/proj-priporu.png";
import projValcea from "../../public/images/proj-valcea.png";
import timberMacro from "../../public/images/timber-macro.png";

export type NavLink = { label: string; href: string };

export type Service = {
  nr: string;
  title: string;
  description: string;
  /** Imagine pentru caruselul din sectiunea Servicii (public/images/servicii/). */
  image: string;
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  buildingType: string;
  area: string;
  budget: string;
  image: StaticImageData;
  alt: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/* Linkurile din mockup erau in engleza si duceau toate in `#`. Cum livram
   deocamdata doar homepage-ul, sunt ancore catre sectiunile reale. */
export const navLinks: NavLink[] = [
  { label: "Despre", href: "#despre" },
  { label: "Beneficii", href: "#beneficii" },
  { label: "Servicii", href: "#servicii" },
  { label: "Grădină", href: "#gradina" },
  { label: "Proiecte", href: "#proiecte" },
  { label: "Recenzii", href: "#recenzii" },
];

export const services: Service[] = [
  {
    nr: "01",
    title: "Case din lemn",
    image: "/images/servicii/case-lemn.png",
    description:
      "Sistem 100% prefabricat, materiale ecologice fabricate în România.",
  },
  {
    nr: "02",
    title: "Căsuță de grădină",
    image: "/images/servicii/casuta-gradina.png",
    description: "Construcții ergonomice adaptate mediului natural.",
  },
  {
    nr: "03",
    title: "Foișoare și terase",
    image: "/images/servicii/foisoare-terase.png",
    description:
      "Amenajări unice gândite să aducă liniște și frumusețe spațiului tău.",
  },
  {
    nr: "04",
    title: "Mobilier pentru grădină",
    image: "/images/servicii/mobilier-gradina.png",
    description: "Piese de exterior lucrate manual, rezistente la intemperii.",
  },
  {
    nr: "05",
    title: "Mobilier interior",
    image: "/images/servicii/mobilier-interior.png",
    description:
      "Arta prelucrării lemnului adusă la nivel de design interior premium.",
  },
];

/** Cele 5 argumente afisate ca badge-uri sub "Reconecteaza-te cu natura". */
export const features: string[] = [
  "Materialele sunt fabricate în România",
  "Partener cu experiență",
  "Materiale ecologice",
  "Sistem 100% prefabricat",
  "Modele personalizabile",
];

export const benefits: string[] = [
  "Presupune un timp de execuție redus",
  "Implică o asamblare rapidă",
  "Oferă caracteristici terapeutice unice",
  "Este economică, ergonomică și ecologică",
  "Prezintă rezistență la cutremur",
  "Sistemul de construcție permite modificări ale amplasamentului",
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "18", label: "Ani experiență" },
  { value: "300", label: "Proiecte realizate" },
  { value: "29.540", label: "Pomi plantați" },
  { value: "220", label: "Clienți mulțumiți" },
];

export const ecosiaNote =
  "Folosim Ecosia, motorul de căutare care direcționează 100% din profituri către acțiuni pentru climă, iar 80% dintre acestea susțin plantarea și protejarea copacilor la nivel global.";

export type GardenCategory = { name: string; href: string };

export const gardenCategories: GardenCategory[] = [
  { name: "Foișoare", href: "#contact" },
  { name: "Gard", href: "#contact" },
  { name: "Leagăn", href: "#contact" },
  { name: "Alte piese de mobilier", href: "#contact" },
  { name: "Terase", href: "#contact" },
  { name: "Căsuțe de grădină", href: "#contact" },
];

export const gardenIntro =
  "Visezi la un colț de rai în grădina ta sau la o terasă primitoare unde să-ți petreci serile de vară? De ce să rămână doar la stadiu de dorință? Noi suntem aici pentru a-ți transforma visurile în realitate. Echipa noastră pasionată de lemn creează amenajări unice, fiecare piesă fiind gândită să îți aducă liniște și frumusețe în spațiul tău verde.";

export const projectsIntro: string[] = [
  "Portofoliul nostru de proiecte îți este la dispoziție ca sursă de inspirație — orice model se poate adapta cu ușurință pentru a corespunde exact cerințelor tale. Fie că este vorba despre dimensiuni, finisaje sau funcționalitate, orice proiect poate fi personalizat în detaliu.",
  "Dacă ai un concept propriu te vom ajuta să dezvoltăm proiectul împreună de la zero, alături de arhitecții și designerii noștri colaboratori. Astfel, ne asigurăm că rezultatul final este perfect aliniat cu viziunea ta.",
];

/**
 * Logo-urile sunt importate static, ca `next/image` sa le stie dimensiunile la
 * build. Fisierele sunt PNG cu fundal transparent, derivate din JPEG-urile de pe
 * almekwoodarch.ro (fundalul alb a fost decupat dupa culoarea din colturi, cu o
 * rampa pe margini ca sa nu ramana halou). `logo` este optional: fara el banda
 * deseneaza o monograma din initiale, deci se pot adauga pe rand.
 */
export type Partner = { name: string; logo?: StaticImageData };

export const partners: Partner[] = [
  { name: "Interio Arhitecture", logo: interioLogo },
  { name: "BenComp", logo: bencompLogo },
  { name: "IKO", logo: ikoLogo },
  { name: "KronColor", logo: kroncolorLogo },
  { name: "Lindab", logo: lindabLogo },
  { name: "Renner", logo: rennerLogo },
  { name: "Steico", logo: steicoLogo },
  { name: "Rothoblaas", logo: rothoblaasLogo },
];

export const projects: Project[] = [
  {
    slug: "valcea",
    name: "Proiect Casă din lemn Vâlcea",
    location: "VÂLCEA",
    buildingType: "Case Log House",
    area: "113,00 mp",
    budget: "de la 30.000 EUR",
    image: projValcea,
    alt: "Casă din lemn masiv realizată de ALMEK în județul Vâlcea, 113 mp",
  },
  {
    slug: "polovragi",
    name: "Proiect Casă din Lemn Polovragi",
    location: "POLOVRAGI",
    buildingType: "Case Log House",
    area: "76,38 mp",
    budget: "de la 37.500 EUR",
    image: projPolovragi,
    alt: "Casă din lemn masiv realizată de ALMEK la Polovragi, 76,38 mp",
  },
  {
    slug: "priporu",
    name: "Proiect Casă din lemn Priporu",
    location: "PRIPORU",
    buildingType: "Case Log House",
    area: "67,59 mp",
    budget: "de la 33.500 EUR",
    image: projPriporu,
    alt: "Casă din lemn masiv realizată de ALMEK la Priporu, 67,59 mp",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mi-am extins o casa veche, din cărămidă, cu ei și mi-au făcut și un foișor. Sunt foarte buni la ceea ce fac, îmbinările sunt perfecte, zici că taie lemnul cu laserul, sunt flexibili și comunicarea cu ei este facilă. Foișorul meu a fost deosebit de lăudat de către vecinii mei, oameni cu înclinații tehnice care și-au ridicat și casele și foișoarele. Recomand! 5 Stele!",
    author: "George Preduca",
    role: "Client rezidențial",
  },
  {
    quote:
      "Recomand Almek din tot sufletul! O echipa de profesionisti cu care am colaborat extraordinar! Sunt foarte atenti la detalii si se vede ca pasiunea si experienta de peste 20 de ani in constructiile de lemn fac diferenta! Multumim Almek pt cabana de vis realizata!",
    author: "Angelescu Robert",
    role: "Client rezidențial",
  },
  {
    quote:
      "Almek helped us fulfill our dream of living in a wooden house! The cooperation was trouble-free, the owners helped us many times, offering good advice and suggesting technical solutions to many issues. I highly recommend!",
    author: "Katarzyna Kurpiel",
    role: "Client internațional",
  },
  {
    quote:
      "Excellent service and quality. The persons working here and the Management are really very professional people, with a lot of experience in their field.",
    author: "Mircea D.",
    role: "Client",
  },
  {
    quote: "Lucruri minunate din manutele lor! Recomand cu caldura!",
    author: "Ioana Stoica",
    role: "Client",
  },
  {
    quote: "Seriozitate, profesionalism! Recomand!",
    author: "Dorina Schiopu",
    role: "Client",
  },
  {
    quote: "Recomand cu incredere!",
    author: "Corina Ciobanu",
    role: "Client",
  },
];

export const footerServices: string[] = [
  "Case din lemn",
  "Căsuțe de grădină",
  "Foișoare și terase",
  "Mobilier pentru grădină",
  "Mobilier interior",
];

export const socialLinks = [
  {
    short: "FB",
    label: "ALMEK pe Facebook",
    href: "https://www.facebook.com/almek.casedinlemn",
  },
  {
    short: "IG",
    label: "ALMEK pe Instagram",
    href: "https://www.instagram.com/almekwoodarchitecture/",
  },
  {
    short: "YT",
    label: "ALMEK pe YouTube",
    href: "https://www.youtube.com/channel/UCdwH3JKcBWbvu0xy8s4hF_g/videos",
  },
  {
    short: "PIN",
    label: "ALMEK pe Pinterest",
    href: "https://ro.pinterest.com/almekwoodarch/",
  },
];

/** Link-urile ANPC sunt obligatorii legal pentru comerciantii din Romania. */
export const anpcLinks = [
  {
    src: "/anpc/anpc-sal.svg",
    alt: "ANPC — Soluționarea Alternativă a Litigiilor",
    href: "https://anpc.ro/ce-este-sal/",
  },
  {
    src: "/anpc/anpc-sol.svg",
    alt: "ANPC — Soluționarea Online a Litigiilor",
    href: "https://ec.europa.eu/consumers/odr",
  },
];

/* Datele fiscale si de contact apar atat in sectiunea Contact cat si in
   footer — o singura sursa ca sa nu divergheze. */
export const company = {
  name: "ALMEK",
  legalName: "S.C. Almek S.R.L.",
  registration: "J38/520/1993",
  vat: "CUI RO4066032",
  foundedYear: 1993,
  yearsOfExperience: 18,
  projectsCompleted: 300,
  visitAddress: "Strada Platanilor Nr.2, Vlădești, Județul Vâlcea",
  legalAddress:
    "România, Județ Vâlcea, Localitate Vlădești, Strada Linia, Număr 379",
  phones: ["0747 040 770", "0743 041 090"],
  coordinates: { lat: 44.135, lng: 24.321, label: "44.135° N, 24.321° E" },
  tagline:
    "Cu peste 18 ani experiență in construirea caselor din lemn, va oferim intreaga noastra experiență in construirea caminului mult dorit.",
} as const;

export const images = {
  joineryDetail,
  timberMacro,
  interior44,
};
