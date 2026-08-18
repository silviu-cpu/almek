import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Tooltip pur CSS — fara stare, fara dependenta, deci merge si intr-un Server
 * Component. Apare la hover SI la focus de tastatura (`group-focus-within`),
 * ceea ce tooltip-ul nativ `title` nu face niciodata.
 *
 * Este marcat `aria-hidden`: declansatorul isi poarta deja numele accesibil
 * prin `aria-label`, iar un tooltip anuntat in plus ar dubla mesajul.
 */
export function Tooltip({
  label,
  children,
  side = "bottom",
  className,
}: {
  label: string;
  children: ReactNode;
  side?: "bottom" | "top";
  className?: string;
}) {
  const isBottom = side === "bottom";

  return (
    <span className={cn("group/tt relative inline-flex", className)}>
      {children}

      <span
        role="tooltip"
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2",
          "scale-95 opacity-0 transition-all duration-200 ease-out",
          "group-hover/tt:scale-100 group-hover/tt:opacity-100",
          "group-focus-within/tt:scale-100 group-focus-within/tt:opacity-100",
          isBottom
            ? "top-full mt-3 translate-y-1 group-hover/tt:translate-y-0 group-focus-within/tt:translate-y-0"
            : "bottom-full mb-3 -translate-y-1 group-hover/tt:translate-y-0 group-focus-within/tt:translate-y-0",
        )}
      >
        <span className="border-outline-variant bg-surface-container-highest/95 text-on-surface font-technical-data text-label-caps block border px-3 py-1.5 whitespace-nowrap uppercase shadow-lg backdrop-blur-md">
          {label}
        </span>

        {/* Varful: un patrat rotit 45°, cu doar doua laturi de bordura, ca sa
            se imbine cu caseta fara sa taie o linie peste ea. */}
        <span
          aria-hidden
          className={cn(
            "border-outline-variant bg-surface-container-highest absolute left-1/2 size-2 -translate-x-1/2 rotate-45",
            isBottom ? "-top-[5px] border-t border-l" : "-bottom-[5px] border-r border-b",
          )}
        />
      </span>
    </span>
  );
}
