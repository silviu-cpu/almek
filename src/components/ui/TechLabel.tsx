import type { ReactNode } from "react";

/** Eticheta monospaced uppercase folosita ca "metadata" deasupra titlurilor. */
export function TechLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-technical-data text-technical-data text-primary block tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  );
}
