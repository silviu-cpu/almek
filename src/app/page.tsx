import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { GardenSpaces } from "@/components/sections/GardenSpaces";
import { Hero } from "@/components/sections/Hero";
import { Interiors } from "@/components/sections/Interiors";
import { Manifest } from "@/components/sections/Manifest";
import { Partners } from "@/components/sections/Partners";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { GrainOverlay, WoodOverlay } from "@/components/ui/TextureOverlays";
import { company } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.name,
  legalName: company.legalName,
  description:
    "Case din lemn masiv, CLT și timber frame, foișoare, terase, căsuțe de grădină și mobilier custom.",
  foundingDate: String(company.foundedYear),
  vatID: company.vat.replace("CUI ", ""),
  telephone: company.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Platanilor Nr. 2",
    addressLocality: "Vlădești",
    addressRegion: "Vâlcea",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: company.coordinates.lat,
    longitude: company.coordinates.lng,
  },
  areaServed: "RO",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GrainOverlay />
      <WoodOverlay />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Manifest />
        <Benefits />
        <Services />
        <GardenSpaces />
        <Interiors />
        <Projects />
        <Testimonials />
        <Contact />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
