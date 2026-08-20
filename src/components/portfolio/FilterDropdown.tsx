"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";

/** Inaltimea reala a randului: `text-technical-data` are line-height 1.4. */
const LINE_HEIGHT = 1.4;

/** Cat asteptam dupa ce cursorul iese, ca drumul buton -> panou sa nu-l inchida. */
const CLOSE_DELAY_MS = 120;

/**
 * Un buton din bara de filtre, cu panou de bifat dedesubt. Selectia este
 * multipla, iar numarul de optiuni alese apare langa eticheta, ca in referinta
 * ("Tip construcție ( 2 )").
 *
 * Se deschide la hover, dar **clickul si tastatura raman functionale**: pe touch
 * nu exista hover, iar `onPointerEnter` este filtrat pe `pointerType === "mouse"`
 * ca sa nu se declanseze la atingere si sa se bata cap in cap cu clickul.
 *
 * Optiunile sunt `<input type="checkbox">` reale, nu `div`-uri cu `role`:
 * bifarea din tastatura, `Space`, si anuntarea starii vin gratis.
 */
export function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
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

  const id = `filtru-${label.replace(/\s+/g, "-").toLowerCase()}`;

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
        className="font-technical-data text-technical-data text-on-surface hover:text-primary flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 tracking-widest uppercase transition-colors"
      >
        <span className="flex items-center gap-1">
          <TextRoll lineHeight={LINE_HEIGHT}>{label}</TextRoll>
          {selected.length > 0 ? (
            <span className="text-primary">{`( ${selected.length} )`}</span>
          ) : null}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          aria-hidden
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={id}
          className="border-outline-variant bg-surface/98 absolute top-full left-0 z-20 mt-px flex min-w-64 flex-col border backdrop-blur-xl"
        >
          {options.map((option) => {
            const checked = selected.includes(option.id);
            return (
              <label
                key={option.id}
                className="hover:bg-surface-container font-technical-data text-technical-data text-on-surface flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option.id)}
                  className="accent-primary size-4 shrink-0 cursor-pointer"
                />
                {/* Fara TextRoll: efectul ramane doar pe eticheta facetei,
                    nu si pe valorile din panou. */}
                {option.label}
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
