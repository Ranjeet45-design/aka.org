import { STATS } from "@/lib/site";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";

export function Stats() {
  return (
    <section aria-label="AKA at a glance" className="relative overflow-hidden bg-primary text-ink">
      <div className="gutter mx-auto max-w-[110rem] py-20 md:py-28">
        <dl className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} className="reveal flex flex-col md:border-l md:border-ink/25 md:pl-8 first:md:border-0 first:md:pl-0">
              <dt className="order-2 mt-4 text-sm font-medium tracking-[0.2em] uppercase">{s.label}</dt>
              <dd className="order-1 font-display text-[clamp(4.5rem,11vw,10rem)] leading-[0.9] font-medium tracking-[-0.05em] tabular-nums">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
