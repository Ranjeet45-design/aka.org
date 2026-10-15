import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
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
          <Reveal as="p" delay={0.2} className="reveal mt-6 max-w-2xl text-lg text-muted">
            {lead}
          </Reveal>

          <Reveal delay={0.25} className="reveal mt-10">
            <p className="eyebrow text-primary-deep">
              {variant === "volunteer" ? "Volunteer enquiry form" : "Send us a message"}
            </p>
            <ContactForm variant={variant} />
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Photo name="portrait-group" reveal sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] lg:aspect-[4/5]" position="50% 30%" />
        </aside>
      </div>
    </section>
  );
}
  