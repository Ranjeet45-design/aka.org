import { MISSION, VISION } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Block = {
  index: string;
  label: string;
  statement: string;
  points: readonly { title: string; text: string }[];
};

function Column({ block, delay = 0 }: { block: Block; delay?: number }) {
  return (
    <Reveal delay={delay} className="reveal border-t border-white/20 pt-8">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-3xl font-medium tracking-tight text-primary md:text-4xl">
          {block.label}
        </h3>
        <span className="font-display text-sm tracking-[0.2em] text-white/40">{block.index}</span>
      </div>
      <p className="mt-6 max-w-lg text-xl leading-snug text-white md:text-2xl">{block.statement}</p>
      <ul className="mt-10 divide-y divide-white/10 border-t border-white/10">
        {block.points.map((p) => (
          <li key={p.title} className="grid gap-1 py-5 md:grid-cols-[11rem_1fr] md:gap-6">
            <h4 className="font-display text-base font-medium text-white">{p.title}</h4>
            <p className="text-[0.95rem] leading-relaxed text-white/65">{p.text}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function MissionVision({ heading = true }: { heading?: boolean }) {
  return (
    <section className="grain section-y relative bg-ink text-white">
      <div className="gutter mx-auto max-w-[110rem]">
        {heading && (
          <SectionHeading
            light
            eyebrow="Purpose & direction"
            title="Why we exist, and where we are going."
            accent={[6, 7]}
            className="mb-16 max-w-4xl md:mb-24"
          />
        )}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Column
            block={{ index: "01", label: "Our Mission", statement: MISSION.statement, points: MISSION.points }}
          />
          <Column
            delay={0.15}
            block={{ index: "02", label: "Our Vision", statement: VISION.statement, points: VISION.points }}
          />
        </div>
      </div>
    </section>
  );
}
