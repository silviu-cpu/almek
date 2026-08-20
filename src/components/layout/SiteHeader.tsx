"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CartIndicator } from "@/components/shop/CartIndicator";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { navLinks, portfolioNav } from "@/lib/content";

/* Inaltimea reala a randului pentru fiecare rol de text din header. TextRoll
   decupeaza cu `overflow-hidden`, iar 0.75 (default-ul upstream) ar taia
   sedila lui Ț si caciula lui Ă din "GRĂDINĂ" / "FILMĂRI". */
const NAV_LINE_HEIGHT = 1.4;

/** Cat asteptam dupa ce cursorul iese, ca drumul buton -> submeniu sa nu-l inchida. */
const CLOSE_DELAY_MS = 120;

const linkClass =
  "font-technical-data text-technical-data text-on-surface-variant hover:text-primary focus-visible:text-primary tracking-widest uppercase transition-colors";

/**
 * Singurul client component din shell. Mockup-ul avea `hidden md:flex` fara
 * niciun echivalent mobil, deci sub 768px site-ul ramanea complet fara
 * navigatie; drawer-ul de mai jos acopera cazul.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setPortfolioOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

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

  /* Submeniul se inchide pe Escape si pe click in afara. Fara a doua parte ar
     ramane deschis cat timp utilizatorul navigheaza in alta parte a paginii. */
  useEffect(() => {
    if (!portfolioOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPortfolioOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!portfolioRef.current?.contains(e.target as Node)) {
        setPortfolioOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [portfolioOpen]);

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

        <nav
          aria-label="Navigație principală"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
            </Link>
          ))}

          {/* Se deschide la hover, dar clickul si tastatura raman functionale:
              pe touch nu exista hover, iar filtrul pe `pointerType` impiedica
              declansarea la atingere, care s-ar bate cap in cap cu clickul. */}
          <div
            ref={portfolioRef}
            className="relative"
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              cancelClose();
              setPortfolioOpen(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              scheduleClose();
            }}
          >
            <button
              type="button"
              onClick={() => setPortfolioOpen((v) => !v)}
              aria-expanded={portfolioOpen}
              aria-controls="portfolio-menu"
              className={`${linkClass} flex cursor-pointer items-center gap-2`}
            >
              <TextRoll lineHeight={NAV_LINE_HEIGHT}>
                {portfolioNav.label}
              </TextRoll>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                aria-hidden
                className={`transition-transform ${portfolioOpen ? "rotate-180" : ""}`}
              />
            </button>

            {portfolioOpen ? (
              /* Spatiul dintre buton si panou este `pt-4` pe invelis, nu `mt-4`
                 pe lista: asa ramane zona hoverabila si cursorul nu trece
                 printr-un gol care ar inchide submeniul. */
              <div className="absolute top-full left-0 pt-4">
                <ul
                  id="portfolio-menu"
                  className="border-outline-variant bg-surface/98 flex min-w-56 flex-col border backdrop-blur-xl"
                >
                  {portfolioNav.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setPortfolioOpen(false)}
                        /* Fara TextRoll: pe randurile din submeniu efectul nu
                           si-a gasit locul. */
                        className={`${linkClass} hover:bg-surface-container block px-5 py-3`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${linkClass} self-start`}
              >
                <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
              </Link>
            ))}

            {/* Pe mobil grupul se desfasoara direct: un dropdown intr-un drawer
                deja deschis ar fi un al doilea nivel inutil. */}
            <div className="flex flex-col gap-4">
              <span className="font-technical-data text-technical-data text-on-surface/50 tracking-widest uppercase">
                {portfolioNav.label}
              </span>
              {portfolioNav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${linkClass} self-start pl-4`}
                >
                  <TextRoll lineHeight={NAV_LINE_HEIGHT}>{link.label}</TextRoll>
                </Link>
              ))}
            </div>

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
