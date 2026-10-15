import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { POSTS, formatDate, getPost, postPath, readingTime } from "@/lib/posts";
import { PHOTOS } from "@/lib/images";
import { SITE } from "@/lib/site";

type Params = { year: string; month: string; day: string; slug: string };

export function generateStaticParams() {
  return POSTS.map((p) => {
    const [year, month, day] = p.date.split("-");
    return { year, month, day, slug: p.slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = getPost(year, month, day, slug);
  if (!post) return {};
  const url = postPath(post);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: PHOTOS[post.image].src, width: PHOTOS[post.image].w, height: PHOTOS[post.image].h, alt: PHOTOS[post.image].alt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { year, month, day, slug } = await params;
  const post = getPost(year, month, day, slug);
  if (!post) notFound();

  const i = POSTS.indexOf(post);
  const newer = POSTS[i - 1];
  const older = POSTS[i + 1];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png` } },
    image: `${SITE.url}${PHOTOS[post.image].src}`,
    mainEntityOfPage: `${SITE.url}${postPath(post)}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className="grain relative isolate flex min-h-[80svh] items-end overflow-hidden bg-ink text-white">
          <Photo name={post.image} sizes="(min-width: 768px) 100vw, 260vw" priority className="absolute! inset-0 -z-10" imgClassName="kenburns" position="50% 35%" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
          <div className="gutter mx-auto w-full max-w-[110rem] pt-40 pb-14 md:pb-20">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-white/70">
              <Link href="/blog/" className="u-link">
                Blog
              </Link>{" "}
              <span aria-hidden="true">/</span> <span className="text-primary">Article</span>
            </nav>
            <Words as="h1" text={post.title} className="display-lg max-w-[22ch] text-balance" delay={0.1} />
            <Reveal as="p" delay={0.6} className="reveal eyebrow mt-8 text-white/70">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · By {post.author} · {readingTime(post)} min read
            </Reveal>
          </div>
        </header>

        <div className="gutter bg-background py-20 md:py-32">
          <div className="mx-auto max-w-[44rem]">
            {post.body.map((b, n) => {
              if (b.t === "h")
                return (
                  <h2 key={n} className="font-display mt-14 mb-5 text-[clamp(1.5rem,2.6vw,2.15rem)] leading-tight font-medium tracking-[-0.025em] text-ink first:mt-0">
                    {b.text}
                  </h2>
                );
              if (b.t === "ul")
                return (
                  <ul key={n} className="my-6 space-y-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-4 text-lg text-ink/85">
                        <span className="mt-[0.7em] size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p
                  key={n}
                  className={`my-5 text-lg leading-[1.8] text-ink/80 ${n === 1 ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:font-medium first-letter:text-primary" : ""}`}
                >
                  {b.text}
                </p>
              );
            })}
          </div>
        </div>

        <nav aria-label="More articles" className="border-t border-ink/10 bg-surface">
          <div className="gutter mx-auto grid max-w-[110rem] divide-ink/10 md:grid-cols-2 md:divide-x">
            {[
              { p: newer, label: "Newer article" },
              { p: older, label: "Older article" },
            ].map(({ p, label }, k) =>
              p ? (
                <Link key={label} href={postPath(p)} className={`group block py-12 md:py-16 ${k === 1 ? "md:pl-12 md:text-right" : "md:pr-12"}`}>
                  <p className="eyebrow mb-3 text-primary-deep">{label}</p>
                  <p className="font-display text-xl leading-snug font-medium tracking-tight text-ink transition-colors group-hover:text-primary-deep md:text-2xl">
                    {p.title}
                  </p>
                </Link>
              ) : (
                <div key={label} className="hidden md:block" />
              ),
            )}
          </div>
        </nav>

        <div className="gutter bg-background py-16 text-center">
          <Button href="/blog/" variant="outline">
            Back to all articles
          </Button>
        </div>
      </article>
    </>
  );
}
