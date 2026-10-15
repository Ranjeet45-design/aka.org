"use client";

import { useState, useEffect } from "react";
import { Photo } from "@/components/ui/Photo";
import { PHOTOS } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

interface GalleryItem {
  id: number;
  name:
    | "march-street"
    | "wreath-laying"
    | "minto-school"
    | "cenotaph"
    | "mawson-park"
    | "parliament";
  title: string;
  alt: string;
  position?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    name: "march-street",
    title: "March on Street",
    alt: "Community members marching along the street banner",
  },
  {
    id: 2,
    name: "wreath-laying",
    title: "Wreath Laying Ceremony",
    alt: "Wreath laying ceremony honoring community heroes",
    position: "50% 30%",
  },
  {
    id: 3,
    name: "minto-school",
    title: "Minto School Gathering",
    alt: "School gathering and interactive event",
  },
  {
    id: 4,
    name: "cenotaph",
    title: "Cenotaph Tribute",
    alt: "Group photo at the local memorial cenotaph",
  },
  {
    id: 5,
    name: "mawson-park",
    title: "Mawson Park Event",
    alt: "Community gathering at Mawson Park",
  },
  {
    id: 6,
    name: "parliament",
    title: "Parliament Visit",
    alt: "Dignitaries and community representatives at parliament",
  },
];

export function GalleryStrip() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const handlePrevMobile = () => {
    setMobileIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const handleNextMobile = () => {
    setMobileIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Lock scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  const activePhoto = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section className="section-y overflow-hidden bg-surface py-16 md:py-24">
      <div className="gutter mx-auto max-w-[110rem] px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="Photo Gallery"
            title="Moments from our community."
            accent={[2, 3]}
          />
          <Reveal className="reveal flex items-end lg:col-span-4 lg:justify-end">
            <Button href="/photo-gallery/" variant="dark">
              View gallery
            </Button>
          </Reveal>
        </div>

        {/* ---------------- MOBILE CAROUSEL (< sm) ---------------- */}
        <div className="block sm:hidden">
          <div className="relative overflow-hidden shadow-md">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {GALLERY_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative min-w-full flex-shrink-0 cursor-pointer overflow-hidden"
                >
                  <Photo
                    name={item.name}
                    position={item.position}
                    sizes="100vw"
                    className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-white">{item.title}</span>
                      <div className="flex h-8 w-8 items-center justify-center  bg-white/20 text-white backdrop-blur-md">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Prev/Next Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevMobile();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors active:bg-black/70"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextMobile();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors active:bg-black/70"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Dot Navigation */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {GALLERY_ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  mobileIndex === idx ? "w-6 bg-primary" : "w-2.5 bg-neutral-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ---------------- DESKTOP / TABLET MASONRY GRID (≥ sm) ---------------- */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Top Tall */}
            <div
              onClick={() => setSelectedIndex(0)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[0].name}
                positionMobile="18% 50%"
                reveal
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[0].title} />
            </div>

            {/* Bottom Square */}
            <div
              onClick={() => setSelectedIndex(3)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[3].name}
                reveal
                delay={0.1}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[3].title} />
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Top Wide */}
            <div
              onClick={() => setSelectedIndex(1)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[1].name}
                reveal
                delay={0.1}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                position={GALLERY_ITEMS[1].position}
                className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[1].title} />
            </div>

            {/* Bottom Tall */}
            <div
              onClick={() => setSelectedIndex(4)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[4].name}
                reveal
                delay={0.2}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                className="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[4].title} />
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1 md:gap-5">
            {/* Top Tall */}
            <div
              onClick={() => setSelectedIndex(2)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[2].name}
                reveal
                delay={0.2}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                className="h-[380px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[2].title} />
            </div>

            {/* Bottom Short */}
            <div
              onClick={() => setSelectedIndex(5)}
              className="group relative cursor-pointer overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Photo
                name={GALLERY_ITEMS[5].name}
                reveal
                delay={0.3}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 560px"
                className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <HoverOverlay title={GALLERY_ITEMS[5].title} />
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
              );
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:left-8"
            aria-label="Previous photo"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Lightbox Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
              );
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:right-8"
            aria-label="Next photo"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-h-[85vh] max-w-5xl overflow-hidden  bg-black/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                aspectRatio: `${PHOTOS[activePhoto.name].w} / ${PHOTOS[activePhoto.name].h}`,
                width: `min(92vw, 64rem, calc(70vh * ${PHOTOS[activePhoto.name].w / PHOTOS[activePhoto.name].h}))`,
              }}
            >
              <Photo
                name={activePhoto.name}
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="h-full w-full"
              />
            </div>
            <div className="bg-black/80 px-6 py-4 text-center text-white">
              <h3 className="text-lg font-medium">{activePhoto.title}</h3>
              <p className="text-xs text-white/60">
                {selectedIndex + 1} of {GALLERY_ITEMS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** Hover Overlay with Zoom Icon & Title */
function HoverOverlay({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-5">
      <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center bg-white/20 text-white backdrop-blur-md">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}