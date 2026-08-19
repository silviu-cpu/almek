"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "[2]",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]",
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

/* PATCH ALMEK: spatiile nu supravietuiesc lui `inline-block` — un span care
   contine doar " " se colapseaza la latime zero si cuvintele se lipesc. */
const renderChar = (char: string) => (char === " " ? " " : char);

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  /* PATCH ALMEK: 0.75 (valoarea upstream) taie sedilele lui ș/ț sub
     `overflow-hidden`. Ramane default ca sa nu schimbam demo-ul, dar apelantii
     cu diacritice romanesti trec inaltimea reala a randului. */
  lineHeight?: number;
}> = ({ children, className, center = false, lineHeight = 0.75 }) => {
  /* PATCH ALMEK: framer-motion animeaza transformari in JS, deci regula
     `prefers-reduced-motion` din globals.css nu o opreste. */
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight,
      }}
    >
      {/* PATCH ALMEK: textul apare de doua ori, spart in litere. Fara asta
          cititoarele de ecran il silabisesc si il repeta. */}
      <span className="sr-only">{children}</span>

      <div aria-hidden>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {renderChar(l)}
            </motion.span>
          );
        })}
      </div>
      <div aria-hidden className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {renderChar(l)}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
