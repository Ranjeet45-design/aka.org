import Link from "next/link";
import { POSTS, formatDate, postPath, type Post } from "@/lib/posts";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

function Meta({ post }: { post: Post }) {
  const wordCount = post.excerpt ? post.excerpt.split(/\s+/).length * 8 : 200;
  const readTime = Math.max(2, Math.ceil(wordCount / 200));

  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="inline-block h-1 w-1 rounded-full bg-muted/40" />
      <span>{readTime} min read</span>
    </div>
  );
}

export function JournalPreview() {
  const [lead, ...rest] = POSTS;
  // Slice up to 4 cards for the side column
  const side = rest.slice(0, 4);

  return (
    <section className="section-y bg-surface/50 py-16 md:py-24">
      <div className="gutter mx-auto max-w-[110rem] px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title="Stories of service."
            accent={[2]}
          /> 
           <Reveal className="reveal flex items-end lg:col-span-4 lg:justify-end">
            <Button href="/blog/" variant="outline">
              All articles
            </Button>
          </Reveal>
        </div>

        {/* Featured Grid */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Main Lead Story */}
          {lead && (
            <Reveal className="reveal lg:col-span-7">
              <Link
                href={postPath(lead)}
                className="group relative flex h-full flex-col overflow-hidden bg-background p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden ">
                  <Photo
                    name={lead.image}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    position="50% 30%"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-4 py-1 text-xs font-semibold text-ink shadow-xs">
                    Featured
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
                  <div>
                    <Meta post={lead} />
                    <h3 className="display-md mt-3 font-display text-2xl md:text-3xl font-semibold text-ink transition-colors group-hover:text-primary-deep">
                      {lead.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm md:text-base leading-relaxed text-muted">
                      {lead.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-xs uppercase tracking-widest text-primary-deep">
                    <span>Read Full Story</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Secondary Side Column (3 to 4 Cards) */}
          <div className="flex flex-col gap-4 lg:col-span-5 justify-between">
            {side.map((p, i) => (
              <Reveal key={p.slug} delay={0.08 * (i + 1)} className="reveal flex-1">
                <Link
                  href={postPath(p)}
                  className="group flex h-full flex-col sm:flex-row items-stretch gap-4 overflow-hidden bg-background p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative shrink-0 w-full sm:w-[180px] aspect-[16/9] sm:aspect-auto overflow-hidden">
                    <Photo
                      name={p.image}
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 220px, 90vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1 pr-2">
                    <div>
                      <Meta post={p} />
                      <h3 className="font-display mt-1.5 text-base md:text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary-deep line-clamp-2">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="mt-1.5 text-xs text-muted line-clamp-2 leading-normal">
                          {p.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-deep">
                      <span>Read article</span>
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}