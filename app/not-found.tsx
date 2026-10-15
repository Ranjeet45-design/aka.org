import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90svh] items-center bg-ink text-white">
      <div className="gutter mx-auto w-full max-w-[110rem] pt-32 pb-20">
        <p className="eyebrow mb-6 text-primary">Error 404</p>
        <h1 className="display-xl max-w-[14ch]">This page has wandered off.</h1>
        <p className="mt-8 max-w-lg text-lg text-white/70">
          The page you requested could not be found. It may have moved or the address may be incorrect.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/blog/" variant="ghost-light" arrow={false}>
            Read the blog
          </Button>
        </div>
      </div>
    </section>
  );
}
