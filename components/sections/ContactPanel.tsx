import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

type Props = {
  variant: "volunteer" | "contact";
  title: string;
  accent?: number[];
  lead: string;
};

const SUBJECT = { contact: "Enquiry from the AKA website", volunteer: "Volunteer enquiry" } as const;
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.region)}`;

/** "Connect with us" — direct contact options beside a location graphic. */
export function ContactPanel({ variant, title, accent, lead }: Props) {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(SUBJECT[variant])}`;
  return (
    <section className="section-y bg-background">
      <div className="gutter mx-auto grid max-w-[110rem] items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="LET’S TALK" title={title} accent={accent} size="md" />
          <Reveal as="p" delay={0.2} className="reveal mt-6 max-w-xl text-lg text-muted">
            {lead}
          </Reveal>

          <Reveal delay={0.3} className="reveal mt-12 border-t border-line pt-8">
            <p className="eyebrow mb-4 text-primary-deep">Write to us</p>
            <a
              href={mailto}
              className="u-link font-display text-[clamp(1.5rem,4.2vw,3.25rem)] leading-tight font-medium tracking-tight break-all text-ink"
            >
              {SITE.email}
            </a>
          </Reveal>

          <Reveal delay={0.4} className="reveal mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3 text-primary-deep">Location</h3>
              <p className="text-lg text-ink">{SITE.region}</p>
              <p className="text-sm text-muted">{SITE.scope}</p>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-primary-deep">Response</h3>
              <p className="text-lg text-ink">We read every message</p>
              <p className="text-sm text-muted">and reply as soon as we can.</p>
            </div>
          </Reveal>

          <Reveal delay={0.5} className="reveal mt-10 flex flex-wrap gap-3">
            <Button href={mailto}>Email Us</Button>
            <Button href={DIRECTIONS} variant="outline" arrow={false}>
              Get Directions
            </Button>
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Photo name="portrait-group" reveal sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] lg:aspect-[4/5]" position="50% 30%" />
        </aside>
      </div>
    </section>
  );
}
  