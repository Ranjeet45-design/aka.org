import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function VolunteerCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Photo name="service-crowd" sizes="(min-width: 768px) 100vw, 340vw" parallax className="absolute! inset-0 -z-20" position="50% 40%" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="gutter mx-auto max-w-[110rem] py-28 md:py-44">
        <p className="eyebrow mb-8 flex items-center gap-4 text-primary">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          Join the mission
        </p>
        <Words
          as="h2"
          text="Together, we make a lasting difference."
          accent={[4, 5]}
          className="display-lg max-w-[16ch] text-balance"
        />
        <Reveal as="p" delay={0.3} className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          Our dedicated volunteers provide invaluable support across all our initiatives, ensuring
          the success of our programs and events. Together, our team is committed to making a
          positive impact on the Australian Sikh community, fostering unity, and promoting the rich
          heritage of Sikhism.
        </Reveal>
        <Reveal delay={0.45} className="reveal mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Button href="/become-volunteer/">Become Volunteer</Button>
          </Magnetic>
          <Button href="/contact-us/" variant="ghost-light" arrow={false}>
            Contact us
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
