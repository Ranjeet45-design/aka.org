import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { LitWords } from "@/components/motion/LitWords";
import { MissionVision } from "@/components/sections/MissionVision";
import { Stats } from "@/components/sections/Stats";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Australian Khalsa Association (AKA) is a registered not-for-profit charitable Sikh organization dedicated to promoting Sikhism and uplifting the lives of individuals across Australia.",
  alternates: { canonical: "/about-us/" },
  openGraph: { url: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Registered Charity Australia"
        title="Supporting the Australian Sikh Community"
        accent={[3, 4, 5]}
        intro="The Australian Khalsa Association (AKA) is a registered not-for-profit charitable Sikh organization dedicated to promoting Sikhism and uplifting the lives of individuals across Australia."
        image="anzac-group"
        position="50% 35%"
      />

      <section className="section-y bg-background">
        <div className="gutter mx-auto grid max-w-[110rem] gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <h2 className="sr-only">Our work</h2>
            <LitWords
              className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance text-ink"
              text="The AKA works tirelessly to support the Australian Sikh community. We are dedicated to promoting the teachings of Sikhism while ensuring that our support reaches those in need, regardless of religion, race, gender, or belief."
            />
            <Reveal as="p" className="reveal mt-12 max-w-2xl text-lg leading-relaxed text-muted">
              From cultural events and religious services to educational programs, our objectives are
              rooted in the values of selfless service (Seva) and community cohesion.
            </Reveal>

           <Reveal as="dl" className="reveal mt-14 max-w-xl gap-8 border-t border-ink/15 pt-10 text-center">
            <div className="mx-auto text-center">
              <dt className="eyebrow mb-2 !text-xl font-bold text-primary-deep">Helpline</dt>
              <dd>
                <a href={SITE.tollFreeTel} className="font-display text-5xl font-medium tracking-tight text-ink u-link hover:opacity-80">
                  {SITE.tollFree}
                </a>
              </dd>
            </div>
          </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Photo
              name="cenotaph"
              reveal
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/5]"
              position="40% 50%"
            />
          </div>
        </div>
      </section>

      <MissionVision />

      <section className="bg-surface">
        <div className="gutter mx-auto max-w-[110rem] py-24 md:py-36">
          <Reveal
            as="blockquote"
            className="reveal font-display mx-auto max-w-5xl text-center text-[clamp(1.6rem,3.6vw,3.4rem)] leading-[1.18] font-medium tracking-[-0.03em] text-balance text-ink"
          >
            <span className="text-primary" aria-hidden="true">
              &ldquo;
            </span>
            Driven by passion and a commitment to service, our team works tirelessly to uphold the
            values and mission of the Australian Khalsa Association.
            <span className="text-primary" aria-hidden="true">
              &rdquo;
            </span>
          </Reveal>
        </div>
      </section>

      <Stats />
      <VolunteerCTA />
    </>
  );
}
