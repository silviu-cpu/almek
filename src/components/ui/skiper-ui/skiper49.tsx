"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper49 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper49 };

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string; title?: string; description?: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  /* PATCH ALMEK: Swiper poate bucla doar daca vede mai putin de jumatate din
     slide-uri deodata. Aici incap ~3,7 slide-uri intregi de 300px plus doua
     partiale, iar sursa are doar 5: la initializare umplea numai stanga
     slide-ului activ si se repara abia la primul click pe sageti.

     Repetam lista pana trecem pragul cu marja. Cu factorul 3 (nu 2) ajungem la
     15 slide-uri: 5 vizibile fata de 7,5 permise. La factorul 2 ieseau 10, iar
     5 < 5 este fals — exact pe muchie, adica tot rupt. Utilizatorul nu vede
     repetitia: ar trebui sa parcurga un ciclu intreg. */
  const MAX_VISIBLE_SLIDES = 5;
  const cycles =
    loop && images.length > 0
      ? Math.max(1, Math.ceil((MAX_VISIBLE_SLIDES * 3) / images.length))
      : 1;
  const slides = Array.from({ length: cycles }, (_, cycle) =>
    images.map((image, index) => ({ image, key: `${cycle}-${index}` })),
  ).flat();

  const css = `
  .Carousal_003 {
    width: 100%;
    height: 460px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  /* PATCH ALMEK: era #000 hardcodat, invizibil pe tema dark. */
  .Carousal_003 .swiper-pagination-bullet {
    background-color: currentColor !important;
  }

`;
  return (
    /* PATCH ALMEK: aici erau doua <motion.div> de intrare — cel exterior tinea
       un `translateY` timp de 0.5s dupa montare. Swiper se initializa inauntrul
       unui container inca transformat si in miscare, iar `observeParents` se
       declansa la fiecare cadru al animatiei, ceea ce lasa `loopFix()` pe
       jumatate aplicat: slide-uri doar in stanga celui activ. Containerul e
       static acum. */
    <div className={cn("relative w-full max-w-4xl px-5", className)}>
      <style>{css}</style>

      <div className="w-full">
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          /* PATCH ALMEK: rezerva pentru `loopFix()` pe ambele parti, plus
             remasurare cand containerul se schimba — fonturile Google se
             incarca dupa primul paint si misca layout-ul sub carusel. */
          loopAdditionalSlides={2}
          observer={true}
          observeParents={true}
          /* PATCH ALMEK: in dev, React Strict Mode monteaza de doua ori, iar
             instanta refolosita ramane cu masuratorile primei montari. Fortam o
             remasurare in cadrul urmator — atunci layout-ul e asezat — si
             recompunem bucla, ca slide-urile sa apara pe ambele parti fara sa
             fie nevoie de un click pe sageti. */
          onSwiper={(swiper) => {
            requestAnimationFrame(() => {
              if (swiper.destroyed) return;
              swiper.update();
              if (loop) swiper.loopFix();
            });
          }}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {slides.map(({ image, key }) => (
            <SwiperSlide key={key} className="">
              {/* PATCH ALMEK: slide-ul original era doar <img>. Am adaugat un
                  overlay optional cu titlu si descriere, ca sectiunea sa nu
                  piarda continutul text pe care il avea inainte de carusel. */}
              <figure className="border-outline-variant relative h-full w-full overflow-hidden border">
                <img
                  className="h-full w-full object-cover"
                  src={image.src}
                  alt={image.alt}
                />
                {image.title ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5 text-left">
                    <span className="font-headline-md text-headline-md block text-white">
                      {image.title}
                    </span>
                    {image.description ? (
                      <span className="font-technical-data text-technical-data mt-1 block text-white/75">
                        {image.description}
                      </span>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export { Carousel_003 };

/**
 * Skiper 49 Carousel_003 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
