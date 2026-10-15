import { Photo } from "@/components/ui/Photo";
import { Marquee } from "@/components/ui/Marquee";
import { Words } from "@/components/motion/Words";

const TICKER = [
  "Seva",
  "Langar",
  "Culture & Heritage",
  "Interfaith Dialogue",
  "ADF Support",
  "Community Belonging",
  "Crisis Relief",
] as const;

/** Full-bleed image moment — breaks the rhythm between content sections. */
export function SevaBanner() {
  return (
    <section aria-label="Seva — selfless service" className="relative isolate overflow-hidden bg-ink text-white">
      <Photo
        name="anzac-group"
        sizes="(min-width: 768px) 100vw, 280vw"
        parallax
        position="50% 35%"
        className="absolute! inset-0 -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-ink/65" />
      <div className="gutter mx-auto flex min-h-[80svh] max-w-[110rem] flex-col justify-center py-24 md:min-h-[95svh]">
        <p className="eyebrow mb-8 flex items-center gap-4 text-primary">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          Our guiding principle
        </p>
        <Words
          as="h2"
          text="We believe in serving without discrimination."
          accent={[5]}
          className="display-xl max-w-[15ch] text-balance"
        />
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/80">
          Regardless of religion, race, gender, or belief — whether educating the broader Australian
          community, providing spiritual guidance, or supporting those affected by natural disasters
          and homelessness.
        </p>
      </div>
      <Marquee items={TICKER} className="border-t border-white/15 bg-ink/40 py-6 text-white backdrop-blur-sm" />
    </section>
  );
}
