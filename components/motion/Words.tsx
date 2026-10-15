import type { CSSProperties, ElementType } from "react";
import { Reveal } from "./Reveal";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Word indexes to render in the accent colour. */
  accent?: number[];
};

/** Masked, staggered word-by-word headline reveal. Server-rendered text, CSS-driven motion. */
export function Words({ text, as = "h2", className = "", delay = 0, accent = [] }: Props) {
  const words = text.split(" ");
  return (
    <Reveal as={as} className={`words ${className}`} delay={delay} threshold={0.3}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">
            <span
              style={{ "--i": i } as CSSProperties}
              className={accent.includes(i) ? "text-primary" : undefined}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Reveal>
  );
}
