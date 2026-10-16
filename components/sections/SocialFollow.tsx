import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const PROFILES = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/australian_khalsa_association/?hl=en",
    icon: "/social-media/instagram.png",
    cta: "Follow on Instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Australian-Khalsa-Association-Incorporated-61558580174236/",
    icon: "/social-media/facebook.png",
    cta: "Follow on Facebook",
  },
] as const;

export function SocialFollow() {
  return (
    <section aria-labelledby="social-follow-heading" className="section-y py-16 md:py-24">
      <div className="gutter mx-auto max-w-[110rem] px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Stay connected"
              title="Follow the Australian Khalsa Association."
              accent={[2]}
            />
            <Reveal as="p" delay={0.2} className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Follow AKA on Instagram and Facebook for the latest news, events and announcements from
              our community. See our seva, langar, heritage and community activities as they happen,
              and stay informed about how you can get involved.
            </Reveal>
          </div>

          <Reveal delay={0.3} className="reveal lg:col-span-5">
            <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:justify-end">
              {PROFILES.map((p) => (
                <li key={p.name} className="sm:flex-1 lg:flex-none">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.cta} (opens in a new tab)`}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/50 px-5 py-4 transition-colors hover:border-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-deep"
                  >
                    <Image
                      src={p.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain transition-transform group-hover:scale-105 md:h-14 md:w-14"
                    />
                    <span className="font-semibold text-ink">{p.cta}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
