"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { NAV, SITE } from "@/lib/site";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      if (y > 480 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 480) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled || open; // light text over the dark hero / menu

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,padding] duration-500 ease-out ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "bg-background/85 py-2.5 shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="gutter mx-auto flex max-w-[110rem] items-center justify-between">
          <Link
            href="/"
            aria-label={`${SITE.name} — home`}
            className="relative z-[60] flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={80}
              height={80}
              priority
              className={`rounded-full transition-all duration-500 ${scrolled ? "size-20" : "size-20 md:size-28"}`}
            />
            <span
              className={`font-display hidden text-[0.95rem] leading-tight font-medium tracking-tight transition-colors duration-500 sm:block ${
                light ? "text-white" : "text-ink"
              }`}
            >
              Australian Khalsa
              <br />
              Association
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`u-link py-1 text-[0.8125rem] font-medium tracking-[0.1em] uppercase transition-colors duration-500 ${
                    light ? "text-white" : "text-ink"
                  } ${active ? "!bg-[length:100%_1px]" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact-us/"
              className="btn btn-solid !px-6 !py-3.5 !text-[0.75rem]"
            >
              <span>Contact</span>
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-[60] -mr-2 flex size-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block h-px w-7 transition-all duration-500 ${light ? "bg-white" : "bg-ink"} ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-7 transition-all duration-500 ${light ? "bg-white" : "bg-ink"} ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <LazyMotion features={() => import("@/components/motion/motionFeatures").then((r) => r.default)}>
      <AnimatePresence>
            {open && (
              <m.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.75rem)" }}
                animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.75rem)" }}
                exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.75rem)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="gutter fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-ink pt-20 pb-8 text-white lg:hidden"
              >
                {/* Top Header Row with Logo & Close Button */}
                <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={48}
                      height={48}
                      priority
                      className="size-24 rounded-full object-cover"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-2 text-white/70 hover:text-white focus:outline-none"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <ul className="flex flex-col gap-1 my-auto">
                  {[...NAV, { label: "Contact Us", href: "/contact-us/" }].map((item, i) => (
                    <li key={item.href} className="overflow-hidden">
                      <m.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ duration: 0.8, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                          className="font-display flex items-baseline gap-4 py-2 text-[clamp(2rem,9vw,3.25rem)] leading-[1.1] font-medium tracking-tight aria-[current=page]:text-primary"
                        >
                          <span className="text-sm font-normal tracking-widest text-white/40 tabular-nums">
                            0{i + 1}
                          </span>
                          {item.label}
                        </Link>
                      </m.div>
                    </li>
                  ))}
                </ul>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-white/60 pt-4"
                >
                  <p className="eyebrow mb-2 text-primary">Registered Charity · Australia</p>
                  <a href={`mailto:${SITE.email}`} className="u-link text-lg text-white">
                    {SITE.email}
                  </a>
                  <p className="mt-1">{SITE.scope}</p>
                </m.div>
              </m.div>
            )}
      </AnimatePresence>
      </LazyMotion>
    </>
  );
}
