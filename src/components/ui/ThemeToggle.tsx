"use client";

import { useSyncExternalStore } from "react";

import { Tooltip } from "@/components/ui/Tooltip";
import { ThemeToggleButton4 } from "@/components/ui/skiper-ui/skiper4";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "almek:themechange";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tema reala traieste in DOM (`data-theme` pe <html>), pusa acolo de scriptul
 * inline din <head> inainte de primul paint. `useSyncExternalStore` o citeste
 * de acolo fara setState-in-effect si fara flash. Butonul animat vine din
 * Skiper UI (skiper4, varianta 4 — lampa cu snur), rulat in mod controlat.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/* Pe server nu stim tema; randam varianta light, care e si default-ul CSS. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // modul privat poate refuza scrierea; tema tine pana la reincarcare
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  /* Perdeaua dreapta→stanga cu blur traieste in globals.css, pe
     `::view-transition-*`; aici doar pornim tranzitia. Fara suport in browser
     (Firefox, Safari vechi) sau cand utilizatorul cere miscare redusa, tema se
     schimba instant — pseudo-elementele nu apar deloc, deci CSS-ul e inert. */
  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";

    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia(REDUCED_MOTION_QUERY).matches
    ) {
      apply(next);
      return;
    }

    document.startViewTransition(() => apply(next));
  };

  const label = isDark ? "Temă deschisă" : "Temă închisă";

  return (
    <Tooltip label={label}>
      <ThemeToggleButton4
        isDark={isDark}
        onToggle={toggle}
        aria-label={
          isDark ? "Comută pe tema deschisă" : "Comută pe tema închisă"
        }
        className="size-10 shrink-0 p-1.5"
      />
    </Tooltip>
  );
}
