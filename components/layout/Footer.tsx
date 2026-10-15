import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <div className="gutter mx-auto max-w-[110rem] pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Compact Layout */}
          <div className="lg:col-span-5"> 
            <div className="mb-6 flex items-center gap-4">
              <Link
                  href="/"
                  aria-label={`${SITE.name} — home`}
                  className="relative z-[60] flex items-center gap-3"
                >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="h-20 w-20 rounded-full object-cover shadow-xs md:h-24 md:w-24"
              />

              <div className="flex flex-col justify-center">
                <p className="eyebrow text-xs font-semibold uppercase tracking-widest text-primary">
                  Seva · Unity · Service
                </p>
              </div>
              </Link>
            </div>
            <p className="max-w-md text-white text-xl md:text-4xl font-medium tracking-[-0.03em] leading-[1.08]">
              Ready to serve alongside us? Every act of seva begins with one person.
            </p>
            <div className="mt-6">
              <Button href="/become-volunteer/">Become Volunteer</Button>
            </div>
          </div>

          {/* Right Column Grid - Balanced Layout for Links, Contact, and Purpose */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">
            <nav aria-label="Footer">
              <h2 className="eyebrow mb-4 text-xs uppercase tracking-wider text-white/50">Explore</h2>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-link text-sm text-white/90 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow mb-4 text-xs uppercase tracking-wider text-white/50">Contact</h2>
              <ul className="space-y-2.5 text-sm text-white/90">
                <li>
                  <a href={SITE.tollFreeTel} className="u-link font-semibold hover:text-white">
                    {SITE.tollFree}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="u-link break-all hover:text-white">
                    {SITE.email}
                  </a>
                </li>
                <li>{SITE.region}</li>
                <li className="text-white/60">{SITE.scope}</li>
              </ul>
            </div>

            {/* Our Purpose - Given proper space so text flows naturally */}
            <div>
              <h2 className="eyebrow mb-4 text-xs uppercase tracking-wider text-white/50">Our Purpose</h2>
              <p className="text-sm leading-relaxed text-white/70">
                A registered not-for-profit charitable Sikh organization dedicated to supporting
                the community, preserving heritage, and serving humanity.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="font-display mt-8 -mb-[0.12em] text-center text-[clamp(6rem,25vw,30rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-white/[0.06] select-none"
        >
          AKA
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <p>© 2026 Australian Khalsa Association Inc. All rights reserved.</p>
          </div>
          <p className="text-white/60">
            Website Designed and developed By:{" "}
            <a
              href="https://www.amrsoftec.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors"
            >
              AMR Softec
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}