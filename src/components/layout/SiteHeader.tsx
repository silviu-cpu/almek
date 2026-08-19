"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { navLinks } from "@/lib/content";

/* Inaltimea reala a randului pentru fiecare rol de text din header. TextRoll
   decupeaza cu `overflow-hidden`, iar 0.75 (default-ul upstream) ar taia
   sedila lui Ț si caciula lui Ă din "CEREȚI OFERTĂ" / "GRĂDINĂ". */
const NAV_LINE_HEIGHT = 1.4;

/**
 * Singurul client component din pagina. Mockup-ul avea `hidden md:flex` fara
 * niciun echivalent mobil, deci sub 768px site-ul ramanea complet fara
 * navigatie; drawer-ul de mai jos acopera cazul.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-outline-variant bg-surface/90 fixed top-0 left-0 z-100 w-full border-b backdrop-blur-xl">
      <div className="shell flex items-center justify-between py-6">
      {/* Wordmark-ul ramane static — rularea pe litere il facea sa arate ca un
          alt link de navigatie. */}
      <a
        href="#top"
        className="font-headline-lg text-on-surface text-[24px] tracking-tighter"
      >
        {"ALMEK"}
      </a>

      <nav aria-label="Navigație principală" className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary focus-visible:text-primary inline-block border-b border-transparent tracking-widest uppercase transition-colors"
          >
            <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="#contact"
          className="shine shine-edge bg-primary-container text-on-primary-container font-technical-data text-technical-data hover:bg-primary hover:text-on-primary hidden px-6 py-2 tracking-widest uppercase transition-all sm:inline-block"
        >
          {"Cereți ofertă"}
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          className="border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-10 w-10 items-center justify-center border transition-colors lg:hidden"
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-outline-variant bg-surface/98 absolute top-full left-0 w-full border-b backdrop-blur-xl lg:hidden"
        >
          <div className="shell flex flex-col gap-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-technical-data text-technical-data text-on-surface-variant hover:text-primary self-start tracking-widest uppercase transition-colors"
            >
              <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="shine shine-edge bg-primary-container text-on-primary-container font-technical-data text-technical-data px-6 py-3 text-center tracking-widest uppercase"
          >
            {"Cereți ofertă"}
          </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
