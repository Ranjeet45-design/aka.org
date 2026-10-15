"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AIMS } from "@/lib/site";
import { PHOTOS } from "@/lib/images";

const Panel = ({ i }: { i: number }) => {
  const a = AIMS[i];
  const photo = PHOTOS[a.image];
  return (
    <article className="group relative flex h-full w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden bg-ink p-7 text-white sm:w-[60vw] md:p-10 lg:w-[34vw] lg:min-w-[30rem]">
      <div className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, (min-width: 640px) 130vw, 230vw"
          className="object-cover object-[50%_72%] transition-transform duration-[1600ms] lg:object-center ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <span className="font-display relative text-6xl font-light tracking-tighter text-primary tabular-nums md:text-7xl">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="relative">
        <h3 className="display-md mb-4 text-white">{a.title}</h3>
        <p className="max-w-md text-[0.95rem] leading-relaxed text-white/80 md:text-base">{a.text}</p>
      </div>
    </article>
  );
};

/**
 * "Our Key Aims" — pinned horizontal scroll on large screens (GSAP ScrollTrigger),
 * native scroll-snap carousel on touch / small screens and for reduced-motion users.
 */
export function Aims() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const updateEdge = useCallback(() => {
    const tr = track.current;
    if (!tr) return;
    setEdge({
      start: tr.scrollLeft <= 4,
      end: tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4,
    });
  }, []);

  const slide = (dir: 1 | -1) => {
    const tr = track.current;
    const card = tr?.querySelector("article");
    if (!tr || !card) return;
    tr.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    const mm = window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)");

    const setup = async () => {
      ctx?.revert();
      ctx = undefined;
      if (!mm.matches) return;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !mm.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const distance = () => tr.scrollWidth - el.clientWidth;
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, el);
    };

    setup();
    mm.addEventListener("change", setup);
    return () => {
      cancelled = true;
      mm.removeEventListener("change", setup);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="aims-title" className="relative overflow-hidden bg-surface">
      <div className="gutter mx-auto max-w-[110rem] pt-20 pb-10 md:pt-28 lg:pb-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-4 text-primary-deep">
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              What we do
            </p>
            <h2 id="aims-title" className="display-lg text-ink">
              Our Key <span className="text-primary-deep">Aims</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted">
            We organize cultural events, religious services, and educational programs to achieve our
            objectives and contribute to the wider Australian society.
          </p>
        </div>
      </div>

      <div
        ref={track}
        onScroll={updateEdge}
        className="no-scrollbar gutter flex h-[31.5rem] snap-x snap-mandatory gap-4 overflow-x-auto pb-6 will-change-transform md:h-[37.5rem] lg:h-[calc(100svh-17rem)] lg:min-h-[28rem] lg:pb-14 pin:snap-none pin:overflow-visible"
      >
        {AIMS.map((_, i) => (
          <Panel key={i} i={i} />
        ))}
        <div className="hidden w-[8vw] shrink-0 lg:block" aria-hidden="true" />
      </div>

      {/* Slider controls — shown whenever the aims are a native swipe carousel (not the pinned desktop scroll) */}
      <div className="gutter mx-auto flex max-w-[110rem] items-center justify-end gap-3 pb-14 pin:hidden">
        {(["prev", "next"] as const).map((dir) => {
          const disabled = dir === "prev" ? edge.start : edge.end;
          return (
            <button
              key={dir}
              type="button"
              onClick={() => slide(dir === "prev" ? -1 : 1)}
              disabled={disabled}
              aria-label={dir === "prev" ? "Previous aim" : "Next aim"}
              className="flex size-12 items-center justify-center rounded-full border border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className={dir === "prev" ? "rotate-180" : ""}>
                <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          );
        })}
      </div>
    </section>
  );
}
