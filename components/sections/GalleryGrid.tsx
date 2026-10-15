"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY, PHOTOS } from "@/lib/images";

/** Masonry-style gallery with an accessible keyboard-navigable lightbox. */
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const total = GALLERY.length;

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (active === null) return;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : PHOTOS[GALLERY[active]];

  return (
    <>
      <ul className="columns-1 gap-3 sm:columns-2 md:gap-5 lg:columns-3">
        {GALLERY.map((key, i) => {
          const p = PHOTOS[key];
          return (
            <li key={key} className="mb-3 break-inside-avoid md:mb-5">
              <button
                type="button"
                className="zoom group relative block w-full overflow-hidden bg-surface text-left"
                aria-label={`Open photo ${i + 1} of ${total}: ${p.alt}`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(i);
                }}
              >
                <span className="zoom-img block">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />
                </span>
                <span className="bg-ink/0 group-hover:bg-ink/30 absolute inset-0 flex items-end justify-between p-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow">View</span>
                  <span className="font-display text-sm tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {current && active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="bg-ink/95 fixed inset-0 z-[80] flex flex-col backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 text-white">
              <p className="font-display text-sm tabular-nums">
                {String(active + 1).padStart(2, "0")} / {total}
              </p>
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                className="eyebrow rounded-full border border-white/30 px-5 py-3 transition-colors hover:bg-white hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0 px-4 md:px-24"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
                  onClick={() => step(dir === "prev" ? -1 : 1)}
                  className={`absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink ${
                    dir === "prev" ? "left-3 md:left-6" : "right-3 md:right-6"
                  }`}
                >
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className={dir === "prev" ? "rotate-180" : ""}>
                    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              ))}
            </div>
            <p className="px-5 py-4 text-center text-sm text-white/70">{current.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
