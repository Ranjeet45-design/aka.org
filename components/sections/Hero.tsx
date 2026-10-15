import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
      <Photo
        name="march-street"
        sizes="(min-width: 768px) 100vw, 330vw"
        priority
        position="50% 40%"
        positionMobile="10% 50%"
        className="absolute! inset-0 -z-20"
        imgClassName="kenburns"
      />
      {/* Navy wash keeps type legible while letting the photograph breathe */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="hero-drift gutter relative mx-auto w-full max-w-[110rem] pt-36 pb-10 md:pb-14">
        <Reveal as="p" delay={0.2} className="reveal eyebrow mb-6 flex items-center gap-4 text-primary md:mb-8">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          Registered Charity · Australia
        </Reveal>

        <Words
          as="h1"
          text={SITE.tagline}
          accent={[3]}
          delay={0.3}
          className="display-xl max-w-[12ch] text-balance md:max-w-[14ch]"
        />

        <div className="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal
              as="p"
              delay={0.9}
              className="reveal max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              We are dedicated to supporting the Australian Sikh community, promoting the teachings
              of Sikhism, and providing unconditional support to all Australians in times of need.
            </Reveal>
            <Reveal delay={1.05} className="reveal mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="/about-us/">Know More About Us</Button>
              </Magnetic>
              <Button href="/become-volunteer/" variant="ghost-light" arrow={false}>
                Become Volunteer
              </Button>
            </Reveal>
          </div>

          <Reveal delay={1.2} className="reveal hidden items-end justify-end gap-6 lg:col-span-6 lg:flex">
            <p className="max-w-[16rem] text-right text-sm leading-snug text-white/60">
              Sikh ANZAC remembrance march —<br />
              honouring service and sacrifice.
            </p>
            <a
              href="#who-we-are"
              aria-label="Scroll to content"
              className="relative block h-16 w-px overflow-hidden bg-white/25 text-primary"
            >
              <span className="scroll-cue absolute inset-0" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
