"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { NavDropdown } from "@/components/layout/NavDropdown";
import { CartIndicator } from "@/components/shop/CartIndicator";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { navGroups, navLinks } from "@/lib/content";

/* Inaltimea reala a randului pentru textul din header. TextRoll decupeaza cu
   `overflow-hidden`, iar 0.75 (default-ul upstream) ar taia sedila lui Ț si
   caciula lui Ă din "GRĂDINĂ" / "INFORMAȚII". */
const NAV_LINE_HEIGHT = 1.4;

const linkClass =
  "font-technical-data text-technical-data text-on-surface-variant hover:text-primary focus-visible:text-primary tracking-widest uppercase transition-colors";

/**
 * Singurul client component din shell. Mockup-ul avea `hidden md:flex` fara
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
        <Link
          href="/"
          className="font-headline-lg text-on-surface text-[24px] tracking-tighter"
        >
          {"ALMEK"}
        </Link>

        {/* Pragul e 900px, nu `lg` (1024): cu cinci intrari de nivel intai bara
            incape de la 900 in sus — 75px sigla + ~443px navigatie + ~274px
            grupul din dreapta intra in cei 820px utili. Sub atat, tot ce e aici
            trece in drawer-ul de mai jos. */}
        <nav
          aria-label="Navigație principală"
          className="hidden items-center gap-6 min-[900px]:flex"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
            </Link>
          ))}

          {navGroups.map((group) => (
            <NavDropdown
              key={group.label}
              group={group}
              linkClass={linkClass}
              lineHeight={NAV_LINE_HEIGHT}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartIndicator />
          <Link
            href="/#contact"
            className="shine shine-edge bg-primary-container text-on-primary-container font-technical-data text-technical-data hover:bg-primary hover:text-on-primary hidden px-6 py-2 tracking-widest uppercase transition-all sm:inline-block"
          >
            {"Cereți ofertă"}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className="border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-10 w-10 items-center justify-center border transition-colors min-[900px]:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-outline-variant bg-surface/98 absolute top-full left-0 max-h-[80vh] w-full overflow-y-auto border-b backdrop-blur-xl min-[900px]:hidden"
        >
          <div className="shell flex flex-col gap-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${linkClass} self-start`}
              >
                <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
              </Link>
            ))}

            {/* Pe mobil grupurile se desfasoara direct: un dropdown intr-un
                drawer deja deschis ar fi un al doilea nivel inutil. */}
            {navGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-4">
                <span className="font-technical-data text-technical-data text-on-surface/50 tracking-widest uppercase">
                  {group.label}
                </span>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`${linkClass} self-start pl-4`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="shine shine-edge bg-primary-container text-on-primary-container font-technical-data text-technical-data px-6 py-3 text-center tracking-widest uppercase"
            >
              {"Cereți ofertă"}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
