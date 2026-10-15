import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { POSTS, formatDate, postPath, readingTime } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and stories from the Australian Khalsa Association: ANZAC Day tributes, community service, education support and meetings with government leaders.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: "/blog/" },
};

export default function BlogPage() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="News & stories"
        title="The AKA Blog"
        accent={[2]}
        intro="Stories of seva, remembrance and community from across Australia."
        image="mawson-park"
        position="50% 40%"
      />

      <section className="section-y bg-background">
        <div className="gutter mx-auto max-w-[110rem]">
          <Reveal as="article" className="reveal">
            <Link href={postPath(lead)} className="zoom group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <Photo name={lead.image} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] lg:col-span-7" position="50% 30%" />
              <div className="lg:col-span-5">
                <p className="eyebrow mb-4 text-primary-deep">Latest</p>
                <p className="eyebrow mb-4 text-muted">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                </p>
                <h2 className="display-md text-ink transition-colors group-hover:text-primary-deep">{lead.title}</h2>
                <p className="mt-5 text-muted">{lead.excerpt}</p>
                <span className="u-link mt-8 inline-block text-[0.75rem] font-medium tracking-[0.18em] uppercase">
                  Read article
                </span>
              </div>
            </Link>
          </Reveal>

          <ul className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-32 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.1} className={`reveal ${i % 3 === 1 ? "lg:mt-16" : ""}`}>
                <Link href={postPath(p)} className="zoom group block">
                  <Photo name={p.image} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" className="aspect-[4/3]" />
                  <p className="eyebrow mt-6 text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {readingTime(p)} min read
                  </p>
                  <h2 className="font-display mt-3 text-2xl leading-snug font-medium tracking-tight text-ink transition-colors group-hover:text-primary-deep">
                    {p.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] text-muted">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
