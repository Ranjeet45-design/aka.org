"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; suffix?: string; duration?: number; className?: string };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up when scrolled into view. The final value is server-rendered (correct without JS);
 * the animation updates the DOM directly to avoid re-rendering React on every frame.
 */
export function AnimatedCounter({ value, suffix = "", duration = 1200, className }: Props) {
  const visual = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${n.toLocaleString("en-AU")}${suffix}`;

  useEffect(() => {
    const el = visual.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = fmt(Math.round(easeOut(p) * value));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, suffix]);

  return (
    <span className={className}>
      <span className="sr-only">{fmt(value)}</span>
      <span ref={visual} aria-hidden="true">
        {fmt(value)}
      </span>
    </span>
  );
}
