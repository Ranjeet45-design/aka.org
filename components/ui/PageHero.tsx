import type { PhotoKey } from "@/lib/images";
import { Photo } from "./Photo";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: number[];
  intro?: string;
  image: PhotoKey;
  position?: string;
};

/** Dark, image-led header used by every inner page. Contains the page H1. */
export function PageHero({ eyebrow, title, accent, intro, image, position }: Props) {
  return (
    <section className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-white md:min-h-[88svh]">
      <Photo
        name={image}
        sizes="(min-width: 768px) 100vw, 260vw"
        priority
        position={position}
        className="absolute! inset-0 -z-10"
        imgClassName="kenburns"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
      <div className="gutter relative mx-auto w-full max-w-[110rem] pt-40 pb-16 md:pb-24">
        <Reveal as="p" className="reveal eyebrow mb-8 text-primary">
          {eyebrow}
        </Reveal>
        <Words as="h1" text={title} accent={accent} className="display-hero max-w-[18ch] text-balance" delay={0.1} />
        {intro && (
          <Reveal as="p" delay={0.5} className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {intro}
          </Reveal>
        )}
      </div>
    </section>
  );
}
