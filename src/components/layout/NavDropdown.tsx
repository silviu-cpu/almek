"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import type { NavGroup } from "@/lib/content";

/** Cat asteptam dupa ce cursorul iese, ca drumul buton -> submeniu sa nu-l inchida. */
const CLOSE_DELAY_MS = 120;

/**
 * Un grup din bara de navigatie, cu submeniu.
 *
 * Se deschide la hover, dar **clickul si tastatura raman functionale**: pe touch
 * nu exista hover, iar `onPointerEnter` este filtrat pe `pointerType === "mouse"`
 * ca sa nu se declanseze la atingere si sa se bata cap in cap cu clickul.
 *
 * `TextRoll` sta doar pe eticheta grupului, nu si pe randurile din panou.
 */
export function NavDropdown({
  group,
  linkClass,
  lineHeight,
}: {
  group: NavGroup;
  linkClass: string;
  lineHeight: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

  /* Se inchide pe Escape si pe click in afara. Fara a doua parte ar ramane
     deschis cat timp utilizatorul navigheaza in alta parte a paginii. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const id = `nav-${group.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        scheduleClose();
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={`${linkClass} flex cursor-pointer items-center gap-2`}
      >
        <TextRoll lineHeight={lineHeight}>{group.label}</TextRoll>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        /* Spatiul dintre buton si panou este `pt-4` pe invelis, nu `mt-4` pe
           lista: asa ramane zona hoverabila si cursorul nu trece printr-un gol
           care ar inchide submeniul. */
        <div className="absolute top-full left-0 pt-4">
          <ul
            id={id}
            className="border-outline-variant bg-surface/98 flex min-w-60 flex-col border backdrop-blur-xl"
          >
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
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
  );
}
