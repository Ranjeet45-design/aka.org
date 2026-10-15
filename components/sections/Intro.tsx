import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { LitWords } from "@/components/motion/LitWords";

export function Intro() {
  return (
    <section id="who-we-are" className="section-y relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Delicate background blur for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="gutter mx-auto max-w-[110rem]">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-16">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7">
            <Reveal as="p" className="reveal eyebrow mb-8 flex items-center gap-4 text-primary-deep">
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium">Who We Are</span>
            </Reveal>

            <h2 className="sr-only">Who We Are</h2>

            <LitWords
              className="font-display text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.2] font-normal tracking-[-0.02em] text-balance text-ink"
              text="The Australian Khalsa Association Incorporated (AKA) is a registered not-for-profit charitable Sikh organization. We work tirelessly to support the Australian Sikh community and are deeply dedicated to promoting the universal teachings of Sikhism."
            />

            <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
              <Reveal as="p" className="reveal text-base md:text-lg leading-relaxed text-muted font-normal">
                We believe in serving without discrimination. Whether it&rsquo;s educating the broader
                Australian community, providing spiritual guidance, or supporting those affected by
                natural disasters and homelessness, the AKA stands ready to assist regardless of
                religion, race, gender, or belief.
              </Reveal>

              {/* Elevated Seva Card */}
              <Reveal 
                delay={0.15} 
                className="reveal bg-primary p-8 text-ink md:p-10"
              >
                <p className="eyebrow mb-3 text-xs uppercase tracking-[0.15em] opacity-60 font-medium">
                  Our guiding principle
                </p>
                <p className="font-display text-3xl leading-tight font-normal tracking-tight">
                  Seva
                  <span className="block text-lg font-light opacity-80 mt-1">(Selfless Service)</span>
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed opacity-80 font-normal">
                  The core principle driving everything we do.
                </p>
              </Reveal>
            </div>

            <Reveal className="reveal mt-12" delay={0.1}>
              <Button href="/about-us/" variant="dark">
                Know More About Us
              </Button>
            </Reveal>
          </div>

          {/* Right Column Photos */}
          <div className="relative lg:col-span-5 pt-8 lg:pt-0">
            {/* Primary Portrait Photo Container */}
            <div className="relative ml-auto w-full sm:w-[88%] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Photo
                name="portrait-group"
                reveal
                sizes="(min-width: 1024px) 40vw, 90vw"
                position="30% 30%" 
                className="aspect-[4/3] sm:aspect-[4/5] w-full object-cover"
              />
            </div>

            {/* Overlapping Floating Secondary Photo */}
            <div className="absolute -bottom-8 left-0 w-[52%] overflow-hidden  border-[8px] border-background bg-background shadow-2xl md:-bottom-12 transition-transform duration-500 hover:-translate-y-1">
              <Photo
                name="turbans-close"
                reveal
                delay={0.25}
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}