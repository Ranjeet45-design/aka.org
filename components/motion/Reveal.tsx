"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * Adds data-in="true" once the element scrolls into view. All visual
 * work is CSS (see .reveal / .words / .clip-reveal in globals.css), so the
 * JS cost is a single IntersectionObserver per element.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  y,
  threshold = 0,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at load: show instantly, no animation
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.dataset.in = "instant";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      // Start the fade slightly before the element enters the viewport
      { threshold, rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const style = {
    "--reveal-delay": `${delay}s`,
    ...(y !== undefined ? { "--reveal-y": `${y}px` } : {}),
  } as CSSProperties;

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
