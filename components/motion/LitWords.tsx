import type { CSSProperties } from "react";

/**
 * Scroll-scrubbed word highlight. Pure CSS (animation-timeline: view()),
 * degrades to fully visible text where unsupported. Zero JavaScript.
 */
export function LitWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={`lit-words ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="lw" style={{ "--n": i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
