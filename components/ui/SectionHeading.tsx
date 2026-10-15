import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: number[];
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md";
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  light = false,
  className = "",
  as = "h2",
  size = "lg",
}: Props) {
  return (
    <div className={className}>
      <Reveal
        as="p"
        className={`reveal eyebrow mb-5 flex items-center gap-4 ${light ? "text-primary" : "text-primary-deep"}`}
      >
        <span className="h-px w-10 bg-current" aria-hidden="true" />
        {eyebrow}
      </Reveal>
      <Words
        as={as}
        text={title}
        accent={accent}
        className={`${size === "lg" ? "display-lg" : "display-md"} text-balance ${light ? "text-white" : "text-ink"}`}
      />
    </div>
  );
}
